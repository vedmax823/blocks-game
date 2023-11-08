import { Cell } from "./cell"


export class BigCell extends Cell{
    
    cells : Cell[][] = []

    public pushSmallCells(arr : Cell[][]) {
        this.cells = arr
    }
    
}