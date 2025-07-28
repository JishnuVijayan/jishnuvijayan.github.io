import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Cpu,
  FileText,
  GraduationCap,
  Star,
  User,
  Menu,
  X,
  Users,
  UserCheck,
  Shuffle,
  Lightbulb,
  ClipboardCheck,
  MessageCircle,
  Calendar,
} from "lucide-react";
import * as THREE from "three";
import LightRays from "./components/LightRays";
import SpotlightCard from "./components/SpotlightCard";

// --- CONFIGURATION ---
const colors = {
  background: "hsl(0, 0%, 8%)",
  text: "hsl(0, 0%, 100%)",
  textMuted: "hsl(0, 0%, 80%)",
  accent: "hsl(195, 100%, 50%)",
  accentMuted: "hsl(195, 100%, 65%)",
  card: "hsla(0, 0%, 12%, 0.5)",
  border: "hsla(0, 0%, 100%, 0.1)",
};

// --- DATA ---
const portfolioData = {
  name: "Jishnu Vijayan",
  title: "Computer Science Engineer & Web Developer",
  contact: {
    email: "abc@gmail.com",
    phone: "+91 1234567890",
    linkedin: "https://www.linkedin.com/in/jishnu-vijayan",
    github: "https://github.com/jishnu-vijayan",
  },
  introduction:
    "B.Tech graduate in Computer Science with a strong interest in web development, machine learning, and data structures. I have gained practical experience through various projects. I am adaptable, hardworking, and a quick learner, and I look forward to applying my skills and knowledge to contribute and grow in a dynamic tech environment.",
  education: {
    university: "APJ Abdul Kalam Technological University",
    degree: "B.Tech in Computer Science & Engineering",
    cgpa: 8.4,
    duration: "2021 – 2025",
  },
  skills: {
    technical: [
      { name: "Machine Learning", img: "/ml.png" },
      { name: "React", img: "/react.svg" },
      { name: "Angular", img: "/Angular.png" },
      { name: "JavaScript", img: "/js.png" },
      { name: "C", img: "/c.png" },
      { name: "Python", img: "/python.png" },
      { name: "CSS", img: "/css.png" },
      { name: "HTML", img: "/html.png" },
      { name: "Pandas", img: "/pandas.svg" },
      { name: "NumPy", img: "/numpy.png" },
      { name: "Matplotlib", img: "/matplotlib.png" },
      { name: "Seaborn", img: "/seaborn.svg" },
    ],
    soft: [
      "Teamwork",
      "Leadership",
      "Adaptability",
      "Quick Learner",
      "Decision Making",
      "Communication",
    ],
  },
  experience: [
    {
      year: "2025 (3 months)",
      title: "Full-Stack Web developer Intern",
      subtitle: "ULTS, UL Cyberpark, Kozhikode",
      description:
        "Worked in various projects including React, NestJS, and FastAPI. Contributed to two different projects, which helped me to learn new technologies.",
    },
    {
      year: "2024-2025",
      title: "EMG Signal Analysis and Control of 3D-Printed Prosthesis",
      subtitle: "Aster Medcity Kochi",
      description:
        "Conducted a research internship focusing on EMG signal analysis, developing ML models to predict muscle activation, and using these predictions to control a 3D-printed prosthetic arm in real time.",
    },
    {
      year: "2024-2025",
      title: "Full-Stack Web developer Intern",
      subtitle: "Karippal Innovations, Thrissur",
      description:
        "Worked on multiple projects, including a digital solution for tailoring firms to streamline order management and a restaurant menu digitization app, using Angular, Ionic, and TypeScript.",
    },
  ],
  projects: [
    {
      title: "Timetable Management System",
      duration: "Oct 2023 - Dec 2023",
      technologies: ["React", "Express", "PostgreSQL", "JavaScript"],
      description: [
        "Led development of a database management project for organizing semester timetables, enabling personalized search functionalities for faculty and semester-based search for students.",
        "Implemented a feature allowing faculty to retrieve their timetables by name, ensuring targeted results.",
        "Designed and built this full-stack system to optimize performance and user accessibility.",
      ],
    },
  ],
};
const navLinks = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

