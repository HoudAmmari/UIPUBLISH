"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SocialShare } from "./SocialShare";

interface AffirmationDisplayProps {
  affirmation: string;
  isSpinning?: boolean;
}

export function AffirmationDisplay({ affirmation, isSpinning = false }: AffirmationDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {affirmation && !isSpinning && (
            <motion.div
              key={affirmation}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center"
            >
              <motion.p
                variants={textVariants}
                className="text-2xl font-medium text-neutral-700 dark:text-neutral-300"
              >
                {affirmation}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {affirmation && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2 }}
        >
          <SocialShare affirmation={affirmation} />
        </motion.div>
      )}
    </div>
  );
}