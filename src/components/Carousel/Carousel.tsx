import React, { useEffect, useRef, useState } from "react";
interface Props {
  children: React.ReactNode[];
  autoScroll?: number;
}
export const Carousel: React.FC<Props> = ({ children, autoScroll }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const currentPos = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      setCurrentIndex(Math.round(currentPos / width));
    }
  };

  const handleDot = (idx: number) => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({ left: width * idx });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const currentPos = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: currentPos + width,
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const currentPos = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: currentPos - width,
      });
    }
  };

  useEffect(() => {
    if (autoScroll) {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = setInterval(() => {
        if (currentIndex !== children.length - 1) {
          handleNext();
        } else {
          carouselRef.current?.scrollTo({ left: 0 });
        }
      }, autoScroll);
    }
  }, [carouselRef.current?.scrollLeft]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel" onScroll={handleScroll} ref={carouselRef}>
        {children}
      </div>
      <div className="carousel-navigation">
        <div className="dot-navigation">
          {children.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Skip to carousel item ${idx + 1}`}
              className={`trans-btn ${
                idx === currentIndex ? "dot-active" : ""
              }`}
              onClick={() => handleDot(idx)}
            >
              ●
            </button>
          ))}
        </div>
        <div className="arrow-navigation">
          <button
            aria-label="Previous Carousel Item"
            className={`trans-btn ${
              currentIndex === 0 ? "arrow-disabled" : ""
            }`}
            onClick={handlePrev}
          >
            ◀
          </button>
          <button
            aria-label="Next Carousel Item"
            className={`trans-btn ${
              currentIndex === children.length - 1 ? "arrow-disabled" : ""
            }`}
            onClick={handleNext}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
