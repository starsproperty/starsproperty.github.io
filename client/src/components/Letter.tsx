import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

interface LetterProps {
  onYes: () => void;
}

export function Letter({ onYes }: LetterProps) {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const handleNoInteraction = () => {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    setNoBtnPosition({ x, y });
    setHasMoved(true);
  };

  const handleYes = () => {
    // Confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    onYes();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20, rotateY: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-lg rounded-sm shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden z-40 mx-4 perspective-1000 preserve-3d"
      style={{ background: "linear-gradient(180deg, #fffdf9 0%, #faf6f0 100%)" }}
    >
      {/* Content Container */}
      <div
        className="relative h-[60vh] max-h-[600px] overflow-y-auto custom-scrollbar p-8 md:p-12 flex flex-col"
      >
        <div className="mb-8 text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 border-b border-neutral-200 pb-2"
            style={{ fontFamily: "var(--font-display)" }}>
            February 14th
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl text-neutral-800 mb-6 text-center leading-tight"
          style={{ fontFamily: "var(--font-display)" }}>
          Dearest Ulik,
        </h2>

        <div className="text-neutral-600 leading-relaxed space-y-4 text-justify mb-12"
          style={{ fontFamily: "var(--font-body)" }}>
          <p>
            From the moment the red string made our paths cross, my world has changed in ways I never thought possible.
            Your shine brighter than any star, and your voice is a melody I want to listen to on repeat forever.
          </p>
          <p>
            You, just like a Sony TV in 2000s, bring 16'000'000 colors to my days.
            You bring Baku warmth to my cold Madrid nights. But hopefully soon enough, we will
            both be able to feel the same weather. Every moment, every second with you, even through
            kilometers away, feels like a dream I never want to wake up from. I can't wait to hug you again.
            I love all the little things aabout you. I fell in love with them the moment I saw you. The way
            your eyes light up, the way you put up your hair, the face you make when you smoke.
          </p>
          <p>
            I love the comfort of just being near you. Life is an adventure, and there is not a single soul in the
            whole multiverse I would rather share it with. I pinky promise to always be there to make you laugh, to hold
            your hand through every lose, and to celebrate every win with you. You are my forever, Ulik.
          </p>
          <p>
            So, I have a very important question to ask you...
          </p>
        </div>

        <div className="mt-auto pt-8 border-t border-neutral-100">
          <h3 className="text-2xl md:text-3xl text-center text-neutral-800 mb-8"
            style={{ fontFamily: "var(--font-display)" }}>
            Will you be my Valentine?
          </h3>

          <div className="flex justify-center items-center gap-6 relative h-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-500 hover:shadow-green-500/30 transition-all duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Yes, Absolutely!
            </motion.button>

            <motion.div
              animate={hasMoved ? { x: noBtnPosition.x, y: noBtnPosition.y } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute left-[calc(50%+80px)]"
              style={{ position: 'absolute' }}
            >
              <button
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                className="px-8 py-3 bg-red-500/10 text-red-500 font-semibold rounded-full border border-red-200 hover:bg-red-50 transition-colors cursor-not-allowed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                No
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
