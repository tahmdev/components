import React, { useEffect, useRef } from "react";

interface Props {
  show: boolean;
  setShow: (...args: any[]) => void;
  children: React.ReactNode[];
  buttonClasses?: string;
  popupClasses?: string;
  buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export const PopupButton: React.FC<Props> = ({
  show,
  setShow,
  children,
  buttonClasses,
  popupClasses,
  buttonAttributes,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (
      ref.current &&
      e.target instanceof Element &&
      !ref.current.contains(e.target)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [handleMouseDown]);

  const positionPopup = (element: HTMLElement) => {
    const bounding = element.getBoundingClientRect();
    return {
      x: bounding.left <= window.innerWidth / 2 ? "left" : "right",
      y: bounding.top <= window.innerHeight / 2 ? "top" : "bottom",
    };
  };

  return (
    <div className="popupbutton-wrapper" ref={ref}>
      <button
        className={`popupbutton-btn ${buttonClasses ? buttonClasses : ""}`}
        onClick={() => setShow(!show)}
        aria-expanded={show}
        {...buttonAttributes}
      >
        {children[0]}
      </button>
      {show && ref.current && (
        <div
          className={`popupbutton-popup ${popupClasses ? popupClasses : ""}`}
          style={{
            [positionPopup(ref.current).y]: "100%",
            [positionPopup(ref.current).x]: "0",
          }}
        >
          {children[1]}
        </div>
      )}
    </div>
  );
};
