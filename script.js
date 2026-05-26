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
    const occupiedCell = [];
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

    
    let result = '';
    const checkGameResult = () =>{
        if(checkWinner() || checkDraw()){
            changeGameStatus();
            if(checkWinner()){
                result = `${getActivePlayer().name} WON!`
                addPlayerScore();
                return;
            }
            else result = `DRAW`
        }             
    }

    const getResult = () => result;


    function getActivePlayer() {
        return activePlayer;
    }

    const showUpdatedBoard = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const changeGameStatus = () => {
        onGoing = onGoing ? false : true;
        console.log('Changed game status to: ' + onGoing);
        
    }

    const getGameStatus = () => onGoing;

    const checkWinner = ()=>{
        let comboCheck = [];


        for(combo of winningCombinations){
            comboCheck = combo.filter((num) => getActivePlayer().markerPos.includes(num));
            if(comboCheck.length >= 3){
                return true
            }
        }
        
    }

    const checkDraw = () => occupiedCell.length >= 9;

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
        occupiedCell.push(playerMarkerPos);
        getActivePlayer().markerPos.push(playerMarkerPos);
        

        checkGameResult();
        if(!getGameStatus()){
            console.log(getResult());
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
        getResult,
    }
}


function ScreenController(){
    const game = GameController();
    const resetButton = document.querySelector('#reset');
    const restartButton = document.querySelector('#restart');



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


    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () =>{
        const board = game.getBoard();
        boardDiv.textContent ='';
        
        
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;


        board.forEach((row) => {
            row.forEach((cell)=>{
                const cellButton = document.createElement('button');
                
                cellButton.classList = 'cell';
                cellButton.id = cell;
                cellButton.textContent = cell;

                markedCell = cellButton.id == 'x' || cellButton.id == 'y'
                if(markedCell) cellButton.disabled=true;

                

                
                boardDiv.appendChild(cellButton);
            })
        })

        updateScoreDisplay();

    }

    function clickHandler(event){
        const selectedCell = event.target.id;
        if(!selectedCell) return;

        cellButton = document.getElementById(event.target.id)

        

        game.playRound(selectedCell);
        updateScreen();

    }

    boardDiv.addEventListener('click', clickHandler)



    const updateScoreDisplay = () =>{
        const playerOneScore = document.querySelector("#playerOne");
        const playerTwoScore = document.querySelector("#playerTwo");
        
        playerOneScore.value = 'Score: ' +  game.getPlayerScore('one');
        playerTwoScore.value = 'Score: ' +  game.getPlayerScore('two');
    }



    updateScreen();
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


