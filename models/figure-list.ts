import { Figure } from "./figures/figure";




type FigureType = Figure | undefined

export class FigureList{
    figureArr : FigureType[] = []

    constructor(){
        this.createNewFigureList()
    }

    createNewFigureList(){
        this.figureArr.splice(0,this.figureArr.length);
        for(let i =0; i< 3; i++)
            this.figureArr.push(new Figure())
    }

    createEmptyFigureList(){
        this.figureArr.splice(0,this.figureArr.length);
        for(let i =0; i< 3; i++)
            this.figureArr.push(undefined)
    }

    removeObj(obj : Figure){
        const myIndex = this.figureArr.indexOf(obj)
        if (myIndex !== -1) {
            this.figureArr[myIndex] = undefined;
        }
        this.checkEmpty() && this.createEmptyFigureList()
        // this.checkEmpty() && this.createNewFigureList()
    }

    checkEmpty():boolean{
        for (let i = 0 ; i < this.figureArr.length; i++){
            if (this.figureArr[i] != undefined) return false
        }
        return true
        
    }

    checkFull() : boolean{
        for (let i = 0 ; i < this.figureArr.length; i++){
            if (this.figureArr[i] == undefined) return false
        }
        return true
    }

    isGameOver(): boolean{
        let flag : boolean = false;
        this.figureArr.forEach(figure => {
            if (figure?.canMove) flag = true
        })
        return flag
    }
}