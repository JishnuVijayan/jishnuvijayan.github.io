import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MagneticElement from "./MagneticElement";
import JVLogo from "./JVLogo";
import ShinyText from "./ShinyText";
import { Menu, X } from "lucide-react";
import navLinks from "../data/navLinks";
import colors from "../data/colors"; // If you have a colors file, otherwise define colors here

const MagneticNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <JVLogo />
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
};

export default MagneticNavbar;
