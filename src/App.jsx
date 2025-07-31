import React, { useState, useEffect } from "react";
import ParticleOrbitCursor from "./components/ParticleOrbitCursor";
import LightRays from "./components/LightRays";
import MagneticNavbar from "./components/MagneticNavbar";
import Header from "./components/Header";
import AnimatedSection from "./components/AnimatedSection";
import ScrollTimeline from "./components/ScrollTimeline";
import ProfileCard from "./components/ProfileCard";
import MagicLoader from "./components/MagicLoader";
import portfolioData from "./data/portfolioData";
import navLinks from "./data/navLinks";
import CountUp from "./components/CountUp";
import SpotlightCard from "./components/SpotlightCard";
import colors from "./data/colors";
import {
  Users,
  UserCheck,
  Shuffle,
  Lightbulb,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
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
      <ParticleOrbitCursor />
      <LightRays className="custom-rays" />
      <MagneticNavbar navLinks={navLinks} />
      <div className="relative z-10">
        <Header portfolioData={portfolioData} colors={colors} />
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
              <SpotlightCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <Users className="w-12 h-12 text-sky-400" />
                <span>Teamwork</span>
              </SpotlightCard>
              <SpotlightCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <UserCheck className="w-12 h-12 text-sky-400" />
                <span>Leadership</span>
              </SpotlightCard>
              <SpotlightCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <Shuffle className="w-12 h-12 text-sky-400" />
                <span>Adaptability</span>
              </SpotlightCard>
              <SpotlightCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <Lightbulb className="w-12 h-12 text-sky-400" />
                <span>Quick Learner</span>
              </SpotlightCard>
              <SpotlightCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <ClipboardCheck className="w-12 h-12 text-sky-400" />
                <span>Decision Making</span>
              </SpotlightCard>
              <SpotlightCard className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                <MessageCircle className="w-12 h-12 text-sky-400" />
                <span>Communication</span>
              </SpotlightCard>
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
