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

    const getGameStatus = () => onGoing;

    const endRound = () =>{
        console.log(`GAME OVER! ${getActivePlayer().name} WON!`);
        changeGameStatus();
        
    }

    const checkWinner = ()=>{
        let comboCheck = [];


        for(combo of winningCombinations){
            comboCheck = combo.filter((num) => getActivePlayer().markerPos.includes(num));
            if(comboCheck.length >= 3){
                return true
            }
        }
        
    }

    const playRound = (cell) => {

    
        if(!onGoing){
            console.log('Game Has Ended.');
            
            return;
            
        }
        console.log(`${getActivePlayer().name} Mark Finished`)
        let playerMarkerPos = board.addMark(cell, getActivePlayer().marker)
        if(playerMarkerPos === undefined){
            console.log('Move Invalid, Try Again.');
            return;
        }
        
        getActivePlayer().markerPos.push(playerMarkerPos);
        // checkCombination();
        
        if(checkWinner(getActivePlayer())){
            endRound();
            return;
        }
        

        switchPlayerTurn();
        showUpdatedBoard();
    }


    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        getGameStatus,
    }
}


function ScreenController(){
    const game = GameController();
    const boardContainer = document.querySelector('.board')

    const board = game.getBoard();

    for(row of board){
        for(cell of row){
            let cellButton = document.createElement('button');
            cellButton.textContent =cell;
            cellButton.id = cell;
            cellButton.classList = 'cell';
            cellButton.addEventListener('click', event =>{
                if(game.getGameStatus()){
                    
                    cellButton.textContent = game.getActivePlayer().marker;
                    game.playRound(event.target.id)
                }
                
            })
            boardContainer.appendChild(cellButton);

        }
    }




}

ScreenController();
