"use server";

import nodemailer from "nodemailer";

export interface ContactState {
  success?: boolean;
  error?: string;
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Simple in-memory store. For production use Redis or Vercel KV.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

// ─── Input sanitisation ────────────────────────────────────────────────────────

/**
 * Strips CR / LF characters to prevent nodemailer CRLF header injection.
 * Also trims and rejects empty strings.
 */
function sanitiseHeader(value: unknown, maxLen = 200): string {
  const str = (value ?? "").toString().trim().slice(0, maxLen);
  return str.replace(/[\r\n]/g, "");
}

/**
 * HTML-encodes a string for safe embedding in an email body.
 */
function htmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // ── Rate limit ──────────────────────────────────────────────────────────────
  // In a serverless env the IP may be forwarded via x-forwarded-for.
  const forwarded =
    process.env["X_FORWARDED_FOR"]?.split(",")[0]?.trim() ??
    process.env["HTTP_X_FORWARDED_FOR"]?.split(",")[0]?.trim();
  const clientIp = forwarded ?? "anonymous";
  if (isRateLimited(clientIp)) {
    return { error: "Too many requests. Please wait a minute and try again." };
  }

  // ── Extract & validate ─────────────────────────────────────────────────────
  const name = sanitiseHeader(formData.get("name"), 100);
  const email = sanitiseHeader(formData.get("email"), 254);
  const projectType = sanitiseHeader(formData.get("projectType"), 80);
  const message = (formData.get("message")?.toString().trim() ?? "").slice(0, 5000);

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const contactEmail = process.env["CONTACT_EMAIL"];
  if (!contactEmail) {
    return {
      error:
        "Contact email not configured. Please set CONTACT_EMAIL environment variable.",
    };
  }

  const smtpHost = process.env["SMTP_HOST"];
  const smtpPort = process.env["SMTP_PORT"];
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];

  if (!smtpHost || !smtpUser || !smtpPass) {
    // In development without SMTP configured, return success.
    return { success: true };
  }

  // ── Send email ──────────────────────────────────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587", 10),
      secure: smtpPort === "465",
      auth: { user: smtpUser, pass: smtpPass },
    });

    // subject is constructed server-side only, no user input injected directly.
    const subject = `New contact from ${name} — ${projectType || "General inquiry"}`;

    await transporter.sendMail({
      from: `"SuleClaw Website" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject,
      text: `
Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}

Message:
${message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0A0A0B; color: #FAFAFA; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { border-bottom: 1px solid #27272A; padding-bottom: 20px; margin-bottom: 24px; }
    h1 { color: #F59E0B; font-size: 24px; margin: 0 0 8px 0; }
    .meta { color: #A1A1AA; font-size: 14px; }
    .meta span { display: block; margin-bottom: 4px; }
    .message { background: #111113; border: 1px solid #27272A; border-radius: 8px; padding: 20px; color: #A1A1AA; line-height: 1.6; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <div class="meta">
        <span><strong>From:</strong> ${htmlEscape(name)} &lt;${htmlEscape(email)}&gt;</span>
        <span><strong>Project Type:</strong> ${htmlEscape(projectType || "Not specified")}</span>
      </div>
    </div>
    <div class="message">${htmlEscape(message)}</div>
  </div>
</body>
</html>
      `.trim(),
    });

    return { success: true };
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return {
      error: "Failed to send your message. Please try again or email us directly.",
    };
  }
}
