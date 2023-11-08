"use client";

import { Fragment, createContext, useEffect, useRef, useState } from "react";
import { Figure } from "@/models/figures/figure";
import BlockElements from "./block-elements";
import BoardComponent from "./board-components";
import useFigureList from "@/hooks/use-figure-list";
import { FigureList } from "@/models/figure-list";
import MovingFigure from "./moving-figure";
import useScore from "@/hooks/use-score";
import useBestScore from "@/hooks/use-best-score";
import useBoard from "@/hooks/use-board";
import Modal from "./modal";
import Button from "./button";

export type FieldLeftTopType = {
  top: number;
  left: number;
};

export const MouseCoordsContext = createContext<FieldLeftTopType | undefined>(
  undefined
);

const MainBlock = () => {
  
  const [isMounted, setIsMounted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const refField = useRef<HTMLDivElement>(null);
  const [movingFigure, setMovingFigure] = useState<Figure>();
  const [mouseCoords, setMouseCoords] = useState<FieldLeftTopType>({
    top: 0,
    left: 0,
  });
  const figureList = useFigureList();
  const board = useBoard();

  const bestScore = useBestScore().bestScore;
  const score = useScore().score;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const destoumovingFigure = () => {
    setMovingFigure(undefined);
  };

  const handleOpenModal = () => {
    setOpenModal(() => true);
  };

  const handleCloseModal = () => {
    setOpenModal(() => false);
  };

  const handleGameOver = () => {
    setIsGameOver(() => false);
  };

  const handleOnDownFigure = (figure: Figure) => {
    if (!figure.canMove) return;
    setMouseCoords(() => {
      return { top: Math.round(figure.top), left: figure.left };
    });
    const newFigureArr = figureList.figureList.figureArr.map((item) => {
      if (item?.id == figure.id) {
        item.is_visible = false;
        return item;
      }
      return item;
    });

    const newFigureList = new FigureList();
    newFigureList.figureArr = newFigureArr;
    figureList.setFigureList(newFigureList);
    setMovingFigure(() => figure);
  };

  const handleNewGame = () => {
    handleOpenModal();
  };

  const mouseMoveHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (movingFigure) {
      setMouseCoords(() => {
        return {
          top: Math.round(e.pageY - movingFigure.hheight / 2),
          left: Math.round(e.pageX - movingFigure.width / 2),
        };
      });
    }
  };

  useEffect(() => {
    let wasChanged: boolean = false;
    const countFigures = figureList.figureList.figureArr.reduce((acc, item) => {
      if (item) {
        if (item.canMove !== board.board.checkPossibleMove(item)) {
          item.canMove = board.board.checkPossibleMove(item);
          wasChanged = true;
        }

        return acc + 1;
      }
      return acc;
    }, 0);

    if (wasChanged) {
      const newFigureList = new FigureList();
      newFigureList.figureArr = figureList.figureList.figureArr;
      figureList.setFigureList(newFigureList);
    }

    if (!figureList.figureList.isGameOver()) {
      if (countFigures == 3) {
        const newFigureList = new FigureList();
        figureList.setFigureList(newFigureList);
      } else {
        setIsGameOver(() => true);
      }
    }
  }, [figureList, board]);

  useEffect(() => {
    if (isGameOver) handleOpenModal();
  }, [isGameOver]);

  if (!isMounted) return null;

  return (
    <Fragment>
      <div
        className="flex w-full flex-col"
        ref={refField}
        onMouseMove={(e) => mouseMoveHandle(e)}
      >
        <div className="fixed w-32 right-3">
          <div className="flex justify-center flex-col bg-yellow-400  rounded-lg">
            <div className="flex justify-center">
              <h3>Best score</h3>
            </div>
            <div className="flex justify-center">
              <h1>{bestScore}</h1>
            </div>
          </div>
          <div className="flex justify-center flex-col bg-yellow-400/50 rounded-lg">
            <div className="flex justify-center">
              <h3>Score</h3>
            </div>
            <div className="flex justify-center">
              <h1>{score ? score : 0}</h1>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <Button onClick={handleNewGame}>New game</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <BoardComponent />
        </div>
        <div className="flex justify-center mt-5">
          <BlockElements handleOnDownFigure={handleOnDownFigure} />
        </div>
        {movingFigure && mouseCoords && (
          <MovingFigure
            movingFigure={movingFigure}
            mouseCoords={mouseCoords}
            destoumovingFigure={destoumovingFigure}
          />
        )}
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        isGameOver={isGameOver}
        handleGameOver={handleGameOver}
      />
    </Fragment>
  );
};

export default MainBlock;
