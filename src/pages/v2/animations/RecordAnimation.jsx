import { motion, useReducedMotion } from 'motion/react';
import { Square } from 'lucide-react';
import './animations.css';

const LOOP_DURATION = 7;
const EASE_OUT = [0.22, 1, 0.36, 1];

export function RecordAnimation() {
  const reducedMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const MotionSpan = motion.span;
  const loop = (times) => ({
    duration: LOOP_DURATION,
    ease: EASE_OUT,
    repeat: reducedMotion ? 0 : Infinity,
    times,
  });

  return (
    <div className="ssr-animation-shell">
      <div className="ssr-animation absolute inset-0 flex flex-col overflow-hidden bg-[#F5F5F5] font-sans text-[#111111]">
        <MotionDiv
          className="relative flex flex-1 items-center justify-center bg-[#F5F5F5] p-8"
        >
        <MotionDiv
          className="relative z-10 flex w-[80%] max-w-[480px] aspect-[16/10] flex-col overflow-hidden bg-white"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={reducedMotion ? { opacity: 1, y: 0 } : {
            opacity: [1, 1, 1, 0, 1],
            y: [0, 0, 0, 5, 0],
            borderRadius: ['12px', '12px', '12px', '12px', '12px'],
            boxShadow: [
              '0 20px 40px rgba(0,0,0,0.06)',
              '0 20px 40px rgba(0,0,0,0.06)',
              '0 20px 40px rgba(0,0,0,0.06)',
              '0 20px 40px rgba(0,0,0,0.06)',
              '0 20px 40px rgba(0,0,0,0)',
              '0 20px 40px rgba(0,0,0,0.06)',
            ],
          }}
          transition={loop([0, 0.94, 0.964, 0.982, 1])}
          style={{ borderRadius: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
        >
          <div className="flex h-8 shrink-0 items-center gap-1.5 overflow-hidden border-b border-gray-200 bg-[#E8EAED] px-3">
            <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>

          <div className="relative flex-1 overflow-hidden bg-white p-4">
            <MotionDiv
              animate={reducedMotion ? { y: 0 } : { y: [0, 0, -44, -44, -18, 0] }}
              transition={loop([0, 0.62, 0.74, 0.86, 0.95, 1])}
            >
              <div className="h-2 w-16 rounded bg-gray-100" />
              <div className="mt-3 h-1.5 w-3/5 rounded bg-gray-100" />
              <div className="mt-1.5 h-1.5 w-2/5 rounded bg-gray-100" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-10 rounded bg-gray-100" />
                <div className="h-10 rounded bg-gray-100" />
                <div className="h-10 rounded bg-gray-100" />
              </div>
              <div className="mt-4 h-10 rounded bg-gray-50 p-3">
                <div className="h-2 w-2/3 rounded bg-gray-200" />
              </div>
              <div className="mt-2 h-10 rounded bg-gray-50 p-3">
                <div className="h-2 w-1/2 rounded bg-gray-100" />
              </div>
              <div className="mt-2 h-10 rounded bg-gray-50 p-3">
                <div className="h-2 w-3/4 rounded bg-gray-100" />
              </div>
            </MotionDiv>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />

            <MotionDiv
              className="absolute inset-0 z-30 flex items-center justify-center bg-[#111111]/10"
              animate={reducedMotion ? { opacity: 0 } : {
                opacity: [0, 1, 1, 1, 0, 0],
              }}
              transition={loop([0, 0.015, 0.5, 0.54, 0.58, 1])}
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-[#111111] text-2xl font-medium text-white shadow-lg">
                <MotionSpan
                  className="absolute"
                  animate={reducedMotion ? { opacity: 0 } : { opacity: [0, 1, 1, 0, 0] }}
                  transition={loop([0, 0.015, 0.17, 0.22, 1])}
                >
                  3
                </MotionSpan>
                <MotionSpan
                  className="absolute"
                  animate={reducedMotion ? { opacity: 0 } : { opacity: [0, 0, 1, 1, 0, 0] }}
                  transition={loop([0, 0.22, 0.26, 0.38, 0.43, 1])}
                >
                  2
                </MotionSpan>
                <MotionSpan
                  className="absolute"
                  animate={reducedMotion ? { opacity: 0 } : { opacity: [0, 0, 1, 1, 0, 0] }}
                  transition={loop([0, 0.4, 0.44, 0.52, 0.57, 1])}
                >
                  1
                </MotionSpan>
              </div>
            </MotionDiv>

            <MotionDiv
              className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-gray-800 bg-[#111111] px-2.5 py-1.5 text-white shadow-lg"
              animate={reducedMotion ? { opacity: 1, scale: 1 } : {
                opacity: [0, 0, 0, 1, 1, 0],
                scale: [0.97, 0.97, 0.97, 1, 1, 0.97],
              }}
              transition={loop([0, 0.56, 0.6, 0.66, 0.955, 1])}
            >
              <MotionSpan
                className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.4, ease: 'easeInOut', repeat: reducedMotion ? 0 : Infinity }}
              />
              <span className="w-[29px] font-mono text-[7px] font-medium tabular-nums">00:03</span>
              <span className="h-3 w-px bg-gray-700" />
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-gray-800"><Square size={6} fill="currentColor" /></span>
            </MotionDiv>
          </div>
        </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
}
