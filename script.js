function GameBoard(){
    const row = 3;
    const column =3;
    let board = []; 
    let cellVal = 1;

    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push(cellVal++);
        }
    }

    const getBoard = ()=> board;

    const addMark = (cell, player)=>{
        for(let i=0; i < row; i++){
            for(let j =0; j < column; j++){
                if(board[i][j] == cell){
                    board[i][j] = player;
                }
            }
        }
    }
    return{
        getBoard,
        addMark,
    }

}


const gameBoard = GameBoard();
gameBoard.addMark(3, 'x');
gameBoard.addMark(5, 'y');
console.log(gameBoard.getBoard());

