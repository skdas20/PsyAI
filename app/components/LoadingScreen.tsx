'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Ensure randomness is generated client-side
    setHasMounted(true);
    const starCount = 50;
    const generatedStars = Array.from({ length: starCount }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1.5,
    }));
    setStars(generatedStars);

    // Set up the exit sequence
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // fade-out duration
    }, 3000); // time before starting exit animation

    return () => clearTimeout(timer);
  }, []);

  // Render nothing until mounted and loading
  if (!hasMounted || !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center">
      {/* Star field */}
      <div className={`absolute inset-0 transition-opacity duration-1500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {stars.map((star, index) => (
          <div
            key={index}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
            className="absolute w-1 h-1 bg-violet-500 rounded-full animate-starTrail"
          />
        ))}
      </div>

      {/* Centered Title */}
      <div className="relative flex flex-col items-center justify-center">
        <h1
          className={`text-7xl font-bold font-['Dancing_Script'] cursive-glow ${
            isExiting ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
        >
          PsyAI
        </h1>
      </div>

      <style jsx>{`
        @keyframes starTrail {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-100px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-starTrail {
          animation: starTrail 2s linear infinite;
        }
        .cursive-glow {
          text-shadow: 0 0 8px rgba(186, 85, 211, 0.8), 0 0 16px rgba(186, 85, 211, 0.6);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.75);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 1s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
