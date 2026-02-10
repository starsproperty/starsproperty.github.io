import { useState } from "react";
import { motion } from "framer-motion";

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function Envelope({ onOpen, isOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center perspective-1000">
      <motion.div
        className="relative cursor-pointer preserve-3d"
        onClick={!isOpen ? onOpen : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered && !isOpen ? 1.04 : 1,
          rotateY: isHovered && !isOpen ? -5 : 0,
          rotateX: isHovered && !isOpen ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ width: 280, height: 190 }}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #f5efe6 0%, #ede4d8 100%)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        />

        {/* Inner card that peeks out */}
        <motion.div
          animate={{
            y: isOpen ? -100 : isHovered && !isOpen ? -12 : 0,
          }}
          transition={{ duration: 0.7, ease: "circOut", delay: isOpen ? 0.35 : 0 }}
          className="absolute left-5 right-5 top-5 bottom-5 rounded-sm z-20 flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #fffcf7 0%, #faf6f0 100%)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span className="text-neutral-400 text-[10px] tracking-[0.4em] uppercase mb-2"
            style={{ fontFamily: "var(--font-display)" }}>
            For Ulik
          </span>
          <div className="w-8 h-px bg-neutral-200 mb-3" />
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="text-rose-400 text-2xl select-none"
          >
            ♥
          </motion.span>
        </motion.div>

        {/* Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: isOpen ? 170 : 0,
            zIndex: isOpen ? 5 : 40,
          }}
          transition={{ duration: 0.7, ease: "circInOut" }}
          className="absolute top-0 left-0 right-0 origin-top z-40 preserve-3d"
          style={{ height: "50%" }}
        >
          {/* Front face of flap */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              background: "linear-gradient(180deg, #e8e0d4 0%, #ede4d8 100%)",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              borderRadius: "8px 8px 0 0",
            }}
          />
          {/* Back face of flap */}
          <div
            className="absolute inset-0 rotate-x-180 backface-hidden"
            style={{
              background: "linear-gradient(180deg, #d9d1c5 0%, #ddd5c9 100%)",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              borderRadius: "8px 8px 0 0",
            }}
          />
        </motion.div>

        {/* Bottom pocket triangles */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background: "linear-gradient(135deg, #f0e8dc 0%, #ede4d8 100%)",
              clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background: "linear-gradient(225deg, #f0e8dc 0%, #ede4d8 100%)",
              clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "55%",
              background: "linear-gradient(0deg, #e8dfcf 0%, #ede4d8 100%)",
              clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)",
            }}
          />
        </div>

        {/* Wax seal */}
        <motion.div
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.3 : 1,
          }}
          transition={{ duration: 0.35 }}
          className="absolute z-50 flex items-center justify-center"
          style={{
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #d4444a 0%, #b91c2a 60%, #8b1520 100%)",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.15)",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              className="select-none font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                color: "rgba(60,10,15,0.55)",
                textShadow: "0 1px 1px rgba(255,255,255,0.1)",
              }}
            >
              U
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Hint text */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mt-8 text-white/40 text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Tap to Open
        </motion.div>
      )}
    </div>
  );
}
