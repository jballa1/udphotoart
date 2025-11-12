"use client";

import { MouseEvent } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-provider";
import { cn } from "@/lib/utils";

export type AddToCartPayload = {
  title: string;
  image: string;
  collection?: string;
  category?: string;
  price?: number;
  description?: string;
};

type AddToCartButtonProps = AddToCartPayload & {
  label?: string;
  className?: string;
  mode?: "label" | "icon";
};

export function AddToCartButton({
  title,
  image,
  collection,
  category,
  price,
  description,
  label = "Add to Cart",
  className,
  mode = "label",
}: AddToCartButtonProps) {
  const { openCart } = useCart();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openCart({
      title,
      image,
      collection,
      category,
      price,
      description,
    });
  };

const iconClasses =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur shadow-lg transition hover:border-accent/80 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const labelClasses =
    "cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white px-5 py-2 rounded-full text-xs font-semibold tracking-[0.05em] uppercase shadow-lg transition-all";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(mode === "icon" ? iconClasses : labelClasses, className)}
      aria-label={mode === "icon" ? label : undefined}
    >
      {mode === "icon" ? (
        <>
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}
