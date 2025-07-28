import React from 'react';
import { motion } from 'framer-motion';

const ShinyText = ({ children, href }) => {
  return (
    <a
      href={href}
      className="text-lg font-medium text-gray-300 transition-colors hover:text-white relative group"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg origin-left z-0"
      />
    </a>
  );
};

export default ShinyText;