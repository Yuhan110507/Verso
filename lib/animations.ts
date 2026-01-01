// Custom animation library for Verso's literary aesthetic
// All durations in milliseconds, all easing matches CSS standards

export type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
}

const DEFAULT_CONFIG: AnimationConfig = {
  duration: 400,
  delay: 0,
  easing: 'ease-in-out',
};

export const VERSO_ANIMATIONS = {
  // Page Turn - Gentle Fold (0.8s)
  gentleFold: {
    duration: 800,
    easing: 'ease-in-out',
    className: 'animate-gentle-fold',
  },

  // Navigation - Bookmark Drop (0.4s)
  bookmarkDrop: {
    duration: 400,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    className: 'animate-bookmark-drop',
  },

  // Ink Flow - Writing state (1.2s, loops)
  inkFlow: {
    duration: 1200,
    easing: 'ease-in',
    className: 'animate-ink-flow',
  },

  // Margin Note Pulse - Feedback (0.6s)
  marginNote: {
    duration: 600,
    easing: 'ease-out',
    className: 'animate-margin-note',
  },

  // Marginalia Line - Nav hover (0.3s)
  marginaliaLine: {
    duration: 300,
    easing: 'ease-out',
    className: 'animate-marginalia-line',
  },

  // Ink Splash - Button click (0.6s)
  inkSplash: {
    duration: 600,
    easing: 'ease-out',
    className: 'animate-ink-splash',
  },

  // Book Appreciation - Like action (0.4s)
  bookAppreciate: {
    duration: 400,
    easing: 'ease-in-out',
    className: 'animate-book-appreciate',
  },

  // Particle Float - Appreciation particles (1.2s)
  particleFloat: {
    duration: 1200,
    easing: 'ease-out',
    className: 'animate-particle-float',
  },

  // Page Settle - Comment appears (0.5s)
  pageSettle: {
    duration: 500,
    easing: 'ease-out',
    className: 'animate-page-settle',
  },

  // Page Lift - Chapter transition out (0.6s)
  pageLift: {
    duration: 600,
    easing: 'ease-out',
    className: 'animate-page-lift',
  },

  // Page Descend - Chapter transition in (0.6s)
  pageDescend: {
    duration: 600,
    easing: 'ease-out',
    className: 'animate-page-descend',
  },

  // Highlight Glow - Text selection (0.3s)
  highlightGlow: {
    duration: 300,
    easing: 'ease-out',
    className: 'animate-highlight-glow',
  },
};

// Hook for triggering animations
export function useAnimation() {
  const triggerAnimation = (
    element: HTMLElement | null,
    animationName: keyof typeof VERSO_ANIMATIONS,
    config?: AnimationConfig
  ) => {
    if (!element) return;

    const animation = VERSO_ANIMATIONS[animationName];
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    // Remove animation class if it exists
    element.classList.remove(animation.className);

    // Force reflow to restart animation
    void element.offsetWidth;

    // Add animation
    element.classList.add(animation.className);

    // Remove after animation completes
    setTimeout(() => {
      element.classList.remove(animation.className);
    }, animation.duration + (finalConfig.delay || 0));
  };

  const triggerAnimationAsync = async (
    element: HTMLElement | null,
    animationName: keyof typeof VERSO_ANIMATIONS,
    config?: AnimationConfig
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (!element) {
        resolve();
        return;
      }

      const animation = VERSO_ANIMATIONS[animationName];
      const finalConfig = { ...DEFAULT_CONFIG, ...config };

      element.classList.remove(animation.className);
      void element.offsetWidth;
      element.classList.add(animation.className);

      setTimeout(() => {
        element.classList.remove(animation.className);
        resolve();
      }, animation.duration + (finalConfig.delay || 0));
    });
  };

  return { triggerAnimation, triggerAnimationAsync, animations: VERSO_ANIMATIONS };
}

// Particle effect creator for appreciations
export function createParticles(x: number, y: number, count: number = 4) {
  const particles: Array<{ x: number; y: number; tx: number }> = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const velocity = 8;
    const tx = Math.cos(angle) * velocity;

    particles.push({
      x,
      y,
      tx,
    });
  }

  return particles;
}

// Scroll progress calculator for bookmark indicator
export function calculateScrollProgress() {
  if (typeof window === 'undefined') return 0;

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;

  return (scrollTop / (documentHeight - windowHeight)) * 100;
}
