"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HorizontalMasonryProps {
  images: string[];
  onImageClick: (index: number) => void;
  rowHeight?: number;
  gap?: number;
}

export function HorizontalMasonry({
  images,
  onImageClick,
  rowHeight = 300,
  gap = 8,
}: HorizontalMasonryProps) {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    // Simple horizontal masonry: group images into rows
    // In production, you'd calculate actual aspect ratios
    const itemsPerRow = Math.ceil(images.length / Math.ceil(images.length / 4));
    const newRows: string[][] = [];

    for (let i = 0; i < images.length; i += itemsPerRow) {
      newRows.push(images.slice(i, i + itemsPerRow));
    }

    setRows(newRows);
  }, [images]);

  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-2 justify-start items-center overflow-x-auto scrollbar-hide"
          style={{ height: `${rowHeight}px` }}
        >
          {row.map((image, imageIndex) => {
            const globalIndex = rows
              .slice(0, rowIndex)
              .reduce((sum, r) => sum + r.length, 0) + imageIndex;

            return (
              <motion.div
                key={globalIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: globalIndex * 0.03, duration: 0.4 }}
                className="flex-shrink-0 h-full cursor-pointer group relative"
                onClick={() => onImageClick(globalIndex)}
              >
                <img
                  src={image}
                  alt={`Photo ${globalIndex + 1}`}
                  className="h-full w-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
