// import { Row } from "react-bootstrap"
// import boardSlice from "../../../slicers/boardSlice"
// import { BigCell } from "./BigCell"
// import { Cell } from "./Cell"
// import { Figure } from "./figures/Figure"

import { BigCell } from "./big-cell"
import { Cell } from "./cell"
import { Figure } from "./figures/figure"

export class Board {
    
    cells : Cell[] = []   
    bigCells : BigCell[][] = []

    constructor(){
        this.initBigCells()
    }
    
    public initBigCells(){
        const row : BigCell[] = []
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const bigCell : BigCell = new BigCell(j, i)
                const arrCell : Cell[][] = []
                for (let k = bigCell.y * 3; k < bigCell.y * 3 + 3; k ++){
                    const rowCell : Cell[] = []
                    for (let l = bigCell.x * 3; l < bigCell.x * 3 + 3; l++){
                        const cell : Cell = new Cell(l, k)
                        rowCell.push(cell)
                        this.cells.push(cell)
                    }
                    arrCell.push(rowCell)
                    bigCell.pushSmallCells(arrCell)
                }
                row.push(bigCell)
            }
        }
        this.bigCells.push(row)
    }

    public reinitCells(cells : Cell[]){
        this.cells = []
        this.bigCells = []
        const row : BigCell[] = []

        let count = 0;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const bigCell : BigCell = new BigCell(j, i)
                const arrCell : Cell[][] = []
                for (let k = bigCell.y * 3; k < bigCell.y * 3 + 3; k ++){
                    const rowCell : Cell[] = []
                    for (let l = bigCell.x * 3; l < bigCell.x * 3 + 3; l++){
                        
                        const cell : Cell = new Cell(l, k, cells[count].isEmpty)
                        rowCell.push(cell)
                        this.cells.push(cell)
                        count++;
                    }
                    arrCell.push(rowCell)
                    bigCell.pushSmallCells(arrCell)
                }
                row.push(bigCell)
            }
        }
        this.bigCells.push(row)
    }

    public findCellByTopLeft(top : number, left : number) : Cell | undefined {
        let oneCell = undefined
        const check = (cell : Cell) => ((Math.abs(cell.top - top) < 27) && (Math.abs(cell.left - left) < 27));
        oneCell = this.cells.find(check)           
        return oneCell
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.bigCells = this.bigCells
        newBoard.cells = this.cells;
        
        return newBoard;
    }

    public getCellByXY(x: number, y : number){
        const check = (cell : Cell) => ((cell.x == x) && (cell.y == y))
        let oneCell = this.cells.find(check)
        return oneCell
    }

    public getCellList(cell: Cell, figure : Figure) : Cell[] | false{

        let cellArr : Cell[] = []
        let startX = cell.x;
        let startY = cell.y;
        

        let figureBrics = figure.figureBrics

        for (let i = 0; i < figureBrics.length; i ++)
            for (let j = 0; j < figureBrics[i].length; j++){
                if (figureBrics[i][j] != 0){
                    let oneCell = this.getCellByXY(startX + j, startY + i)
                    if (!oneCell?.isEmpty) return false
                    cellArr.push(oneCell!)
                }
            }

        return cellArr
    }

    public checkPossibleMove(figure : Figure) : boolean{
        let flag : boolean = false;
        this.cells.forEach(cell => {
            if (this.getCellList(cell, figure)) flag = true
        })
        return flag
    }

    private checkHorizontals() : number{
        let flag : boolean
        let count : number = 0;
        for (let i = 0; i < 9; i++){
            flag = true
            for(let j = 0; j < 9; j++){
                let oneCell = this.getCellByXY(j, i)      
                if (oneCell?.isEmpty) flag = false
            }
            if (flag){
                count++
                for(let j = 0; j < 9; j++)
                    this.getCellByXY(j, i)?.setHaveBeenCleared()      
            }
        }
        return count
    }

    private checkWertikals() : number{
        let flag : boolean
        let count : number = 0;
        for (let i = 0; i < 9; i++){
            flag = true
            for(let j = 0; j < 9; j++){
                let oneCell = this.getCellByXY(i, j)      
                if (oneCell?.isEmpty) flag = false
            }
            if (flag){
                count++
                for(let j = 0; j < 9; j++)
                    this.getCellByXY(i, j)?.setHaveBeenCleared()      
            }
        }
        return count
    }

    private checkBigCells() : number{
        let flag : boolean;
        let count : number = 0;
        this.bigCells.forEach(bigRows => {
            bigRows.forEach(bigCell=>{
                    flag = true;
                    bigCell.cells.forEach(rows => {
                        rows.forEach(smCell =>{
                                if (smCell.isEmpty) flag = false
                            }
                        )
                    })
                    if (flag){
                        count++
                        bigCell.cells.forEach(rows => {
                            rows.forEach(smCell =>{
                                    smCell.setHaveBeenCleared()
                                }
                            )
                        })
                    }
                }
            )
        })

        return count
    }

    public removeFullCells(){
        this.cells.forEach(smCell => {
            smCell.haveBeenCleared && smCell.clear()
        })
    }

    public findClearedCells() : number{
        let count : number = 0
        count += this.checkHorizontals()
        count += this.checkWertikals()
        count += this.checkBigCells()
        return count + count
    }

    
}