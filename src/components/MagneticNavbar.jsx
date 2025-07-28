import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticElement from "./MagneticElement";
import ShinyText from "./ShinyText";
import navLinks from "../data/navLinks";

const colors = {
  border: "hsla(0, 0%, 100%, 0.1)",
};

export default function MagneticNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
      style={{
        backdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "none",
        backgroundColor: isScrolled ? "rgba(18, 18, 18, 0.75)" : "transparent",
        borderBottom: isScrolled
          ? `1px solid ${colors.border}`
          : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <MagneticElement>
          <a href="#" className="font-bold text-2xl">
            JV
          </a>
        </MagneticElement>
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <MagneticElement key={link.href}>
              <ShinyText href={link.href}>{link.label}</ShinyText>
            </MagneticElement>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 p-4 bg-black/50 backdrop-blur-lg border-t border-slate-700"
        >
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-200 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
