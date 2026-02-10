import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Starfield } from "@/components/Starfield";
import { Envelope } from "@/components/Envelope";
import { Letter } from "@/components/Letter";
import { PhotoWall } from "@/components/PhotoWall";

type Step = "entrance" | "reading" | "reveal";

export default function Home() {
  const [step, setStep] = useState<Step>("entrance");

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <Starfield />

      {/* Floating hearts — subtle Valentine decoration */}
      {step !== "reveal" && (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="floating-heart"
              style={{
                left: `${12 + i * 18}%`,
                animationDelay: `${i * 1.6}s`,
                animationDuration: `${8 + i * 2}s`,
                fontSize: `${10 + i * 2}px`,
                opacity: 0.12 + i * 0.02,
              }}
            >
              ♥
            </span>
          ))}
        </div>
      )}

      {/* Main Content Layer */}
      <AnimatePresence mode="wait">

        {/* PHASE 1: ENTRANCE */}
        {step === "entrance" && (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center justify-center gap-10"
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl text-white text-glow-soft text-center px-4"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600 }}
            >
              Hey, Ulik
            </motion.h1>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Envelope
                isOpen={false}
                onOpen={() => setStep("reading")}
              />
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: READING THE LETTER */}
        {step === "reading" && (
          <motion.div
            key="reading"
            className="relative z-20 w-full flex justify-center items-center px-4 min-h-screen py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <Letter onYes={() => setStep("reveal")} />
          </motion.div>
        )}

        {/* PHASE 3: THE REVEAL */}
        {step === "reveal" && (
          <motion.div
            key="reveal"
            className="relative w-full h-screen flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* The Photo Wall Background */}
            <PhotoWall />

            {/* Foreground Content */}
            <motion.div
              className="z-50 p-8 md:p-12 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl text-center max-w-2xl mx-4"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <h1 className="text-4xl md:text-6xl text-white mb-6 text-glow-soft"
                style={{ fontFamily: "var(--font-display)" }}>
                She said Yes!
              </h1>
              <p className="text-lg md:text-xl text-neutral-200 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}>
                Thank you for making me the happiest person in the universe.
                <br />
                You are my everything.
              </p>

              <motion.div
                className="mt-8 text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
