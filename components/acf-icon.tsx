"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AcfIconProps {
  name?: string | null;
  fallback: LucideIcon;
  className?: string;
}

export function AcfIcon({ name, fallback: Fallback, className }: AcfIconProps) {
  let Icon: LucideIcon = Fallback;

  if (name && typeof name === "string") {
    const cleaned = name.trim();
    const maybeIcon =
      (LucideIcons as unknown as Record<string, LucideIcon>)[cleaned];
    if (maybeIcon) {
      Icon = maybeIcon;
    }
  }

  return <Icon className={className} />;
}

