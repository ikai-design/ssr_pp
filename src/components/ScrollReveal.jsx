import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

/** Fades/slides content in once when it enters the viewport (subtle motion). */
export function ScrollReveal({ children, className = '', delayMs = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [visible]);

  const combined = [
    'reveal-on-scroll',
    visible ? 'reveal-on-scroll--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <div ref={ref} className={combined} style={style}>
      {children}
    </div>
  );
}
