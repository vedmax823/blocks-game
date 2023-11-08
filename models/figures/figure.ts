

interface FigureBlockInterface {
    [key: number]: number[][];
}

const figureBlock : FigureBlockInterface ={
    0 : [[1]],
    1 : [[1,1]],
    2 : [[1, 1, 1]],
    3 : [[1, 1, 1, 1]],
    4 : [[1, 1, 1, 1, 1]],
    5 : [[1], [1]],
    6 : [[1], [1], [1]],
    7 : [[1], [1], [1], [1]],
    8 : [[1], [1], [1], [1], [1]],
    9 : [[1, 1], [1, 1]],
    10 : [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
    11 : [[1, 1, 1], [1, 0, 1]],
    12 : [[1, 0, 1], [1, 1, 1]],
    13 : [[1, 0, 1], [1, 1, 1]],
    14 : [[1, 1], [0, 1], [1, 1]],
    15 : [[1, 1], [1, 0], [1, 1]],
    16 : [[1, 1, 0], [0, 1, 1]],
    17 : [[0, 1, 1], [1, 1, 0]],
    18 : [[1, 0], [1, 1], [0, 1]],
    19 : [[0, 1], [1, 1], [1, 0]],
    20 : [[0, 0, 1], [1, 1, 1]],
    21 : [[1, 1, 1], [0, 0, 1]],
    22 : [[1, 0, 0], [1, 1, 1]],
    23 : [[1, 1, 1], [1, 0, 0]],
    24 : [[1, 1], [1, 0], [1, 0]],
    25 : [[1, 1], [0, 1], [0, 1]],
    26 : [[0, 1], [0, 1], [1, 1]],
    27 : [[1, 0], [1, 0], [1, 1]],
    28 : [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
    29 : [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
    30 : [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
    31 : [[1, 0, 0], [1, 0, 0], [1, 1, 1]],
    32 : [[1, 0], [0, 1]],
    33 : [[0, 1], [1, 0]],
    34 : [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    35 : [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
    36 : [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
    37 : [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]],
    38 : [[1, 0], [1, 1], [1, 0]],
    39 : [[0, 1], [1, 1], [0, 1]],
    40 : [[0, 1, 0], [1, 1, 1]],
    41 : [[1, 1, 1], [0, 1, 0]],
    42 : [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
    43 : [[0, 0, 1], [1, 1, 1], [0, 0, 1]],
    44 : [[0, 1, 0], [0, 1, 0], [1, 1, 1]],
    45 : [[1, 0, 0], [1, 1, 1], [1, 0, 0]],
    46 : [[1, 0], [1, 1]],
    47 : [[0, 1], [1, 1]],
    48 : [[1, 1], [0, 1]],
    49 : [[1, 1], [1, 0]]
}


export class Figure{
    
    id: number;
    is_visible : boolean;
    figureBrics : number[][];
    length : number = 0;
    height : number = 0;
    canMove : boolean;
    top : number = 0;
    left : number = 0;
    width : number = 0;
    hheight : number = 0;
    myId : number;

    constructor(myId : (number | undefined) = undefined){
        this.id = Math.random()
        this.is_visible = true;
        this.myId = myId ? myId : Math.floor(Math.random() * Object.keys(figureBlock).length)
        this.figureBrics = figureBlock[this.myId]
        // this.figureBrics = figureBlock[4]
        this.setWidhLength()
        this.canMove = true
    }

    setWidhLength(){
        this.height = this.figureBrics.length;
        this.length = this.figureBrics[0].length
    }

    getWidth() : number{
        let count : number = 0;
        this.figureBrics.forEach(row =>{
            row.forEach(cell =>
                count += cell
            )
        })
        return count
    }

}