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

    const showBoard = ()=>{

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
    let onGoing = true;
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
    }

    const changeGameStatus = () => {
        onGoing = onGoing ? false : true;
    }

    const endRound = () =>{
        console.log(`GAME OVER! ${getActivePlayer().name} WON!`);
        changeGameStatus();
        
    }

    const checkWinner = (activePlayer) =>{
        playerPos = activePlayer.markerPos;
        playerPos.sort((a, b) => a - b);
        playerPos = playerPos.join();

        for(combination of winningCombinations){
            if(playerPos.includes(combination)){
                return true;
            }
        }
        
        return false;
    }

    const playRound = (cell) => {
        if(!onGoing) return;
        console.log(`${getActivePlayer().name} Mark Finished`)
        let playerMarkerPos = board.addMark(cell, getActivePlayer().marker)
        if(playerMarkerPos === undefined){
            console.log('Move Invalid, Try Again.');
            return;
        }
        
        getActivePlayer().markerPos.push(playerMarkerPos);
    
        if(checkWinner(getActivePlayer())){
            endRound();
        }
        

        switchPlayerTurn();
        showUpdatedBoard();
    }


    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        onGoing,
    }
}


function ScreenController(){
    const game = GameController();
    const boardContainer = document.querySelector('.board')

    //display board
    //get board
    //for every cell, create a button, add an id and class

    const board = game.getBoard();

    for(row of board){
        for(cell of row){
            let cellButton = document.createElement('button');
            cellButton.textContent =cell;
            cellButton.id = cell;
            cellButton.classList = 'cell';
            cellButton.addEventListener('click', event =>{
                if(game.onGoing){
                    console.log('Game Status:' + game.onGoing);
                    
                    cellButton.textContent = game.getActivePlayer().marker;
                    game.playRound(event.target.id)
                }
                
            })
            boardContainer.appendChild(cellButton);

        }
    }




}

ScreenController();

const game = GameController();


// gameBoard.addMark(3, 'x');
// gameBoard.addMark(5, 'y');
// console.log(gameBoard.getBoard());
