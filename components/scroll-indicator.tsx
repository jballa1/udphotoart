"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={i > 0 ? "-mt-3" : ""} // overlap arrows slightly
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      ))}
    </div>
  );
}
