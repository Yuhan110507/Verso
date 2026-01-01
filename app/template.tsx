'use client';

import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
      style={{
        animation: isVisible ? 'pageEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <style>{`
        @keyframes pageEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pageExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Link transitions */
        a {
          transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        /* Button transitions */
        button {
          transition: all 0.2s ease;
        }
      `}</style>
      {children}
    </div>
  );
}
