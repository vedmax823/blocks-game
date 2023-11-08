"use client";

import React, { FC, Fragment } from "react";
import { FigureList } from "@/models/figure-list";
import { Figure } from "@/models/figures/figure";
import useFigureList from "@/hooks/use-figure-list";
import OneFigureComponent from "./one-figure-component";

interface BlockElementProps {
  handleOnDownFigure: (figure: Figure) => void;
}

const BlockElements: FC<BlockElementProps> = ({ handleOnDownFigure }) => {
  const figureList: FigureList = useFigureList().figureList;

  localStorage.setItem("figureList", JSON.stringify(figureList));

  return (
    <Fragment>
      <div className="flex justify-around w-full">
        <div className="flex justify-center items-center w-1/3 h-64">
          {figureList.figureArr[0] && figureList.figureArr[0].is_visible && (
            <OneFigureComponent
              canMove={figureList.figureArr[0].canMove}
              figure={figureList.figureArr[0]}
              handleMouseDown={() =>
                handleOnDownFigure(figureList.figureArr[0] as Figure)
              }
            />
          )}
        </div>
        <div className="flex justify-center items-center w-1/3 h-64">
          {figureList.figureArr[1] && figureList.figureArr[1].is_visible && (
            <OneFigureComponent
              canMove={figureList.figureArr[1].canMove}
              figure={figureList.figureArr[1]}
              handleMouseDown={() =>
                handleOnDownFigure(figureList.figureArr[1] as Figure)
              }
            />
          )}
        </div>
        <div className="flex justify-center items-center w-1/3 h-64">
          {figureList.figureArr[2] && figureList.figureArr[2].is_visible && (
            <OneFigureComponent
              canMove={figureList.figureArr[2].canMove}
              figure={figureList.figureArr[2]}
              handleMouseDown={() =>
                handleOnDownFigure(figureList.figureArr[2] as Figure)
              }
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
//onClick={change}
export default BlockElements;
