'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
  decimals = 0}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        }
      }});

    return () => controls.stop();
  }, [from, to, duration, isInView, prefix, suffix, decimals]);

  return <span ref={ref} className={className}>{`${prefix}${from.toFixed(decimals)}${suffix}`}</span>;
}
