"use client";

import { useActionState } from "react";
import { sendContactEmail, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = {};

const projectTypes = [
  { value: "", label: "Select project type..." },
  { value: "new-project", label: "New project" },
  { value: "audit-existing", label: "Audit existing" },
  { value: "just-exploring", label: "Just exploring" },
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {/* Success state */}
      {state.success && (
        <div className="bg-[#111113] border border-[#27272A] rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="font-headline font-bold text-xl text-[#FAFAFA] mb-2">
            Message sent!
          </h3>
          <p className="text-[#A1A1AA]">
            We&apos;ll get back to you within 24–48 hours.
          </p>
        </div>
      )}

      {/* Error state */}
      {state.error && (
        <div className="bg-red-950/30 border border-red-900/50 rounded-lg px-4 py-3 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Form fields */}
      {!state.success && (
        <>
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#A1A1AA]"
            >
              Name <span className="text-[#F59E0B]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-[#1C1C1F] border border-[#27272A] rounded-lg text-[#FAFAFA] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#A1A1AA]"
            >
              Email <span className="text-[#F59E0B]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-[#1C1C1F] border border-[#27272A] rounded-lg text-[#FAFAFA] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <label
              htmlFor="projectType"
              className="text-sm font-medium text-[#A1A1AA]"
            >
              Project type
            </label>
            <select
              id="projectType"
              name="projectType"
              className="w-full px-4 py-3 bg-[#1C1C1F] border border-[#27272A] rounded-lg text-[#A1A1AA] text-sm focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors appearance-none cursor-pointer"
              defaultValue=""
            >
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[#A1A1AA]"
            >
              Message <span className="text-[#F59E0B]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 bg-[#1C1C1F] border border-[#27272A] rounded-lg text-[#FAFAFA] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A0A0B] font-semibold text-sm rounded-lg transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:scale-[1.01] active:scale-[0.99]"
            )}
          >
            {isPending ? "Sending..." : "Send message"}
          </Button>
        </>
      )}
    </form>
  );
}
