import React from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function GlareHover({ children, className }) {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  let rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  let rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className={`relative ${className}`}
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        {children}
      </div>
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          background: useTransform(
            [rotateX, rotateY],
            ([latestX, latestY]) =>
              `radial-gradient(at ${50 - latestY * 0.2}% ${
                50 + latestX * 0.2
              }%, hsla(0,0%,100%,0.2), transparent 50%)`
          ),
        }}
      />
    </motion.div>
  );
}
