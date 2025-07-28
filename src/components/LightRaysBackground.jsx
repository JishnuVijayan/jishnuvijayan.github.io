import React from "react";

export default function LightRaysBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-[-100%] bg-[radial-gradient(circle_at_center,_var(--color-accent)_0,_transparent_15%),radial-gradient(circle_at_center,_var(--color-accent)_0,_transparent_15%)] bg-no-repeat bg-[0_0,50px_50px] opacity-20 [--color-accent:hsl(195,100%,50%)] animate-light-rays" />
      <style>{`
        @keyframes light-rays {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-light-rays {
          animation: light-rays 200s linear infinite;
        }
      `}</style>
    </div>
  );
}
