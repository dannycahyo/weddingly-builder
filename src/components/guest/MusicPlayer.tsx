import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl: string;
  musicTitle?: string;
  musicArtist?: string;
  primaryColor: string;
}

export function MusicPlayer({
  musicUrl,
  musicTitle,
  musicArtist,
  primaryColor,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayer, setShowPlayer] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = 0.3;
    audio.loop = true;

    // Try to autoplay (will be muted initially due to browser policies)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} muted />

      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm border-2"
              style={{ borderColor: `${primaryColor}40` }}
            >
              <div className="flex items-center gap-3">
                {/* Music Icon */}
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}20` }}
                  animate={
                    isPlaying && !isMuted
                      ? { scale: [1, 1.1, 1] }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying && !isMuted ? Infinity : 0,
                  }}
                >
                  <Music
                    className="w-6 h-6"
                    style={{ color: primaryColor }}
                  />
                </motion.div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  {musicTitle ? (
                    <>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {musicTitle}
                      </p>
                      {musicArtist && (
                        <p className="text-xs text-gray-500 truncate">
                          {musicArtist}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm font-medium text-gray-700">
                      Wedding Music
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  {/* Play/Pause Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isPlaying
                        ? `${primaryColor}20`
                        : '#f3f4f6',
                      color: isPlaying ? primaryColor : '#6b7280',
                    }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause
                        className="w-5 h-5"
                        fill="currentColor"
                      />
                    ) : (
                      <Play className="w-5 h-5" fill="currentColor" />
                    )}
                  </motion.button>

                  {/* Mute/Unmute Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: !isMuted
                        ? `${primaryColor}20`
                        : '#f3f4f6',
                      color: !isMuted ? primaryColor : '#6b7280',
                    }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPlayer(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Close player"
                  >
                    <span className="text-gray-500 text-lg leading-none">
                      ×
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Optional: Progress bar */}
              {isPlaying && !isMuted && (
                <motion.div
                  className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    animate={{ width: ['0%', '100%'] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
