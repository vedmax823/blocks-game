import { Figure } from '@/models/figures/figure';

import { FigureList } from "@/models/figure-list";
import { create } from "zustand";


interface FigureListStore {
  figureList: FigureList;
  setFigureList : (board : FigureList) => void
}


function createFigureList() : FigureList{
  if (typeof window !== 'undefined') {
    // Perform localStorage action

    
    const localFigureList = localStorage.getItem('figureList')
    if (!localFigureList) return new FigureList()
    const JSONlocalFigureList = JSON.parse(localFigureList)

    const newFigureArr = JSONlocalFigureList.figureArr.map((item : Figure | null) => {
      if (!item) return
      return new Figure(item.myId)
    })

    const newFigureList = new FigureList()
    newFigureList.figureArr = newFigureArr
    return newFigureList

  }

  return new FigureList()
}


const useFigureList = create<FigureListStore>(
   (set) => ({
    figureList : createFigureList(),
    setFigureList : (newFigureList) => set({figureList : newFigureList})
   })
)
export default useFigureList;
