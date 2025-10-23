import { motion } from 'framer-motion';

interface FloatingDecorationsProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function FloatingDecorations({
  primaryColor,
  secondaryColor,
  accentColor,
}: FloatingDecorationsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Decoration */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: primaryColor }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Top Right Decoration */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: secondaryColor }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Middle Left Decoration */}
      <motion.div
        className="absolute top-1/3 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: accentColor }}
        animate={{
          scale: [1, 1.15, 1],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Middle Right Decoration */}
      <motion.div
        className="absolute top-1/2 -right-40 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: primaryColor }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Bottom Left Decoration */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: secondaryColor }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Bottom Right Decoration */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: accentColor }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Small floating hearts/circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full opacity-20"
          style={{
            backgroundColor:
              i % 3 === 0
                ? primaryColor
                : i % 3 === 1
                ? secondaryColor
                : accentColor,
            left: `${15 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
