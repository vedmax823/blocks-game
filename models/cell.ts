export class Cell{
    readonly x: number;
    readonly y: number;
    top : number;
    left : number;
    isEmpty : boolean;
    id: number;

    haveBeenCleared : boolean;

    constructor(x: number, y:number, isEmpty = true){
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.id = Math.random()
        this.top=0;
        this.left=0;
        this.haveBeenCleared = false;
    }

    setTop = (top : number) : void =>{
        this.top = top
    }

    setLeft = (left : number) : void => {
        this.left = left
    }

    setEmpty = () : void => {
        this.isEmpty = false;
    }

    setHaveBeenCleared = () : void => {
        this.haveBeenCleared = true
    }

    clear = () : void => {
        this.isEmpty = true;
        this.haveBeenCleared = false
    }

}