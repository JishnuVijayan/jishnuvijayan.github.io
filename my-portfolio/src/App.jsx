import React from "react";
import Header from "./components/Header";
import AnimatedSection from "./components/AnimatedSection";
import CountUp from "./components/CountUp";
import ProfileCard from "./components/ProfileCard";
import ParticleCard from "./components/ParticleCard";
import SplashCursor from "./components/SplashCursor";
import LightRaysBackground from "./components/LightRaysBackground";
import MagneticNavbar from "./components/MagneticNavbar";
import portfolioData from "./data/portfolioData";

export default function App() {
  return (
    <div className="font-sans leading-relaxed selection:bg-sky-500/30">
      <SplashCursor />
      <LightRaysBackground />
      <MagneticNavbar />
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
            <p className="text-lg" style={{ color: "hsl(0, 0%, 80%)" }}>
              {portfolioData.education.university}
            </p>
            <p className="mt-2 text-lg" style={{ color: "hsl(0, 0%, 80%)" }}>
              CGPA:{" "}
              <CountUp
                to={portfolioData.education.cgpa}
                className="font-bold text-xl text-cyan-400"
                decimals={1}
              />
            </p>
            <p className="text-md" style={{ color: "hsl(0, 0%, 80%)" }}>
              {portfolioData.education.duration}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="experience" title="Experience">
          <div className="space-y-8">
            {portfolioData.experience.map((item) => (
              <div
                key={item.title}
                className="bg-slate-800/30 p-6 rounded-lg border border-slate-700"
              >
                <h4 className="font-bold text-xl text-white">{item.title}</h4>
                <p className="text-md font-semibold" style={{ color: "hsl(195, 100%, 65%)" }}>
                  {item.company}
                </p>
                <p className="text-sm mb-3" style={{ color: "hsl(0, 0%, 80%)" }}>
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

        <AnimatedSection id="projects" title="Projects">
          <div className="space-y-8">
            {portfolioData.projects.map((item) => (
              <div
                key={item.title}
                className="bg-slate-800/30 p-6 rounded-lg border border-slate-700"
              >
                <h4 className="font-bold text-xl text-white">{item.title}</h4>
                <p className="text-sm mb-3" style={{ color: "hsl(0, 0%, 80%)" }}>
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
            <h3 className="text-2xl font-bold text-center mb-8" style={{ color: "hsl(195, 100%, 65%)" }}>
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {portfolioData.skills.technical.map((skill) => (
                <ParticleCard
                  key={skill}
                  className="particle-card flex flex-col items-center justify-center gap-3 aspect-square"
                >
                  <img
                    src={`https://placehold.co/60x60/060010/94a3b8?text=${skill.substring(0, 2)}`}
                    alt={`${skill} logo`}
                    className="w-14 h-14 rounded-lg"
                  />
                  <span className="font-semibold text-center">{skill}</span>
                </ParticleCard>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center mb-8" style={{ color: "hsl(195, 100%, 65%)" }}>
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {portfolioData.skills.soft.map((skill) => (
                <ParticleCard key={skill} className="particle-card flex flex-col items-center justify-center gap-3 aspect-square">
                  <span>{skill}</span>
                </ParticleCard>
              ))}
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
                avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
              />
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input type="text" id="name" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email
                </label>
                <input type="email" id="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Why do you want to contact me?
                </label>
                <textarea id="message" rows="4" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"></textarea>
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-700 transition-colors duration-300">
                Send Message
              </button>
            </form>
          </div>
        </section>

        <footer className="text-center py-8" style={{ color: "hsl(0, 0%, 80%)" }}>
          <p>Designed & Built by {portfolioData.name}</p>
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}