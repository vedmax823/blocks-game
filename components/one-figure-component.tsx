"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { Figure } from "@/models/figures/figure";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";

interface OneFiguereProps {
  figure: Figure;
  canMove : boolean;
  handleMouseDown: (figure: Figure) => void;
}

const OneFigureComponent: FC<OneFiguereProps> = ({
  figure,
  canMove,
  handleMouseDown,
}) => {
  const figureRef = useRef<HTMLHeadingElement>(null);
  const windowSize = useWindowSize()

  useEffect(() => {
    if (figureRef.current) {
      const currerntFigure = figureRef.current.getBoundingClientRect();
      figure.left = currerntFigure.left;
      figure.top = currerntFigure.top;
      figure.width = currerntFigure.width;
      figure.hheight = currerntFigure.height;
    }
  }, [figureRef, figure, windowSize]);

  const opacityClass = canMove ? "" : "opacity-50";


  return (
    <div
      id={`id${figure.id}`}
      ref={figureRef}
      onMouseDown={() => handleMouseDown(figure)}
      className={cn("flex flex-col", opacityClass)}
    >
      {figure.figureBrics.map((row) => (
        <div className="flex" key={Math.random()}>
          {row.map((brick) => {
            return brick == 1 ? (
              <div
                className="bg-amber-500 w-12 aspect-square border-amber-600 border-2 border-collapse"
                key={Math.random()}
              ></div>
            ) : (
              <div
                className="bg-transparent w-12 aspect-square"
                key={Math.random()}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default OneFigureComponent;