// --- UTILITY ---
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// --- REUSABLE ANIMATION COMPONENTS (from reactbits.dev & custom) ---

// 1. Decrypted Text Component (with onAnimationComplete callback and repeatable animation)
function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  onAnimationComplete = () => {},
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const shuffleText = (originalText, currentRevealed) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              onAnimationComplete();
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
              onAnimationComplete();
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    onAnimationComplete,
  ]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        setIsHovering(entry.isIntersecting);
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn]);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || !isHovering;

          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

// 2. Particle Orbit Effect Cursor
const ParticleOrbitEffect = ({
  className,
  style,
  particleCount = 12,
  radius = 70,
  particleSpeed = 0.025,
  radiusScale = 1.5,
  intensity = 1,
  fadeOpacity = 0.05,
  colorRange = [0, 360],
  disabled = false,
  followMouse = true,
  autoColors = true,
  particleSize = 2,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    isDown: false,
    radiusScale: 1,
  });
  const colorTimerRef = useRef(0);

  const generateColor = useCallback(
    (hue) => {
      const h =
        hue ?? colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
      return `hsl(${h}, 70%, 60%)`;
    },
    [colorRange]
  );

  const createParticles = useCallback(
    (initialX, initialY) => {
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        const hue =
          colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
        particles.push({
          size: particleSize,
          position: { x: initialX, y: initialY },
          offset: { x: 0, y: 0 },
          shift: { x: initialX, y: initialY },
          speed: particleSpeed + Math.random() * particleSpeed,
          targetSize: particleSize,
          fillColor: generateColor(hue),
          orbit: radius * 0.5 + radius * 0.5 * Math.random(),
          hue,
          trail: [],
        });
      }
      return particles;
    },
    [
      particleCount,
      particleSpeed,
      particleSize,
      radius,
      generateColor,
      colorRange,
    ]
  );

  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;

    particlesRef.current = createParticles(
      mouseRef.current.x,
      mouseRef.current.y
    );
  }, [createParticles]);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleMouseMove = (event) => {
      if (!followMouse) return;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const draw = () => {
      if (!context || !canvas) return;

      if (autoColors) {
        colorTimerRef.current += 0.016;
        if (colorTimerRef.current >= 2) {
          colorTimerRef.current = 0;
          particlesRef.current.forEach((particle) => {
            particle.hue =
              colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
            particle.fillColor = generateColor(particle.hue);
          });
        }
      }

      const targetScale = mouseRef.current.isDown ? radiusScale : 1;
      mouseRef.current.radiusScale +=
        (targetScale - mouseRef.current.radiusScale) * 0.02;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];

        particle.offset.x += particle.speed * intensity;
        particle.offset.y += particle.speed * intensity;

        particle.shift.x +=
          (mouseRef.current.x - particle.shift.x) * particle.speed * intensity;
        particle.shift.y +=
          (mouseRef.current.y - particle.shift.y) * particle.speed * intensity;

        const orbitRadius =
          particle.orbit * mouseRef.current.radiusScale * intensity;
        particle.position.x =
          particle.shift.x + Math.cos(i + particle.offset.x) * orbitRadius;
        particle.position.y =
          particle.shift.y + Math.sin(i + particle.offset.y) * orbitRadius;

        particle.position.x = Math.max(
          0,
          Math.min(particle.position.x, canvas.width)
        );
        particle.position.y = Math.max(
          0,
          Math.min(particle.position.y, canvas.height)
        );

        particle.trail.push({
          x: particle.position.x,
          y: particle.position.y,
          alpha: 1,
        });

        const maxTrailLength = Math.max(5, Math.floor(40 * intensity));
        if (particle.trail.length > maxTrailLength) {
          particle.trail.shift();
        }

        particle.trail.forEach((point, index) => {
          point.alpha =
            ((index + 1) / particle.trail.length) * fadeOpacity * 20;
        });

        if (particle.trail.length > 1) {
          for (let j = 1; j < particle.trail.length; j++) {
            const prev = particle.trail[j - 1];
            const curr = particle.trail[j];

            context.beginPath();
            context.strokeStyle = particle.fillColor;
            context.lineWidth = particle.size * 0.3 * curr.alpha;
            context.globalAlpha = curr.alpha;
            context.moveTo(prev.x, prev.y);
            context.lineTo(curr.x, curr.y);
            context.stroke();
          }
        }

        particle.size += (particle.targetSize - particle.size) * 0.05;
        if (Math.abs(particle.size - particle.targetSize) < 0.1) {
          particle.targetSize = particleSize + Math.random() * particleSize * 2;
        }

        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.globalAlpha = 0.9;
        context.arc(
          particle.position.x,
          particle.position.y,
          particle.size * 0.5,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", updateCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    disabled,
    followMouse,
    particleCount,
    radius,
    particleSpeed,
    radiusScale,
    intensity,
    fadeOpacity,
    colorRange,
    autoColors,
    particleSize,
    updateCanvasDimensions,
    createParticles,
    generateColor,
  ]);

  if (disabled) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 pointer-events-none w-full h-full",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-screen h-screen block"
        style={style}
        aria-hidden="true"
      />
    </div>
  );
};

