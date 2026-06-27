import { motion } from 'motion/react';
import './animations.css';

export function PolishAnimation() {
  const MotionDiv = motion.div;

  return (
    <div className="ssr-animation-shell">
      <div className="ssr-animation absolute inset-0 bg-[#F5F5F5] overflow-hidden font-sans text-[#111111] flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Stage */}
        <MotionDiv 
          className="flex-1 relative flex items-center justify-center p-8"
          animate={{ backgroundColor: ["#ffffff", "#F5F5F5", "#F5F5F5", "#F5F5F5", "#ffffff"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.8, 0.9, 1] }}
        >
          {/* The Video Preview */}
          <MotionDiv 
            className="relative w-[80%] max-w-[480px] aspect-[16/10] bg-white overflow-hidden flex flex-col z-10"
            animate={{ 
              borderRadius: ["0px", "12px", "12px", "12px", "0px"],
              boxShadow: [
                "0 0px 0px rgba(0,0,0,0)", 
                "0 20px 40px rgba(0,0,0,0.06)", 
                "0 20px 40px rgba(0,0,0,0.06)", 
                "0 20px 40px rgba(0,0,0,0.06)", 
                "0 0px 0px rgba(0,0,0,0)"
              ],
              scale: [1, 1, 1.25, 1.25, 1],
              y: [0, 0, 0, 0, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1] }}
            style={{ originY: 0.5 }}
          >
            {/* Browser Chrome (Appears) */}
            <MotionDiv 
              className="bg-[#E8EAED] w-full shrink-0 flex items-center px-3 gap-1.5 overflow-hidden border-b border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: [0, 32, 32, 32, 0], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.8, 0.9, 1] }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
            </MotionDiv>
            
            {/* Content Fake App */}
            <div className="flex-1 bg-white p-4 flex flex-col gap-3">
              <div className="w-32 h-4 bg-gray-100 rounded"></div>
              <div className="w-full h-16 bg-gray-50 rounded flex items-center p-3">
                 <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full flex-1 bg-gray-50 rounded"></div>
            </div>
          </MotionDiv>
        </MotionDiv>

        </div>
      </div>
    </div>
  );
}
