import { motion, useReducedMotion } from 'motion/react';
import './animations.css';

const LOOP_DURATION = 7;
const EASE_OUT = [0.22, 1, 0.36, 1];

export function ExportAnimation() {
  const reducedMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const MotionSpan = motion.span;
  const loop = (times, ease = EASE_OUT) => ({
    duration: LOOP_DURATION,
    ease,
    repeat: reducedMotion ? 0 : Infinity,
    times,
  });

  return (
    <div className="ssr-animation-shell">
      <div className="ssr-animation absolute inset-0 flex items-center justify-center overflow-hidden bg-[#F5F5F5] font-sans text-[#111111]">
        <div className="w-[66%] min-w-[250px] rounded-lg bg-white p-6 shadow-md">
          <div className="space-y-4 text-[9px]">
            <div>
              <div className="mb-1 font-semibold text-gray-600">Format</div>
              <div className="flex h-7 rounded-md bg-gray-100 p-0.5">
                <MotionSpan
                  className="flex flex-1 items-center justify-center rounded bg-white text-center font-semibold shadow-sm"
                  animate={reducedMotion ? { opacity: 1 } : {
                    opacity: [1, 0.55, 1, 1],
                  }}
                  transition={loop([0, 0.12, 0.2, 1])}
                >
                  MP4
                </MotionSpan>
                <span className="flex flex-1 items-center justify-center text-center text-gray-400">WebM</span>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between font-semibold text-gray-600">
                <span>Quality</span>
                <span>High</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-gray-200">
                <MotionSpan
                  className="absolute inset-y-0 left-0 rounded-full bg-[#111111]"
                  animate={reducedMotion ? { width: '100%' } : {
                    opacity: [1, 1, 1, 0, 0, 1],
                    width: ['56%', '56%', 'calc(100% - 5px)', 'calc(100% - 5px)', '56%', '56%'],
                  }}
                  transition={loop([0, 0.22, 0.42, 0.88, 0.94, 1])}
                />
                <MotionSpan
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#111111] bg-white"
                  style={{ left: '56%' }}
                  animate={reducedMotion ? { left: 'calc(100% - 5px)' } : {
                    opacity: [1, 1, 1, 0, 0, 1],
                    left: ['56%', '56%', 'calc(100% - 5px)', 'calc(100% - 5px)', '56%', '56%'],
                  }}
                  transition={loop([0, 0.22, 0.42, 0.88, 0.94, 1])}
                />
              </div>
            </div>

            <MotionDiv
              className="flex h-9 items-center justify-center rounded-full bg-[#111111] text-[9px] font-medium text-white"
              animate={reducedMotion ? { scale: 1 } : {
                scale: [1, 1, 0.97, 1, 1],
              }}
              transition={loop([0, 0.44, 0.48, 0.53, 1])}
            >
              Export
            </MotionDiv>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <MotionDiv
                className="h-full bg-[#22C55E]"
                animate={reducedMotion ? { opacity: 1, width: '100%' } : {
                  opacity: [0, 0, 1, 1, 0, 0],
                  width: ['0%', '0%', '0%', '100%', '100%', '0%'],
                }}
                transition={loop([0, 0.5, 0.54, 0.82, 0.9, 1], 'linear')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
