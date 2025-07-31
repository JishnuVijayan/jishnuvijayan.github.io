import React from "react";

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

export default JVLogo;
