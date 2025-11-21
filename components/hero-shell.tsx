"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeroTone = "light" | "dark";
type HeroTonePreference = HeroTone | "auto";

const toneCache = new Map<string, HeroTone>();

function sampleTone(img: HTMLImageElement): HeroTone {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const sampleSize = 48;
    canvas.width = sampleSize;
    canvas.height = sampleSize;

    ctx?.drawImage(img, 0, 0, sampleSize, sampleSize);
    const data = ctx?.getImageData(0, 0, sampleSize, sampleSize).data;
    if (!data) return "dark";

    const start = Math.floor(sampleSize * 0.2);
    const end = Math.ceil(sampleSize * 0.8);
    let sum = 0;
    let count = 0;
    let brightCount = 0;

    for (let y = start; y < end; y++) {
      for (let x = start; x < end; x++) {
        const idx = (y * sampleSize + x) * 4;
        const [r, g, b] = [data[idx], data[idx + 1], data[idx + 2]];
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        sum += luminance;
        count += 1;
        if (luminance > 180) brightCount += 1;
      }
    }

    const avg = sum / Math.max(count, 1);
    const brightRatio = brightCount / Math.max(count, 1);

    if (brightRatio > 0.55) return "light";
    return avg > 165 ? "light" : "dark";
  } catch (error) {
    return "dark";
  }
}

interface HeroShellProps extends React.HTMLAttributes<HTMLElement> {
  image: string;
  alt: string;
  tone?: HeroTonePreference;
  fallbackTone?: HeroTone;
  overlay?: React.ReactNode;
  background?: React.ReactNode;
  imageClassName?: string;
  onThemeChange?: (tone: HeroTone) => void;
}

export function HeroShell({
  image,
  alt,
  tone = "auto",
  overlay,
  background,
  imageClassName,
  className,
  children,
  onThemeChange,
  fallbackTone = "dark",
  ...props
}: HeroShellProps) {
  const fallbackTheme: HeroTone =
    tone === "light" ? "light" : tone === "dark" ? "dark" : fallbackTone;
  const [theme, setTheme] = useState<HeroTone>(fallbackTheme);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (tone !== "auto") {
      setTheme(tone);
      return;
    }

    const img = imageRef.current;
    if (!img) return;
    let cancelled = false;

    const updateTone = () => {
      if (cancelled) return;
      const src = img.currentSrc || image;
      const cached = toneCache.get(src);
      if (cached) {
        setTheme(cached);
        onThemeChange?.(cached);
        return;
      }

      const detected = sampleTone(img);
      toneCache.set(src, detected);
      setTheme(detected);
      onThemeChange?.(detected);
    };

    if (img.complete && img.naturalWidth > 0) {
      updateTone();
    } else {
      img.addEventListener("load", updateTone);
      img.addEventListener("error", () => setTheme(fallbackTheme));
    }

    return () => {
      cancelled = true;
      img?.removeEventListener("load", updateTone);
    };
  }, [fallbackTheme, image, onThemeChange, tone]);

  const toneProbe = useMemo(
    () => (
      <img
        ref={imageRef}
        src={image}
        alt={alt}
        aria-hidden={background ? true : undefined}
        crossOrigin="anonymous"
        className={cn(
          background ? "sr-only" : "absolute inset-0 h-full w-full object-cover",
          !background && imageClassName
        )}
      />
    ),
    [alt, background, image, imageClassName]
  );

  return (
    <section
      className={cn("hero-shell relative overflow-hidden", className)}
      data-theme={theme}
      {...props}
    >
      <div className="absolute inset-0 z-0">
        {background ?? toneProbe}
        {overlay}
        {background ? toneProbe : null}
      </div>
      {children}
    </section>
  );
}