// 3. Light Rays Background
// const LightRaysBackground = () => (
//   <div className="fixed inset-0 z-0 overflow-hidden">
//     <div className="absolute inset-[-100%] bg-[radial-gradient(circle_at_center,_var(--color-accent)_0,_transparent_15%),radial-gradient(circle_at_center,_var(--color-accent)_0,_transparent_15%)] bg-no-repeat bg-[0_0,50px_50px] opacity-20 [--color-accent:hsl(195,100%,50%)] animate-light-rays" />
//     <style>{`
//             @keyframes light-rays {
//                 from { transform: rotate(0deg); }
//                 to { transform: rotate(360deg); }
//             }
//             .animate-light-rays {
//                 animation: light-rays 200s linear infinite;
//             }
//         `}</style>
//   </div>
// );

// 4. Magnetic Navbar
const MagneticNavbar = () => {
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

const MagneticElement = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    }
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
      className="p-2"
    >
      {children}
    </motion.div>
  );
};

// 5. Shiny Text (for buttons)
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

// 6. Count Up
const CountUp = ({ to, className, decimals = 0 }) => {
  const nodeRef = useRef();
  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = value.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [to, decimals]);
  return <span ref={nodeRef} className={className} />;
};

// 7. Glare Hover
const GlareHover = ({ children, className }) => {
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
};

// 8. New Bento Card Component
const ParticleCard = ({ children, ...props }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={cardRef} {...props}>
      <div className="particle-content relative z-10">{children}</div>
      <div className="particle-glow" />
    </div>
  );
};

