'use client';

import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const TalkToUs = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Pulsing background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full blur-xl bg-linear-to-r from-blue-500/50 to-purple-600/50 -z-10"
      />

      <motion.a
        href="https://cal.id/pushpendra"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative flex items-center gap-3 pl-4 pr-5 py-3.5",
          "rounded-full font-semibold text-sm text-white",
          "border border-white/20 backdrop-blur-md shadow-2xl",
          "transition-colors duration-300 group overflow-hidden"
        )}
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          animate={{
            left: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
          }}
          className="absolute top-0 h-full w-12 bg-white/20 skew-x-12 -z-0"
        />

        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Calendar size={18} className="shrink-0 relative z-10" />
        </motion.div>

        <span className="relative z-10 flex items-center gap-2">
          Talk to Us
        </span>
      </motion.a>
    </div>
  );
};

export default TalkToUs;

