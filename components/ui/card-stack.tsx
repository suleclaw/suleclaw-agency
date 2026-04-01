"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "motion/react";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startFlipping = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    startFlipping();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startFlipping]);

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute inset-0 rounded-3xl p-4 shadow-xl
                     bg-bg-surface border border-border-default/50
                     flex flex-col justify-between"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div className="text-text-secondary">{card.content}</div>
          <div>
            <p className="text-text-primary font-medium">{card.name}</p>
            <p className="text-text-muted text-sm">{card.designation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
