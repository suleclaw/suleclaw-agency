"use server";

import nodemailer from "nodemailer";

export interface ContactState {
  success?: boolean;
  error?: string;
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const projectType = formData.get("projectType")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Validate inputs
  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // Check if SMTP credentials are configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    return { error: "Contact email not configured. Please set CONTACT_EMAIL environment variable." };
  }

  if (!smtpHost || !smtpUser || !smtpPass) {
    // In development without SMTP configured, return success
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587", 10),
      secure: smtpPort === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"SuleClaw Website" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New contact from ${name} — ${projectType || "General inquiry"}`,
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
        <span><strong>From:</strong> ${name} &lt;${email}&gt;</span>
        <span><strong>Project Type:</strong> ${projectType || "Not specified"}</span>
      </div>
    </div>
    <div class="message">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
  </div>
</body>
</html>
      `.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { error: "Failed to send your message. Please try again or email us directly." };
  }
}
