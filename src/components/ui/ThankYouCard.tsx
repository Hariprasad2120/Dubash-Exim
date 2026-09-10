import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface ThankYouCardProps {
  title?: string;
  message: string;
  buttonText?: string;
  onReset: () => void;
  iconType?: 'sparkles' | 'check';
}

const particles = Array.from({ length: 16 }).map((_, i) => {
  const angle = (i / 16) * 360;
  const radius = 60 + Math.random() * 50;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  const colors = ['#115cb9', '#659dfe', '#ffb77d', '#111c2d', '#acc7ff'];
  return {
    id: i,
    x,
    y,
    color: colors[i % colors.length],
    size: Math.random() * 6 + 4,
    delay: Math.random() * 0.15,
  };
});

export const ThankYouCard: React.FC<ThankYouCardProps> = ({
  title = 'Thank You!',
  message,
  buttonText = 'Submit Another Enquiry',
  onReset,
  iconType = 'sparkles',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: 'spring', damping: 25, stiffness: 320 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-surface-container-lowest p-space-md sm:p-space-xl overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative mx-auto max-w-md w-full rounded-2xl bg-surface-container-lowest p-space-xl text-center overflow-hidden"
      >
        {/* Celebration Confetti Particles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: p.x,
                y: p.y - 10,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.4],
              }}
              transition={{
                duration: 1.2,
                delay: p.delay,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.id % 2 === 0 ? '50%' : '2px',
              }}
            />
          ))}
        </div>

        {/* Main Icon Badge Container */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          {/* Pulsing Concentric Outer Rings */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [1, 1.6, 2], opacity: [0.6, 0.2, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-secondary-container/40"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [1, 1.4, 1.7], opacity: [0.5, 0.15, 0] }}
            transition={{ duration: 1.8, delay: 0.4, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-secondary/30"
          />

          {/* Badge Circle */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 260,
              delay: 0.15,
            }}
            className="relative z-10 w-16 h-16 rounded-2xl bg-secondary text-on-secondary shadow-md shadow-secondary/20 flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {iconType === 'sparkles' ? (
                <Sparkles className="w-8 h-8 text-on-secondary" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-on-secondary" />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="font-headline-sm text-[1.65rem] text-on-surface font-extrabold uppercase tracking-tight mb-2"
        >
          {title}
        </motion.h3>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto mb-6 leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <Button
            variant="primary"
            onClick={onReset}
          >
            {buttonText}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
