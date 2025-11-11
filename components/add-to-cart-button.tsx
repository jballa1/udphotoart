"use client";

import { MouseEvent } from "react";
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
};

export function AddToCartButton({
  title,
  image,
  collection,
  category,
  price,
  description,
  label = "View Details",
  className,
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

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white px-5 py-2 rounded-full text-xs font-semibold tracking-[0.05em] uppercase shadow-lg transition-all",
        className
      )}
    >
      {label}
    </button>
  );
}
