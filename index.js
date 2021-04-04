let playerO = 'O';
let playerX = 'X';
let initialPlayer = playerX;
let currentPlayer = initialPlayer;
let boxes = Array.from(document.getElementsByClassName('game-cell'));

/*create messages to display at points in the game; put in boostrap banner*/
let winnerMessage = (player) => `<h3>${player} has won!</h3>`;
let catMessage = () => `<h3>Cat's game! Restart game.</h3>`;
let currentTurn = (player) => `<h4>It is ${player}'s turn.</h4>`;

//change the html in the heading with class game banner to reflect player  turn
let gameBanner = $("#game-banner");
gameBanner.html(currentTurn(currentPlayer));

//alternate player turn based on current player
function playerSwitchTurn() {
  currentPlayer = currentPlayer === playerO ? playerX : playerO;
  gameBanner.html(currentTurn(currentPlayer));
}

/*loop through the box "states". If the box contains text that matches player text, return true
that they have won.
*/
function checkWinState(player) {
  let boxStates = boxes.map(box => box.innerText)
  let row0Win = (boxStates[0] === player && boxStates[1] === player && boxStates[2] === player)
  let row1Win = (boxStates[3] === player && boxStates[4] === player && boxStates[5] === player)
  let row2Win = (boxStates[6] === player && boxStates[7] === player && boxStates[8] === player)
  let col0Win = (boxStates[0] === player && boxStates[3] === player && boxStates[6] === player)
  let col1Win = (boxStates[1] === player && boxStates[4] === player && boxStates[7] === player)
  let col2Win = (boxStates[2] === player && boxStates[5] === player && boxStates[8] === player)
  let diag0Win = (boxStates[0] === player && boxStates[4] === player && boxStates[8] === player)
  let diag1Win = (boxStates[2] === player && boxStates[4] === player && boxStates[6] === player)
  return (
    row0Win || row1Win || row2Win ||
    col0Win || col1Win || col2Win ||
    diag0Win || diag1Win
  )
}

/*loop through box states (map returns array) 
check if all spaces in the board have text; return true if text in every box is not
an empty string (I had a lot of help with this function)*/
function checkBoardFullState() {
  let boxStates = boxes.map(box => box.innerText)
  let boardIsFull = boxStates.every(t => t !== "")
  return boardIsFull;
}

/*When there is a new click in a box, check if current player has won; if yes, display
current Player as winner message. Else if the board is full, it is a cat's game; if spaces
still available switch turn and continue play */
function clickInEmptyBox(box) {
  box.innerText = currentPlayer;
  if (checkWinState(currentPlayer) === true) {
    gameBanner.html(winnerMessage(currentPlayer));
  } else if (checkBoardFullState() === true) {
    gameBanner.html(catMessage());
  } else {
    playerSwitchTurn();
  }
}


/*adds event listener to box*/
boxes.map(box => box.addEventListener("click", () => {
  if (box.innerText === "") {
    clickInEmptyBox(box);
  }
}))

/*blank slate game state; loop through all boxes and change text to empty string;
update game message to the current turn of first player */
function initializeGame() {
  boxes.map(box => box.innerText = "");
  currentPlayer = initialPlayer;
  gameBanner.html(currentTurn(currentPlayer));
}

/* add event listener to restart button and reset to initial game state */
let restartButton = $("#restart-btn");
restartButton.on("click", initializeGame);