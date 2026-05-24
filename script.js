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


function GameController(
    playerOne = 'Player One',
    playerTwo = 'PlyerTwo'
){
    const board = GameBoard();
    const players =[
        {
            name: playerOne,
            marker: 'x'
        },
        {
            name: playerTwo,
            marker: 'y'
        }
    ];

    let activePlayer = players[0];
    
    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const showUpdatedBoard = () => {
    
        console.log(`${getActivePlayer.name}'s turn.`);
        console.log(board.getBoard());
    }

    const playRound = (cell) => {
        console.log(`${getActivePlayer.name} Mark Finished`)
        board.addMark(cell, getActivePlayer().marker);
        switchPlayerTurn();
        showUpdatedBoard();
    }


    return {
        playRound,
        getActivePlayer
    }
}


const game = GameController();
// gameBoard.addMark(3, 'x');
// gameBoard.addMark(5, 'y');
// console.log(gameBoard.getBoard());

