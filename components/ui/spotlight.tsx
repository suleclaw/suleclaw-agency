"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  panelClassName?: string;
}

export function Spotlight({
  children,
  className,
  color = "rgba(245, 158, 11, 0.15)",
  panelClassName,
}: SpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || prefersReducedMotion) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);

      setPosition({ x: `${x}%`, y: `${y}%` });
    },
    [prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion) {
      setIsHovered(true);
    }
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: "50%", y: "50%" });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isHovered && !prefersReducedMotion && (
          <motion.div
            className={`absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-inherit ${panelClassName || ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute -inset-x-4 -inset-y-4"
              style={{
                background: `radial-gradient(300px circle at ${position.x} ${position.y}, ${color}, transparent 60%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}
