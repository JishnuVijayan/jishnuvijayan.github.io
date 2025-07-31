import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import DecryptedText from "./DecryptedText";

const AnimatedSection = ({ id, title, children }) => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { amount: 0.5, once: true });
  const [headingDone, setHeadingDone] = useState(false);

  return (
    <section
      id={id}
      className="max-w-5xl mx-auto px-4 py-32 md:py-48 text-center"
    >
      <div ref={headingRef}>
        <DecryptedText
          text={title}
          animateOn={isHeadingInView ? "view" : "none"}
          sequential
          revealDirection="center"
          speed={50}
          parentClassName="text-[clamp(2.5rem,6vw,4rem)] font-bold"
          className="text-white"
          encryptedClassName="text-cyan-400"
          onAnimationComplete={() => setHeadingDone(true)}
        />
      </div>
      <motion.div
        className="mt-8 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={headingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {headingDone && children}
      </motion.div>
    </section>
  );
};

export default AnimatedSection;
