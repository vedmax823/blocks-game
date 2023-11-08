import { Board } from "@/models/board";
import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

interface BoardStore {
  board: Board;
  setBoard: (board: Board) => void;
}

type MyPersist = (
  config: StateCreator<BoardStore>,
  options: PersistOptions<BoardStore>
) => StateCreator<BoardStore>;

// const useBoard = create<BoardStore>(
//   (persist as MyPersist)(
//     (set) => ({
//       board: new Board(),
//       setBoard: (newBoard) => set({ board: newBoard }),
//     }),
//     {
//       name: "board-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );


function createBoard() : Board{
  if (typeof window !== 'undefined') {
    const localBoard = localStorage.getItem('localBoard')
    if (!localBoard) return new Board()
    const JSONlocalBoard = JSON.parse(localBoard)
    const newBord = new Board()
    newBord.reinitCells(JSONlocalBoard.board.cells)
    return newBord
  }

  return new Board()
}


const useBoard = create<BoardStore>(
  
    (set) => ({
      board: createBoard(),
      setBoard: (newBoard) => set({ board: newBoard }),
    })
  
);
export default useBoard;
