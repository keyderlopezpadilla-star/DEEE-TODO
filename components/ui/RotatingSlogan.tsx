'use client';

import { useState, useEffect } from 'react';

interface RotatingSloganProps {
  slogans: string[];
  interval?: number;
  className?: string;
}

/**
 * Muestra una lista de eslóganes que van rotando con una animación divertida.
 * Pensado para darle personalidad y un tono cercano a la copistería.
 */
export default function RotatingSlogan({
  slogans,
  interval = 2800,
  className = '',
}: RotatingSloganProps) {
  const [index, setIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (slogans.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
      setAnimationKey((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [slogans.length, interval]);

  return (
    <span className={`inline-flex overflow-hidden align-bottom ${className}`}>
      <span
        key={animationKey}
        className="animate-slogan-in inline-block"
      >
        {slogans[index]}
      </span>
      <span className="text-neon-cyan animate-blink ml-0.5">|</span>
    </span>
  );
}
