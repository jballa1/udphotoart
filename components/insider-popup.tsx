"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const POPUP_DELAY_MS = 6000;
const STORAGE_KEY = "udphotoart-insider-popup-dismissed";

export function InsiderPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const alreadyDismissed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY) === "true";

    if (alreadyDismissed) {
      return;
    }

    const timer = setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/insider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        const message =
          data?.error ||
          "We couldn't save your email right now. Please try again.";
        setErrorMessage(message);
      } else {
        setHasSubmitted(true);
        setEmail("");
        closePopup();
      }
    } catch (error) {
      console.error("Error submitting insider signup:", error);
      setErrorMessage(
        "Something went wrong. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-50 w-full max-w-[320px] text-foreground",
        "drop-shadow-2xl"
      )}
    >
      <div className="rounded-2xl border border-accent bg-background">
        <div className="flex items-start justify-between gap-2 p-4 pb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Become an Insider
            </p>
            <h3 className="mt-1 text-lg font-heading">Art in your inbox</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Early access to prints, studio stories, and collector drops.
            </p>
          </div>
          <button
            aria-label="Close insider signup"
            onClick={closePopup}
            className="rounded-full p-1 text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-2 p-4 pt-0"
        >
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-border bg-background/70 py-2 pr-3 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition"
            />
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500 mt-0.5">
              {errorMessage}
            </p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-accent hover:bg-[var(--color-accent-hover)] text-background disabled:opacity-70"
          >
            {isSubmitting ? "Joining..." : "Join the Circle"}
          </Button>
          <p className="text-center text-[11px] leading-tight text-muted-foreground">
            {hasSubmitted
              ? "Thank you! We will send updates to this address."
              : "We respect your inbox. Unsubscribe anytime."}
          </p>
        </form>
      </div>
    </div>
  );
}
