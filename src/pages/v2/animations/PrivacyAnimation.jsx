import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, FileVideo, Scissors, Video } from 'lucide-react';
import './animations.css';

const LOOP_DURATION = 4.8;
const EASE_OUT = [0.22, 1, 0.36, 1];

export function PrivacyAnimation() {
  const reducedMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const loop = (times) => ({
    duration: LOOP_DURATION,
    ease: EASE_OUT,
    repeat: reducedMotion ? 0 : Infinity,
    times,
  });

  const enter = (start, end) => ({
    opacity: reducedMotion ? 1 : [0, 0, 1, 1, 0],
    scale: reducedMotion ? 1 : [0.96, 0.96, 1, 1, 0.96],
    y: reducedMotion ? 0 : [3, 3, 0, 0, 3],
    transition: loop([0, start, end, 0.86, 1]),
  });

  const arrow = (start, end) => ({
    opacity: reducedMotion ? 1 : [0, 0, 0.6, 0.6, 0],
    x: reducedMotion ? 0 : [-2, -2, 0, 0, -2],
    transition: loop([0, start, end, 0.86, 1]),
  });

  return (
    <div className="ssr-animation-shell">
      <div className="ssr-animation absolute inset-0 flex items-center justify-center overflow-hidden bg-[#F5F5F5] font-sans text-[#240029]">
        <div className="flex items-start justify-center gap-6 v2-privacy-animation-flow">
          <MotionDiv className="flex min-w-0 flex-col items-center" animate={enter(0.08, 0.18)}>
            <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-md"><Video size={34} strokeWidth={1.6} /></span>
            <span className="mt-2 text-[11px] font-medium text-[#6B5C6E]">Record</span>
          </MotionDiv>
          <MotionDiv className="text-[#6B5C6E]/60 mt-[31px]" animate={arrow(0.22, 0.3)}><ArrowRight size={18} /></MotionDiv>
          <MotionDiv className="flex min-w-0 flex-col items-center" animate={enter(0.32, 0.42)}>
            <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-md"><Scissors size={34} strokeWidth={1.6} /></span>
            <span className="mt-2 text-[11px] font-medium text-[#6B5C6E]">Edit</span>
          </MotionDiv>
          <MotionDiv className="text-[#6B5C6E]/60 mt-[31px]" animate={arrow(0.46, 0.54)}><ArrowRight size={18} /></MotionDiv>
          <MotionDiv className="flex min-w-0 flex-col items-center" animate={enter(0.56, 0.66)}>
            <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-md"><FileVideo size={34} strokeWidth={1.6} /></span>
            <span className="mt-2 text-[11px] font-medium text-[#6B5C6E]">Local MP4</span>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
