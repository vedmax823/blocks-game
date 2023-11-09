"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { Figure } from "@/models/figures/figure";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";
import useBoard from "@/hooks/use-board";
import useFigureList from "@/hooks/use-figure-list";
import { FigureList } from "@/models/figure-list";
import useScore from "@/hooks/use-score";

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
  const boardCnt = useBoard()
  const score = useScore()
  const figureListCnt = useFigureList()
  const figureList = figureListCnt.figureList
  const board = boardCnt.board

  const [startsCoords, setStartsCoords] = useState({ top : 0, left : 0})

 

  useEffect(() => {
    if (figureRef.current) {
      const currerntFigure = figureRef.current.getBoundingClientRect();
      figure.left = currerntFigure.left;
      figure.top = currerntFigure.top;
      figure.width = currerntFigure.width;
      figure.hheight = currerntFigure.height;
      setStartsCoords({
        top : currerntFigure.top,
        left : currerntFigure.left
      })
    }
  }, [figureRef, figure, windowSize]);

  useEffect(() => {
    if (figureRef.current){
      
    }
  }, [figureRef])


  const opacityClass = canMove ? "" : "opacity-50";

  // const handleTouchStart = (e : React.TouchEvent) => {
  //   e.stopPropagation()
  //   e.persist()
  //   setIsSensorMove(true)
  //   let touch = e.touches[0] || e.changedTouches[0];
  //   console.log(touch.clientX, touch.clientY )
  //   console.log('start')
  //   // handleMouseDown(figure)
  // }

  const returnFigureToBlock = () => {
    const oldFigureArr = figureList.figureArr

    const newFigureArr = oldFigureArr.map((item : Figure | undefined) => {
      if (!item) return
      return new Figure(item.myId)
    })

    const newFigureList = new FigureList()
    newFigureList.figureArr = newFigureArr

    figureListCnt.setFigureList(newFigureList)
  }

  // const cntAbstantFigures = () => {
  //   figureList.figureArr.reduce((acc, item) => {
  //     if (!item) return acc++

  //     return acc
  //   }, 0)
  // }

  const handleTouchEnd = (e : React.TouchEvent) => {
    // console.log(e.changedTouches[0]?.clientX + figure.hheight / 2, e.changedTouches[0]?.clientY + figure.width / 2)
    const mouseCoords = {top : e.changedTouches[0]?.clientY - figure.hheight / 2, left : e.changedTouches[0]?.clientX - figure.width / 2}

    const cell = board.findCellByTopLeft(mouseCoords.top, mouseCoords.left)
    console.log(cell)
    if (cell){
      const cellsArr = board.getCellList(cell, figure)
      console.log(cellsArr)
      if(cellsArr){
        cellsArr.forEach(cell => cell.setEmpty())
        const length = figure.getWidth()
        score.addScore(Number( length ) || 0)
        figureList.removeObj(figure)
        
        const cnt = board.findClearedCells()
        score.addScore(Number(cnt * 9))
        board.removeFullCells()
        const newBoard = board.getCopyBoard()
        boardCnt.setBoard(newBoard)

        
        
        
        // figureRef.current!.style.position = "relative"

      }
      else{
        figureRef.current!.style.top  = `${startsCoords.top}px`
        figureRef.current!.style.left  = `${startsCoords.left}px`
      }
    }
    else{
      returnFigureToBlock()
    }
    
    console.log('touch end')
    // handleMouseDown(figure)
  }

  const handleTouchCenel = (e : React.TouchEvent) => {
    // console.log(e.touches[0].clientX, e.touches[0].clientY )


    console.log('touch cenel')
    // handleMouseDown(figure)
  }

  const testHandleMousedown = () => {
    console.log('test mouse down')
    handleMouseDown(figure)
  }

  const handleTouchMove = (e : React.TouchEvent) => {
    e.persist()
    e.stopPropagation()
    if (!figureRef.current) return
    let touch = e.touches[0] || e.changedTouches[0];
    figureRef.current.style.position = "absolute"
    figureRef.current.style.top  = `${touch.clientY - figure.hheight / 2}px`
    figureRef.current.style.left  = `${touch.clientX - figure.width / 2}px`
  }




  




  return (
    <div
      id={`id${figure.id}`}
      ref={figureRef}
      onMouseDown={() => handleMouseDown(figure)}
      // onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
      // onTouchCancel={(e) => handleTouchCenel(e)}
      className={cn("flex flex-col", opacityClass)}
      style={{
        // pointerEvents : "none"
      }}


    >
      {figure.figureBrics.map((row) => (
        <div className="flex" key={Math.random()}>
          {row.map((brick) => {
            return brick == 1 ? (
              <div
                className="bg-amber-500 aspect-square border-amber-600 border-2 border-collapse"
                key={Math.random()}
                style={{width : '3vw', minWidth : '35px'}}
              ></div>
            ) : (
              <div
                className="bg-transparent aspect-square"
                style={{width : '3vw', minWidth : '35px'}}
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
