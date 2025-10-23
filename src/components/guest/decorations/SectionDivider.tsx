import { motion } from 'framer-motion';

interface SectionDividerProps {
  primaryColor: string;
  accentColor: string;
}

export function SectionDivider({
  primaryColor,
  accentColor,
}: SectionDividerProps) {
  return (
    <div className="relative py-8 sm:py-12">
      <div className="absolute inset-0 flex items-center">
        <div
          className="w-full border-t-2 opacity-10"
          style={{ borderColor: primaryColor }}
        />
      </div>
      <div className="relative flex justify-center">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: primaryColor }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          />
        </div>
      </div>
    </div>
  );
}
