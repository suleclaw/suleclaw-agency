"use client";

import { useActionState } from "react";
import { sendContactEmail, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

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
    <motion.form
      action={formAction}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Success state */}
      {state.success && (
        <motion.div
          className="relative bg-bg-surface rounded-2xl p-10 text-center border border-border-default/50 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-accent/30 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-accent/30 rounded-br-2xl" />

          <div className="text-5xl mb-6">✨</div>
          <h3 className="font-headline font-bold text-2xl text-text-primary mb-3">
            Message sent!
          </h3>
          <p className="text-text-secondary">
            We&apos;ll get back to you within 24–48 hours.
          </p>
        </motion.div>
      )}

      {/* Error state */}
      {state.error && (
        <motion.div
          className="bg-red-950/20 border border-red-900/30 rounded-xl px-5 py-4 text-red-400 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {state.error}
        </motion.div>
      )}

      {/* Form fields */}
      {!state.success && (
        <>
          {/* Name */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-sm font-medium text-text-primary"
            >
              Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-5 py-4 bg-bg-surface border border-border-default/50 rounded-xl
                       text-text-primary placeholder-text-muted text-sm
                       focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
                       transition-all duration-300"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-primary"
            >
              Email <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-5 py-4 bg-bg-surface border border-border-default/50 rounded-xl
                       text-text-primary placeholder-text-muted text-sm
                       focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
                       transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>

          {/* Project Type */}
          <div className="space-y-3">
            <label
              htmlFor="projectType"
              className="text-sm font-medium text-text-primary"
            >
              Project type
            </label>
            <select
              id="projectType"
              name="projectType"
              className="w-full px-5 py-4 bg-bg-surface border border-border-default/50 rounded-xl
                       text-text-secondary text-sm
                       focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
                       transition-all duration-300 appearance-none cursor-pointer"
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
          <div className="space-y-3">
            <label
              htmlFor="message"
              className="text-sm font-medium text-text-primary"
            >
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-5 py-4 bg-bg-surface border border-border-default/50 rounded-xl
                       text-text-primary placeholder-text-muted text-sm
                       focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
                       transition-all duration-300 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full py-4 bg-accent hover:bg-accent-hover text-text-inverse",
              "font-semibold text-sm rounded-xl transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
              "hover:scale-[1.01] active:scale-[0.99]"
            )}
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Send message"
            )}
          </Button>
        </>
      )}
    </motion.form>
  );
}
