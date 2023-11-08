"use client";
import { FC } from "react";

import { FieldLeftTopType } from "./main-block";
import { Figure } from "@/models/figures/figure";


import OneFigureComponent from "./one-figure-component";
import useBoard from "@/hooks/use-board";
import useFigureList from "@/hooks/use-figure-list";
import { FigureList } from "@/models/figure-list";
import useScore from "@/hooks/use-score";

interface MovingFigureProps {
  movingFigure: Figure;
  mouseCoords: FieldLeftTopType;
  destoumovingFigure : () => void;
}

const MovingFigure: FC<MovingFigureProps> = ({ movingFigure, mouseCoords, destoumovingFigure }) => {
  const boardCntr = useBoard();
  const board = boardCntr.board;
  const figureList = useFigureList()
  const score = useScore()

  const returnFigureToBlock = () => {
    const newFigureArr = figureList.figureList.figureArr.map(item => {
        if (item?.id == movingFigure.id){
            item.is_visible = true;
            return item
        }
        else{
            return item
        }
    })

    const newFigureList = new FigureList()
    newFigureList.figureArr = newFigureArr;
    figureList.setFigureList(newFigureList)
  }
  const handleMouseUp = () => {
    const cell = board.findCellByTopLeft(mouseCoords.top, mouseCoords.left)
    if (cell){
        const cellArr = board.getCellList(cell, movingFigure)
        if (cellArr){
            cellArr.forEach(cell => cell.setEmpty())
            const length = movingFigure.getWidth()
            score.addScore(Number( length ) || 0)
            figureList.figureList.removeObj(movingFigure)
            const cnt = board.findClearedCells()
            score.addScore(Number(cnt * 9))
            board.removeFullCells()
            const newBoard = board.getCopyBoard()
            boardCntr.setBoard(newBoard)
            destoumovingFigure()
        }
        else{
            returnFigureToBlock()
            destoumovingFigure()
            
        }
    }
    else{
        returnFigureToBlock()
        destoumovingFigure()
    }
  };

  
  return (
    <div
      className="absolute flex justify-center items-center"
      style={{ top: `${mouseCoords.top}px`, left: `${mouseCoords.left}px` }}
      onMouseUp={handleMouseUp}
    >
      <OneFigureComponent
        canMove={movingFigure.canMove}
        figure={movingFigure}
        handleMouseDown={() => {}}
      />
    </div>
  );
};

export default MovingFigure;