// 9. Profile Card Component
const ProfileCard = ({
  avatarUrl,
  name,
  title,
  email,
  phone,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const handlePointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = (x / width) * 100;
      const percentY = (y / height) * 100;
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      wrap.style.setProperty("--pointer-x", `${percentX}%`);
      wrap.style.setProperty("--pointer-y", `${percentY}%`);
      wrap.style.setProperty("--rotate-x", `${round(-(centerY / 4))}deg`);
      wrap.style.setProperty("--rotate-y", `${round(centerX / 5)}deg`);
    };

    card.addEventListener("pointermove", handlePointerMove);
    return () => card.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const round = (value, precision = 2) => parseFloat(value.toFixed(precision));

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <img className="avatar" src={avatarUrl} alt={`${name} avatar`} />
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// 10. Magic Loader
const MagicLoader = ({
  size = 200,
  particleCount = 1,
  speed = 1,
  hueRange = [0, 360],
  className,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const tickRef = useRef(0);
  const globalAngleRef = useRef(0);
  const globalRotationRef = useRef(0);

  const createParticle = useCallback((centerX, centerY, tick, minSize) => {
    return {
      radius: 7,
      x: centerX + (Math.cos(tick / 20) * minSize) / 2,
      y: centerY + (Math.sin(tick / 20) * minSize) / 2,
      angle: globalRotationRef.current + globalAngleRef.current,
      speed: 0,
      accel: 0.01,
      decay: 0.01,
      life: 1,
    };
  }, []);

  const stepParticle = useCallback(
    (particle, index) => {
      particle.speed += particle.accel;
      particle.x += Math.cos(particle.angle) * particle.speed * speed;
      particle.y += Math.sin(particle.angle) * particle.speed * speed;
      particle.angle += Math.PI / 64;
      particle.accel *= 1.01;
      particle.life -= particle.decay;

      if (particle.life <= 0) {
        particlesRef.current.splice(index, 1);
      }
    },
    [speed]
  );

  const drawParticle = useCallback(
    (ctx, particle, index, tick) => {
      const hue =
        hueRange[0] +
        ((tick + particle.life * 120) % (hueRange[1] - hueRange[0]));
      ctx.fillStyle =
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${particle.life})`;

      ctx.beginPath();
      if (particlesRef.current[index - 1]) {
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
          particlesRef.current[index - 1].x,
          particlesRef.current[index - 1].y
        );
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        Math.max(0.001, particle.life * particle.radius),
        0,
        Math.PI * 2
      );
      ctx.fill();

      const sparkleSize = Math.random() * 1.25;
      const sparkleX = particle.x + (Math.random() - 0.5) * 35 * particle.life;
      const sparkleY = particle.y + (Math.random() - 0.5) * 35 * particle.life;
      ctx.fillRect(
        Math.floor(sparkleX),
        Math.floor(sparkleY),
        sparkleSize,
        sparkleSize
      );
    },
    [hueRange]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const minSize = Math.min(rect.width, rect.height) * 0.5;

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(
        createParticle(centerX, centerY, tickRef.current, minSize)
      );
    }

    particlesRef.current.forEach((particle, index) => {
      stepParticle(particle, index);
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle, index) => {
      drawParticle(ctx, particle, index, tickRef.current);
    });

    globalRotationRef.current += (Math.PI / 6) * speed;
    globalAngleRef.current += (Math.PI / 6) * speed;
    tickRef.current++;

    animationRef.current = requestAnimationFrame(animate);
  }, [createParticle, stepParticle, drawParticle, particleCount, speed]);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "lighter";

    particlesRef.current = [];
    tickRef.current = 0;
    globalAngleRef.current = 0;
    globalRotationRef.current = 0;
  }, [size]);

  useEffect(() => {
    setupCanvas();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setupCanvas, animate]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

// 11. Scroll Timeline
const ScrollTimeline = ({
  events,
  title,
  subtitle,
  cardAlignment = "alternating",
  revealAnimation = "fade",
}) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  });

  return (
    <div ref={scrollRef} className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-700" />
      <div className="relative z-10 space-y-16">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={cn(
              "flex items-center gap-8",
              cardAlignment === "alternating" &&
                (index % 2 === 0 ? "flex-row-reverse" : ""),
              cardAlignment === "left" && "justify-start",
              cardAlignment === "right" && "justify-end flex-row-reverse"
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-lg w-full md:w-5/12">
              <p className="text-sky-400 font-semibold mb-1">{event.year}</p>
              <h3 className="text-xl font-bold text-white mb-2">
                {event.title}
              </h3>
              <h4 className="font-semibold text-slate-300 mb-3">
                {event.subtitle}
              </h4>
              <p className="text-slate-400 text-sm">{event.description}</p>
            </div>
            <div className="w-4 h-4 rounded-full bg-sky-400 border-4 border-slate-900 absolute left-1/2 -translate-x-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 12. 3D Logo
// const JVLogo = () => {
//   const mountRef = useRef(null);
//   const tileRef = useRef();
//   const animationControls = useRef(null);

//   const flipTile = useCallback(() => {
//     if (tileRef.current) {
//       const tile = tileRef.current;
//       if (animationControls.current) {
//         animationControls.current.stop();
//       }
//       const currentRotation = { y: tile.rotation.y };
//       const targetRotation = { y: tile.rotation.y + Math.PI };

//       animationControls.current = animate(currentRotation, targetRotation, {
//         duration: 1,
//         ease: "easeInOut",
//         onUpdate: (latest) => {
//           tile.rotation.y = latest.y;
//         },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const currentMount = mountRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 28 / 28, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(28, 28);
//     currentMount.appendChild(renderer.domElement);

//     const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);

//     const createTextTexture = (text) => {
//       const canvas = document.createElement("canvas");
//       canvas.width = 128;
//       canvas.height = 128;
//       const context = canvas.getContext("2d");
//       context.fillStyle = "rgba(18, 18, 18, 0.75)";
//       context.fillRect(0, 0, 128, 128);
//       context.font = "bold 90px Arial";
//       context.fillStyle = colors.accent;
//       context.textAlign = "center";
//       context.textBaseline = "middle";
//       context.fillText(text, 64, 64);
//       return new THREE.CanvasTexture(canvas);
//     };

//     const jvTexture = createTextTexture("JV");
//     const sideMaterial = new THREE.MeshBasicMaterial({ color: "#121212" });

//     const materials = [
//       sideMaterial,
//       sideMaterial,
//       sideMaterial,
//       sideMaterial,
//       new THREE.MeshBasicMaterial({ map: jvTexture }),
//       new THREE.MeshBasicMaterial({ map: jvTexture }),
//     ];

//     const tile = new THREE.Mesh(geometry, materials);
//     tileRef.current = tile;
//     scene.add(tile);

//     camera.position.z = 2.5;

//     const animateLoop = () => {
//       requestAnimationFrame(animateLoop);
//       renderer.render(scene, camera);
//     };
//     animateLoop();

//     const interval = setInterval(flipTile, 5000);
//     const currentRenderer = renderer.domElement;
//     currentRenderer.addEventListener("click", flipTile);

//     return () => {
//       currentMount.removeChild(renderer.domElement);
//       clearInterval(interval);
//       currentRenderer.removeEventListener("click", flipTile);
//     };
//   }, [flipTile]);

//   return (
//     <div
//       ref={mountRef}
//       style={{ width: "28px", height: "28px", cursor: "pointer" }}
//     />
//   );
// };

const JVLogo = () => {
  const [flipped, setFlipped] = React.useState(false);
  const cubeRef = React.useRef();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((f) => !f);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: 48,
        height: 48,
        perspective: 300,
        display: "inline-block",
      }}
    >
      <div
        ref={cubeRef}
        className={`jv-cube${flipped ? " flipped" : ""}`}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 1s cubic-bezier(.86,0,.07,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {["front", "back", "left", "right", "top", "bottom"].map((side) => (
          <div
            key={side}
            className={`jv-cube-face jv-cube-face-${side}`}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 28,
              color: "#38bdf8",
              background: "#18181b",
              border: "2px solid #38bdf8",
              borderRadius: 8,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              userSelect: "none",
            }}
          >
            JV
          </div>
        ))}
      </div>
      <style>{`
        .jv-cube-face-front  { transform: rotateY(0deg) translateZ(24px); }
        .jv-cube-face-back   { transform: rotateY(180deg) translateZ(24px); }
        .jv-cube-face-right  { transform: rotateY(90deg) translateZ(24px); }
        .jv-cube-face-left   { transform: rotateY(-90deg) translateZ(24px); }
        .jv-cube-face-top    { transform: rotateX(90deg) translateZ(24px); }
        .jv-cube-face-bottom { transform: rotateX(-90deg) translateZ(24px); }
      `}</style>
    </div>
  );
};

// --- HEADER ---
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
              <button
                type="button"
                className="text-lg font-medium text-gray-300 transition-colors hover:text-white relative group bg-transparent border-none outline-none"
                style={{ cursor: "pointer" }}
              >
                <span className="relative z-10">Contact Me</span>
                {/* Optional: Add the shiny effect here if you want */}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// --- ANIMATED SECTIONS ---
// const AnimatedSection = ({ id, title, children }) => {
//   const [isHeadingRevealed, setIsHeadingRevealed] = useState(false);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { amount: 0.1 });

//   useEffect(() => {
//     if (!isInView) {
//       setIsHeadingRevealed(false);
//     }
//   }, [isInView]);

//   return (
//     <section
//       ref={ref}
//       id={id}
//       className="max-w-5xl mx-auto px-4 py-32 md:py-48 text-center"
//     >
//       <DecryptedText
//         text={title}
//         animateOn="view"
//         sequential
//         revealDirection="center"
//         speed={50}
//         parentClassName="text-[clamp(2.5rem,6vw,4rem)] font-bold"
//         className="text-white"
//         encryptedClassName="text-cyan-400"
//         onAnimationComplete={() => {
//           if (isInView) {
//             setIsHeadingRevealed(true);
//           }
//         }}
//       />
//       {isHeadingRevealed && (
//         <motion.div
//           className="mt-8 text-left"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           {children}
//         </motion.div>
//       )}
//     </section>
//   );
// };

// const AnimatedSection = ({ id, title, children }) => {
//   return (
//     <motion.section
//       id={id}
//       className="max-w-5xl mx-auto px-4 py-32 md:py-48 text-center"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: true, amount: 0.5 }}
//     >
//       <DecryptedText
//         text={title}
//         animateOn="view"
//         sequential
//         revealDirection="center"
//         speed={50}
//         parentClassName="text-[clamp(2.5rem,6vw,4rem)] font-bold"
//         className="text-white"
//         encryptedClassName="text-cyan-400"
//       />
//       <div className="mt-8 text-left">{children}</div>
//     </motion.section>
//   );
// };

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

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second loading screen
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="w-screen h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <MagicLoader size={250} />
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.text }}
      className="font-sans leading-relaxed selection:bg-sky-500/30 cursor-none"
    >
      <ParticleOrbitEffect />
      <LightRays
        raysOrigin="top-center"
        raysColor="#fb08900"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <MagneticNavbar />
      <style>{`
                .particle-card {
                    position: relative;
                    background-color: #060010;
                    border: 1px solid #392e4e;
                    border-radius: 1.25rem;
                    padding: 1.25rem;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .particle-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }
                .particle-glow {
                    position: absolute;
                    top: var(--glow-y, 50%);
                    left: var(--glow-x, 50%);
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(132, 0, 255, 0.2) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    opacity: 0;
                }
                .particle-card:hover .particle-glow {
                    opacity: 1;
                }
                
                /* Profile Card CSS */
                :root { --pointer-x: 50%; --pointer-y: 50%; --card-opacity: 0; --rotate-x: 0deg; --rotate-y: 0deg; --background-x: 50%; --background-y: 50%; --card-radius: 30px; }
                .pc-card-wrapper { perspective: 1000px; position: relative; }
                .pc-card { aspect-ratio: 0.718; border-radius: var(--card-radius); position: relative; transition: transform 1s ease; transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)); background-image: radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(266, 100%, 90%, var(--card-opacity)) 4%, hsla(266, 50%, 80%, calc(var(--card-opacity) * 0.75)) 10%, hsla(266, 25%, 70%, calc(var(--card-opacity) * 0.5)) 50%, hsla(266, 0%, 60%, 0) 100%), radial-gradient(35% 52% at 55% 20%, #00ffaac4 0%, #073aff00 100%), radial-gradient(100% 100% at 50% 50%, #00c1ffff 1%, #073aff00 76%), conic-gradient(from 124deg at 50% 50%, #c137ffff 0%, #07c6ffff 40%, #07c6ffff 60%, #c137ffff 100%); overflow: hidden; }
                .pc-card:hover { --card-opacity: 1; }
                .pc-inside { position: absolute; inset: 1px; border-radius: inherit; background: linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%); background-color: rgba(0,0,0,0.9); }
                .pc-shine { position: absolute; inset: 0; border-radius: inherit; mix-blend-mode: color-dodge; }
                .pc-glare { position: absolute; inset: 0; border-radius: inherit; background-image: radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(248, 25%, 80%) 12%, hsla(207, 40%, 30%, 0.8) 90%); mix-blend-mode: overlay; }
                .pc-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .pc-avatar-content { z-index: 1; }
                .avatar { width: 100%; height: 100%; object-fit: cover; }
                .pc-details { text-align: center; color: white; z-index: 2; position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); }
                .pc-details h3 { font-size: 2rem; font-weight: bold; margin: 0; }
                .pc-details p { margin: 0.25rem 0; font-size: 1rem; opacity: 0.8; }
            `}</style>

      <div className="relative z-10">
        <Header />

        <AnimatedSection id="about" title="About Me">
          <p className="text-lg text-center text-slate-300">
            {portfolioData.introduction}
          </p>
        </AnimatedSection>

        <AnimatedSection id="education" title="Education">
          <div className="text-center">
            <h4 className="font-bold text-xl text-white">
              {portfolioData.education.degree}
            </h4>
            <p className="text-lg" style={{ color: colors.textMuted }}>
              {portfolioData.education.university}
            </p>
            <p className="mt-2 text-lg" style={{ color: colors.textMuted }}>
              CGPA:{" "}
              <CountUp
                to={portfolioData.education.cgpa}
                className="font-bold text-xl text-cyan-400"
                decimals={1}
              />
            </p>
            <p className="text-md" style={{ color: colors.textMuted }}>
              {portfolioData.education.duration}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="experience" title="Experience">
          <ScrollTimeline events={portfolioData.experience} />
        </AnimatedSection>

        <AnimatedSection id="projects" title="Projects">
          <div className="space-y-8">
            {portfolioData.projects.map((item) => (
              <div
                key={item.title}
                className="bg-slate-800/30 p-6 rounded-lg border border-slate-700"
              >
                <h4 className="font-bold text-xl text-white">{item.title}</h4>
                <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
                  {item.duration}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-700 text-sky-200 px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {item.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills" title="Skills">
          <div className="mb-16">
            <h3
              className="text-2xl font-bold text-center mb-8"
              style={{ color: colors.accentMuted }}
            >
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {portfolioData.skills.technical.map((skill) => (
                <SpotlightCard
                  key={skill.name}
                  className="particle-card flex flex-col items-center justify-center gap-3 aspect-square"
                >
                  <img
                    src={skill.img}
                    alt={`${skill.name} logo`}
                    className="w-14 h-14 rounded-lg object-contain bg-white/10"
                    loading="lazy"
                  />
                  <span className="font-semibold text-center">
                    {skill.name}
                  </span>
                </SpotlightCard>
              ))}
            </div>
          </div>
          <div>
            <h3
              className="text-2xl font-bold text-center mb-8"
              style={{ color: colors.accentMuted }}
            >
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ParticleCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <Users className="w-12 h-12 text-sky-400" />
                <span>Teamwork</span>
              </ParticleCard>
              <ParticleCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <UserCheck className="w-12 h-12 text-sky-400" />
                <span>Leadership</span>
              </ParticleCard>
              <ParticleCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <Shuffle className="w-12 h-12 text-sky-400" />
                <span>Adaptability</span>
              </ParticleCard>
              <ParticleCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <Lightbulb className="w-12 h-12 text-sky-400" />
                <span>Quick Learner</span>
              </ParticleCard>
              <ParticleCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <ClipboardCheck className="w-12 h-12 text-sky-400" />
                <span>Decision Making</span>
              </ParticleCard>
              <ParticleCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <MessageCircle className="w-12 h-12 text-sky-400" />
                <span>Communication</span>
              </ParticleCard>
            </div>
          </div>
        </AnimatedSection>

        <section id="contact" className="max-w-5xl mx-auto px-4 py-32 md:py-48">
          <h2 className="text-center text-[clamp(2.5rem,6vw,4rem)] font-bold mb-12">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-sm mx-auto">
              <ProfileCard
                name={portfolioData.name}
                title="Software Engineer"
                avatarUrl="/Jishnu IMAGE 2.jpg"
                showUserInfo={false}
              />
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Why do you want to contact me?
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        <footer
          className="text-center py-8"
          style={{ color: colors.textMuted }}
        >
          <p>Designed & Built by Jishnu Vijayan</p>
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
