import React, { useEffect, useRef, useState } from "react";
import { getPercent } from "../util";

interface Props {
  min: number;
  max: number;
  initMin: number;
  initMax: number;
  onChange: (...args: any[]) => any;
}
export const MultiRange: React.FC<Props> = ({
  min,
  max,
  initMin,
  initMax,
  onChange,
}) => {
  let [minVal, setMinVal] = useState(initMin);
  let [maxVal, setMaxVal] = useState(initMax);
  let rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(minVal, maxVal);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${getPercent(minVal - min, max - min)}%`;
      rangeRef.current.style.width = `${getPercent(
        maxVal - minVal,
        max - min
      )}%`;
    }
  }, [minVal, maxVal]);

  return (
    <div className="multirange-wrapper">
      <input
        className={`thumb ${minVal > max / 1.4 ? "z5" : "z3"}`}
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => {
          if (+e.target.value < minVal || +e.target.value <= +maxVal) {
            setMinVal(+e.target.value);
          }
        }}
      />
      <input
        className="thumb z4"
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => {
          if (+e.target.value > +maxVal || +e.target.value >= +minVal) {
            setMaxVal(+e.target.value);
          }
        }}
      />
      <div className="slider">
        <div className="slider-track" />
        <div className="slider-range" ref={rangeRef} />
        <div className="slider-left-value"> {minVal} </div>
        <div className="slider-right-value"> {maxVal} </div>
      </div>
    </div>
  );
};
