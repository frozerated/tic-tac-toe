function GameBoard(){
    const row = 3;
    const column =3;
    const board = []; 

    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push(Cell());
        }
    }
    return board;
}

function Cell(){
    let value = 0;

    let addMarker = (player)=>{
        value = player;
    }

    const getValue = () => value;

    return{
        addMarker,
        getValue,
    };
}

console.log(GameBoard());
