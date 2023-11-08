"use client";

import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import IconButton from "./icon-button";
import Button from "./button";
import useScore from "@/hooks/use-score";
import useBestScore from "@/hooks/use-best-score";
import useBoard from "@/hooks/use-board";
import useFigureList from "@/hooks/use-figure-list";
import { Board } from "@/models/board";
import { FigureList } from "@/models/figure-list";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  isGameOver: boolean;
  handleGameOver: () => void;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  isGameOver,
  handleGameOver,
}) => {
  const [newRecord, setNewRecord] = useState(false);
  const score = useScore();
  const bestScore = useBestScore();
  const board = useBoard();
  const figureList = useFigureList();

  const handleNewGame = () => {
    const newBoard = new Board();
    const newFigureList = new FigureList();
    if (score.score > bestScore.bestScore) bestScore.setScore(score.score);
    score.clearScore();
    board.setBoard(newBoard);
    figureList.setFigureList(newFigureList);
    handleGameOver();
    setNewRecord(() => false);
    onClose();
  };

  useEffect(() => {
    if (score.score > bestScore.bestScore) {
      setNewRecord(() => true);
    }
  }, [score, bestScore]);

  const headerText = isGameOver
    ? "Game Over"
    : "Do you realy want to start a new game?";
  const recordText = newRecord ? "New record :" : "You scored :";

  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
                <div className="relative flex w-full flex-col items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="absolute right-4 top-4">
                    <IconButton onClick={onClose} icon={<X size={15} />} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold text-amber-600">
                      {headerText}
                    </h1>
                  </div>
                  <div className="border-solid border-2 border-amber-600 flex flex-col justify-center items-center mt-4 p-2 rounded-lg">
                    {newRecord ? (
                      
                        <h1 className="text-2xl font-semibold text-amber-600 mb-2">
                          Сongratulations!
                        </h1>
                      
                    ) : null}
                    
                      <p className="text-xl font-semibold text-amber-600 w-fit">
                        {recordText}
                      </p>
                    
                    
                      <p className="text-5xl font-semibold text-amber-600 w-fit">
                        {score.score}
                      </p>
                     
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button onClick={handleNewGame}>Start new game</Button>
                    {!isGameOver ? (
                      <Button onClick={onClose}>Continue this game</Button>
                    ) : null}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
