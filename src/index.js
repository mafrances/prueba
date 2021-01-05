import './styles/index.css';
import { createBoard, isBoardFull, isBoardColumnFull, hasFourInline } from './helpers';

// Init templates
const startTemplate = 
    `<div class="component">
        <div class="form-div"><span class="title">Start New Game</span></div>
        <div class="form-div"><span class="text">Player One:</span><input class="player-one"></div>
        <div class="form-div"><span class="text">Player Two:</span><input class="player-two"></div>
        <div class="form-div"><span class="text">Column Number:</span><input placeholder="Between 5 and 15" class="column-number"></div>
        <div class="form-div"><button class="start-game">Start</button></div>
    </div>`
;

const gameTemplate = 
    `<div class="component">
        <span class="title"></span>
        <div class="board"></div>
    </div>`
;

const finishButtonsTemplate = 
    `<div class="button-container">
        <button class="return-start">Return to start</div>
        <button class="play-again">Play again</div>
    </div>`
;

const root = document.getElementById('root');

// Init game options
let playerOne;
let playerTwo;
let columnNumber;
let board;
let currentTurn = 1;

printInitialComponent();

// Prints initial Form and bind start game button
function printInitialComponent() {
    root.innerHTML = startTemplate;
    root.getElementsByClassName('start-game')[0].addEventListener("click", getInitialValues);
}

// Get's game options
function getInitialValues() {
    let incorrectOptions = 0;
    playerOne = root.getElementsByClassName('player-one')[0].value;
    if (playerOne === "") {
        incorrectOptions++;
        showInputError('player-one');
    } else {
        hideInputError('player-one');
    }
    playerTwo = root.getElementsByClassName('player-two')[0].value;
    if (playerTwo === "") {
        incorrectOptions++;
        showInputError('player-two');
    } else {
        hideInputError('player-two');
    }
    // Checks if it's a number and it's between 5 and 15
    columnNumber = root.getElementsByClassName('column-number')[0].value;
    if (!(!isNaN(columnNumber) && (parseInt(columnNumber) >= 5 && parseInt(columnNumber) <= 15))) {
        incorrectOptions++;
        showInputError('column-number');
    } else {
        hideInputError('column-number');
    }

    if (incorrectOptions === 0) {
        root.getElementsByClassName('start-game')[0].removeEventListener("click", getInitialValues);
        printGameComponent();
    }
}

function showInputError (className) {
    root.getElementsByClassName(className)[0].classList.add("error");
}

function hideInputError (className) {
    root.getElementsByClassName(className)[0].classList.remove("error");
}

// Prints and inits the game
function printGameComponent() {
    // Parsed needed because the arrays where reference objects
    board = JSON.parse(JSON.stringify(createBoard(parseInt(columnNumber, 10))));

    // Print game without board template
    root.innerHTML = gameTemplate;

    // Set player's turn title
    root.getElementsByClassName('title')[0].textContent = "It's " + playerOne + "'s turn";

    // Print fix part of the board
    let boardComponent = '<table>';
    boardComponent += '<thead>';
    for (let k = 0; k < board[0].length; k++) {
        boardComponent += '<td><button class="add-token" game-column="' + k + '">Add</button></td>';
    }
    boardComponent += '</thead><tbody>';
    boardComponent += printBoard(board);
    boardComponent += '</tbody></table>';

    // Print board
    root.getElementsByClassName('board')[0].innerHTML = boardComponent;

    // Set add token events
    document.querySelectorAll('.add-token').forEach(item => {
        item.addEventListener('click', function(ev){
            // Add token and print variable board
            let currentColumn = parseInt(ev.currentTarget.getAttribute("game-column"));
            addToken(currentColumn);
            let printedBoard = printBoard();
            root.getElementsByTagName('tbody')[0].innerHTML = printedBoard;
        });
    });
}

// Add's token to board objects and check's if the game is over
function addToken(gameColumn) {
    // Ignore's turn if the column is full
    if (!isBoardColumnFull(board)){
        //Get's current and next turn player names
        let currentPlayer = currentTurn % 2 ? playerOne : playerTwo;
        let nextPlayer = currentTurn % 2 ? playerTwo : playerOne;
        //Get's current player token ("ficha" que no se cual es la traducción exacta)
        let currentPlayerToken = currentTurn % 2 ? "o" : "x";

        // Set's token in the board object
        for (let j = board.length - 1; j >= 0; j--) {
            if (!board[j][gameColumn]) {
                board[j][gameColumn] = currentPlayerToken;
                break;
            }
        }

        currentTurn++;
        // Set's next turn player name
        root.getElementsByClassName('title')[0].textContent = "It's " + nextPlayer + "'s turn";
        // Check's first if there is a winner
        if (hasFourInline(board)) {
            root.getElementsByClassName('title')[0].textContent = "You won " + currentPlayer;
            onGameOver();
        }
        // And then if there game is tied
        if (isBoardFull(board)){
            root.getElementsByClassName('title')[0].textContent = "Tie";
            onGameOver();
        }
    }
}

function onGameOver () {
    currentTurn = 1;

    // Inserting this way the buttons has the side effect of removing the button listeners which is desirable
    root.getElementsByClassName('component')[0].innerHTML += finishButtonsTemplate;

    //Bind's play again and return to start events
    root.getElementsByClassName('return-start')[0].addEventListener("click", printInitialComponent);
    root.getElementsByClassName('play-again')[0].addEventListener("click", printGameComponent);
}

// Prints variable part of the board
function printBoard() {
    let boardComponent = "";
    // loop rows
    for (let i = 0; i < board.length; i++) {
        boardComponent += '<tr game-column="' + i + '">';
        // loop's cols
        for (let j = 0; j < board[i].length; j++) {
            // Check's if there is a token
            var token = board[i][j] ? board[i][j] : "";
            boardComponent += '<td>' + token +'</td>';
        }
        boardComponent += '</tr>';
    }
    return boardComponent;
}
