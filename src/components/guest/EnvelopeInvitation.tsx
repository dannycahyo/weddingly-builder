import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeInvitationProps {
  brideName?: string;
  groomName?: string;
  guestName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  headingFont?: string;
  onOpen: () => void;
}

export function EnvelopeInvitation({
  brideName,
  groomName,
  guestName,
  primaryColor = '#e4b6c6',
  secondaryColor = '#d4a5a5',
  headingFont = 'Playfair Display',
  onOpen,
}: EnvelopeInvitationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full"
          style={{ backgroundColor: secondaryColor }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Greeting Text */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-center"
          >
            <p
              className="text-2xl sm:text-3xl font-light"
              style={{
                fontFamily: headingFont,
                color: secondaryColor,
              }}
            >
              Dear {guestName},
            </p>
          </motion.div>
        )}

        {/* Envelope */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          {/* Envelope body */}
          <div
            className="relative w-80 h-56 sm:w-96 sm:h-64 rounded-lg shadow-2xl"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            {/* Envelope flap */}
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                backgroundColor: secondaryColor,
                clipPath: 'polygon(0 0, 50% 40%, 100% 0)',
              }}
              animate={{
                rotateX: isHovered ? -20 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Letter inside */}
            <div className="absolute inset-4 sm:inset-6 flex flex-col items-center justify-center bg-white rounded-md shadow-inner p-4">
              <div
                className="text-4xl sm:text-5xl mb-4"
                style={{ color: primaryColor }}
              >
                💌
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-center mb-2"
                style={{
                  fontFamily: headingFont,
                  color: secondaryColor,
                }}
              >
                You're Invited!
              </h2>
              <p className="text-sm text-center text-gray-600 mb-4">
                To the wedding of
              </p>
              <p
                className="text-lg sm:text-xl font-semibold text-center"
                style={{
                  fontFamily: headingFont,
                  color: primaryColor,
                }}
              >
                {brideName} & {groomName}
              </p>
            </div>

            {/* Seal/Stamp decoration */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: secondaryColor,
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl">💍</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Open Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="mt-12 px-8 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          style={{
            backgroundColor: secondaryColor,
            fontFamily: headingFont,
          }}
        >
          Open Invitation
        </motion.button>

        {/* Instruction Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-4 text-sm text-gray-500 text-center"
        >
          Click to view the wedding details
        </motion.p>
      </div>
    </div>
  );
}
