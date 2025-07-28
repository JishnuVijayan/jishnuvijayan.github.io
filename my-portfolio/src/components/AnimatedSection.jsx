import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import DecryptedText from './DecryptedText';

const AnimatedSection = ({ id, title, children }) => {
  const [isHeadingRevealed, setIsHeadingRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    if (!isInView) {
      setIsHeadingRevealed(false);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id={id}
      className="max-w-5xl mx-auto px-4 py-32 md:py-48 text-center"
    >
      <DecryptedText
        text={title}
        animateOn="view"
        sequential
        revealDirection="center"
        speed={50}
        parentClassName="text-[clamp(2.5rem,6vw,4rem)] font-bold"
        className="text-white"
        encryptedClassName="text-cyan-400"
        onAnimationComplete={() => {
          if (isInView) {
            setIsHeadingRevealed(true);
          }
        }}
      />
      {isHeadingRevealed && (
        <motion.div
          className="mt-8 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
};

export default AnimatedSection;