function GameBoard(){
    const row = 3;
    const column =3;
    let board = []; 
  

    
    const createBoard = () =>{
        let cellVal = 1;
        for(let i = 0; i < row; i++){
            board[i] = [];
            for(let j = 0; j < column; j++){
                board[i].push(cellVal++);
            }
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

    createBoard();





    return{
        getBoard,
        addMark,
        createBoard,
    }

}


function GameController(
    playerOne = 'Player One',
    playerTwo = 'PlayerTwo'
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
            id: 'playerOne',
            marker: 'x',
            markerPos: [],
            score: 0,
        },
        {
            name: playerTwo,
            id: 'playerTwo',
            marker: 'y',
            markerPos: [],
            score:0,
        }
    ];

    let activePlayer = players[0];
    
    
    const getPlayerScore = (player_no) => players[player_no == 'one' ? 0 : 1].score;

    
    const getPlayerID = () => activePlayer.id;

    const addPlayerScore = () => activePlayer.score++;
    
    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const restartGame = () =>{
        // activePlayer.markerPos = [];
        for(player of players){
            player['markerPos'] = [];
        }
        activePlayer = players[0];
        board.createBoard();
        console.log("Restart Successful");
        
        
    }
    const resetGame = () => {
        players[0].score = 0;
        players[1].score = 0;
        restartGame();
    }



    const getActivePlayer = () => activePlayer;

    const showUpdatedBoard = () => {
    
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const changeGameStatus = () => {
        onGoing = onGoing ? false : true;
        console.log('Changed game status to: ' + onGoing);
        
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
        
        if(checkWinner(getActivePlayer())){
            addPlayerScore();            
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
        getPlayerScore,
        restartGame,
        changeGameStatus,
        resetGame,
    }
}


function ScreenController(){
    const game = GameController();
    const boardContainer = document.querySelector('.board')
    const resetButton = document.querySelector('#reset');
    const restartButton = document.querySelector('#restart');
    const board = game.getBoard();



    const restartBoard = ()=>{
       let cells = boardContainer.querySelectorAll('.cell');
       for(cell of cells){
            cell.textContent = '';
            cell.disabled = false;
       }
       if(!game.getGameStatus()){
            game.changeGameStatus();
       }

       game.restartGame();
    }

    const controllerFunc = () =>{
        restartButton.addEventListener('click', event =>{
            restartBoard();
        })

        resetButton.addEventListener('click', event =>{
            restartBoard();
            game.resetGame();
            updateScoreDisplay();
        })
    }



    const displayBoard = () =>{
        for(row of board){
            for(cell of row){
                let cellButton = document.createElement('button');
                cellButton.textContent =cell;
                cellButton.id = cell;
                cellButton.classList = 'cell';
                cellButton.addEventListener('click', event =>{
                    const activePlayer = game.getActivePlayer();

                    if(game.getGameStatus()){
                        cellButton.textContent = activePlayer.marker;
                        cellButton.disabled = true;
                        game.playRound(event.target.id);
                        
                    }
                    updateScoreDisplay();
                })
                boardContainer.appendChild(cellButton);

            }
        }
    }



    const updateScoreDisplay = () =>{
        const playerOneScore = document.querySelector("#playerOne");
        const playerTwoScore = document.querySelector("#playerTwo");
        
        playerOneScore.value = 'Score: ' +  game.getPlayerScore('one');
        playerTwoScore.value = 'Score: ' +  game.getPlayerScore('two');
    }



    displayBoard();
    controllerFunc();
    


}

ScreenController();

// Console Testing: 
// const game = GameController();
// game.playRound(1);
// game.playRound(9);
// game.playRound(2);
// game.playRound(8);
// game.playRound(3);
// game.playRound(1);


