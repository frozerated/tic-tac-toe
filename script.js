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
                    let temp = board[i][j];
                    board[i][j] = player;
                    return temp;
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
    const winningCombinations = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    const players =[
        {
            name: playerOne,
            marker: 'x',
            markerPos: [],
        },
        {
            name: playerTwo,
            marker: 'y',
            markerPos: []
        }
    ];

    let activePlayer = players[0];
    
    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const showUpdatedBoard = () => {
    
        console.log(`${getActivePlayer().name}'s turn.`);
        console.log(board.getBoard());
    }

    const endRound = (playerName) =>{
        console.log(`GAME OVER! ${getActivePlayer().name} WON!`);
        
    }

    const checkWinner = (activePlayer) =>{
        playerPos = activePlayer.markerPos;
        playerPos.sort((a, b) => a - b);
        playerPos = playerPos.join();
        console.log(playerPos);


        for(combination of winningCombinations){
            if(playerPos.includes(combination)){
                console.log('The Winner is ' + activePlayer.name);
                return true;
            }
        }
        return false;
    }

    const playRound = (cell) => {
        console.log(`${getActivePlayer().name} Mark Finished`)
        let playerMarkerPos = board.addMark(cell, getActivePlayer().marker)
        if(playerMarkerPos === undefined){
            console.log('Move Invalid, Try Again.');
            return;
        }
        
        getActivePlayer().markerPos.push(playerMarkerPos);
        
        console.log(getActivePlayer().markerPos);
        if(checkWinner(getActivePlayer())) return;

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
