import React, { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  loop?: boolean;
  disableLeft?: boolean;
  disableRight?: boolean;
  leftFn?: (...args: any[]) => any;
  rightFn?: (...args: any[]) => any;
  sensitivity?: number;
  threshold?: number;
  speed?: number;
}

const SwipeButton: React.FC<Props> = ({
  children,
  loop = true,
  disableLeft,
  disableRight,
  leftFn,
  rightFn,
  sensitivity = 20,
  threshold = 100,
  speed = 130,
}) => {
  const [clearedSens, setClearedSens] = useState(false);
  const [dragging, setDragging] = useState(false);
  const initialPos = useRef<number>(0);
  const buttonRef = useRef<HTMLDivElement>(null);

  const loopSlide = (
    el: HTMLElement,
    fn: (...args: any[]) => void,
    speed: number,
    direction: "left" | "right"
  ) => {
    el.style.transition = `transform ${speed}ms ease-in`;
    el.style.transform = `translateX(${
      direction === "right" ? window.innerWidth : -window.innerWidth
    }px)`;
    setTimeout(() => {
      el.style.transition = `none`;
      el.style.transform = `translateX(${
        direction === "right" ? -window.innerWidth : window.innerWidth
      }px)`;
      setTimeout(() => {
        fn();
        el.style.transition = `transform ${speed}ms ease-out`;
        el.style.transform = `translateX(0px)`;
      }, 10);
    }, speed);
  };

  const handleStartDrag = (e: React.MouseEvent | React.Touch) => {
    if (buttonRef.current) {
      buttonRef.current.style.transition = `none`;
      setDragging(true);
      initialPos.current = e.pageX;
    }
  };

  const handleDrag = (e: MouseEvent | Touch) => {
    const difference = e.pageX - initialPos.current;
    if (dragging && buttonRef.current) {
      if (difference > sensitivity || difference < -sensitivity) {
        setClearedSens(true);
      }
      if (clearedSens) {
        buttonRef.current.style.transform = `translateX(${difference}px)`;
      }
    }
  };

  const handleEndDrag = (e: MouseEvent | Touch) => {
    const difference = e.pageX - initialPos.current;
    if (dragging && buttonRef.current) {
      buttonRef.current.style.transition = `transform ${speed}ms ease-in`;
      if (difference > threshold && rightFn && !disableRight) {
        if (loop) {
          loopSlide(buttonRef.current, rightFn, speed, "right");
        } else {
          buttonRef.current.style.transform = `translateX(0px)`;
          rightFn();
        }
      } else if (difference < -threshold && leftFn && !disableLeft) {
        if (loop) {
          loopSlide(buttonRef.current, leftFn, speed, "left");
        } else {
          buttonRef.current.style.transform = `translateX(0px)`;
          leftFn();
        }
      } else {
        buttonRef.current.style.transition = `transform ${speed}ms ease-out`;
        buttonRef.current.style.transform = `translateX(0px)`;
      }
    }
    setClearedSens(false);
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag);
    return () => document.removeEventListener("mousemove", handleDrag);
  }, [handleDrag]);

  useEffect(() => {
    document.addEventListener("mouseup", handleEndDrag);
    return () => document.removeEventListener("mouseup", handleEndDrag);
  }, [handleEndDrag]);

  const handleTouchStart = (e: React.TouchEvent) =>
    handleStartDrag(e.touches[0]);
  const handleTouchMove = (e: TouchEvent) => handleDrag(e.touches[0]);
  const handleTouchEnd = (e: TouchEvent) => handleEndDrag(e.changedTouches[0]);

  useEffect(() => {
    document.addEventListener("touchmove", handleTouchMove);
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, [handleEndDrag]);

  useEffect(() => {
    document.addEventListener("touchend", handleTouchEnd);
    return () => document.removeEventListener("touchend", handleTouchEnd);
  }, [handleEndDrag]);

  return (
    <div
      className="swipe-btn-wrapper"
      ref={buttonRef}
      onMouseDown={handleStartDrag}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};
export default SwipeButton;
