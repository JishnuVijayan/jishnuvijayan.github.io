import React, { useRef, useEffect } from "react";

export default function ProfileCard({
  avatarUrl,
  name,
  title,
  email,
  phone,
  onContactClick,
}) {
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
}
