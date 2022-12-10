const cells = document.querySelectorAll(".cellBox");
const gameStatus = document.querySelector("#statusofGame");
const restartBtn = document.querySelector("#resetBtn");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", clickedCell));
  // cells.forEach(function (cells)
  // { cells.addEventListener("click", clickedCell)}
  // );
  restartBtn.addEventListener("click", restartGame);
  gameStatus.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function clickedCell() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cells, index) {
  options[index] = currentPlayer;
  cells.textContent = currentPlayer;
}

function changeplayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  gameStatus.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameStatus.textContent = `${currentPlayer}'s wins`;
    running = false;
  } else if (!options.includes("")) {
    gameStatus.textContent = "Draw!";
    running = false;
  } else {
    changeplayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
