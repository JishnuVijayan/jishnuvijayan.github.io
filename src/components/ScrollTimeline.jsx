import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import cn from "../utility/cn";

const ScrollTimeline = ({ events, cardAlignment = "alternating" }) => {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { amount: 0.2, once: true });

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
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
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

export default ScrollTimeline;
