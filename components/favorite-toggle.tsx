"use client";

import { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useFavorites,
  FavoritePhoto,
} from "@/components/favorites-provider";

type FavoriteToggleProps = FavoritePhoto & {
  className?: string;
};

export function FavoriteToggle({
  id,
  image,
  title,
  subtitle,
  gallery,
  href,
  className,
}: FavoriteToggleProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(id);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFavorite({ id, image, title, subtitle, gallery, href });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur shadow-lg transition hover:border-accent/80 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active && "border-accent bg-accent/10 text-accent",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition",
          active ? "fill-current text-accent" : "text-white"
        )}
        strokeWidth={1.6}
      />
      <span className="sr-only">
        {active ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  );
}
