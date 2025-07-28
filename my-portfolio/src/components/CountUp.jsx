import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

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

export default CountUp;