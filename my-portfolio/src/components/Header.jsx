import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DecryptedText from "./DecryptedText";
import portfolioData from "../data/portfolioData";

const Header = () => {
  const [isNameRevealed, setIsNameRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    if (!isInView) {
      setIsNameRevealed(false);
    }
  }, [isInView]);

  return (
    <header
      ref={ref}
      className="min-h-screen flex items-center justify-center text-center"
    >
      <div className="flex flex-col items-center">
        <DecryptedText
          text={portfolioData.name}
          animateOn="view"
          sequential
          revealDirection="center"
          speed={50}
          parentClassName="text-5xl md:text-7xl font-extrabold text-white tracking-tighter"
          className="text-white"
          encryptedClassName="text-cyan-400"
          onAnimationComplete={() => {
            if (isInView) {
              setIsNameRevealed(true);
            }
          }}
        />
        {isNameRevealed && isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <DecryptedText
              text={portfolioData.title}
              animateOn="view"
              sequential
              revealDirection="center"
              speed={30}
              parentClassName="text-lg md:text-xl"
              className="text-white"
              encryptedClassName="text-cyan-400"
              style={{ color: colors.accentMuted }}
            />
            <div className="mt-8 flex justify-center gap-4">
              <ShinyText href={`mailto:${portfolioData.contact.email}`}>
                Contact Me
              </ShinyText>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;