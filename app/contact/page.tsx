import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactNav } from "@/components/contact-nav";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: "Contact — SuleClaw Agency",
  description:
    "Get in touch with SuleClaw Agency. Tell us about your project and we'll get back to you within 24–48 hours.",
};

export default function ContactPage() {
  return (
    <>
      <ContactNav />
      <ThemeSwitcher />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-4">
              Let&apos;s talk
            </h1>
            <p className="text-text-secondary text-lg">
              Tell us what you&apos;re building. We&apos;ll get back to you within
              24–48 hours.
            </p>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
