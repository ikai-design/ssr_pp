import { useEffect, useRef, useState } from 'react';

/** Fades/slides content in once when it enters the viewport (subtle motion). */
export function ScrollReveal({ children, className = '', delayMs = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

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
  }, []);

  const combined = [
    'reveal-on-scroll',
    visible ? 'reveal-on-scroll--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <Tag ref={ref} className={combined} style={style} {...rest}>
      {children}
    </Tag>
  );
}
