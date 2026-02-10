import { motion } from "framer-motion";

const PHOTO_COUNT = 25;

export function PhotoWall() {
  // Generate paths for user-uploaded photos: /photos/1.jpg through /photos/25.jpg
  const images = Array.from({ length: PHOTO_COUNT }, (_, i) => `/photos/${i + 1}.jpg`);

  // Split images into 5 columns for the masonry/marquee effect
  const columns = [
    images.slice(0, 5),
    images.slice(5, 10),
    images.slice(10, 15),
    images.slice(15, 20),
    images.slice(20, 25),
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black/20">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-transparent to-[#0b0e1a] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />

      <div className="flex justify-between gap-4 h-[120vh] -mt-[10vh] opacity-60">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 w-1/5 min-w-[200px]">
            <motion.div
              animate={{ y: colIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{
                duration: 20 + colIndex * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-col gap-4"
            >
              {[...col, ...col].map((src, imgIndex) => (
                <div key={`${colIndex}-${imgIndex}`} className="rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={src}
                    alt="Memory"
                    className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    onError={(e) => {
                      // Hide broken images gracefully
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
