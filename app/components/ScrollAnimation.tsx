'use client';

import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollAnimation({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-4 transition-all duration-700 ${className}`}
    >
      {children}
    </div>
  );
} 