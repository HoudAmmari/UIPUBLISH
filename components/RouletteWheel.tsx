"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  label: string;
  emoji: string;
  icon: LucideIcon;
  className: string;
  borderClass: string;
  affirmations: string[];
}

interface SlotMachineProps {
  isSpinning: boolean;
  onSpinComplete: () => void;
  categories: Category[];
  selectedCategory: string;
}

export function SlotMachine({ isSpinning, onSpinComplete, categories, selectedCategory }: SlotMachineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % categories.length);
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        onSpinComplete();
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isSpinning, categories.length, onSpinComplete]);

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="relative w-full max-w-md mx-auto h-32 bg-neutral-900 rounded-lg p-4 overflow-hidden">
      {/* Slot Window */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-16 overflow-hidden bg-neutral-800 rounded border-4 border-neutral-700">
          {/* Highlight Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          
          {/* Categories */}
          <AnimatePresence mode="popLayout">
            {isSpinning ? (
              <motion.div
                key="spinning"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: -60 }}
                animate={{ y: 0 }}
                exit={{ y: 60 }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                <div className={`text-xl font-bold ${categories[currentIndex].className} bg-opacity-90 p-2 rounded text-white`}>
                  {categories[currentIndex].emoji} {categories[currentIndex].label}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="static"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: -60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                <div className={`text-xl font-bold ${selectedCategoryData?.className} bg-opacity-90 p-2 rounded text-white`}>
                  {selectedCategoryData?.emoji} {selectedCategoryData?.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-neutral-700 rounded-l-full" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-neutral-700 rounded-r-full" />
    </div>
  );
}