"use client";

import useBoard from "@/hooks/use-board";
import BigCellComponent from "./big-cell-component";
import { useLocalStorage, useWindowSize } from "@uidotdev/usehooks";
import { useLayoutEffect, useState } from "react";

const BoardComponent = () => {
  const [windowSize, setWindowSize] = useState([0,0])
  const updateWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
  }
  useLayoutEffect(() => {
      window.addEventListener('resize', updateWindowSize);
      updateWindowSize();
      return () => window.removeEventListener('resize', updateWindowSize);
  },[])
  
  const board = useBoard();

  localStorage.setItem('localBoard', JSON.stringify(board))
  
  return (
      <div className="grid grid-cols-3 grid-rows-3 border-amber-600 border">
        {board.board.bigCells.map((bigCellArr, index) =>
          bigCellArr.map((bigCell, index) => (
            <BigCellComponent bigCell={bigCell} key={bigCell.id} />
          ))
        )}
      </div>
  );
};

export default BoardComponent;
