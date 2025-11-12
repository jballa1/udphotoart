"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "udphotoart-favorites";

export type FavoritePhoto = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  gallery: string;
  href: string;
};

type FavoritesContextValue = {
  favorites: FavoritePhoto[];
  toggleFavorite: (photo: FavoritePhoto) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<FavoritePhoto[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse favorites", error);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, isReady]);

  const toggleFavorite = useCallback((photo: FavoritePhoto) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === photo.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== photo.id);
      }
      return [photo, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((fav) => fav.id === id),
    [favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, removeFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
