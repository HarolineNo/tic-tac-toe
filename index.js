const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restart");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["","","","","","","","",""];
let currPlayer = "X";
let running = false;

function intializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restart.addEventListener("click", reset);
    statusText.textContent = `${currPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellindex = this.getAttribute("cellindex");

    if (options[cellindex] != "" || !running) {
        return;
    }
    updateCell(this, cellindex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currPlayer;
    cell.textContent = currPlayer;
}

function changePlayer() {
    currPlayer = (currPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currPlayer}'s turn`; 
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currPlayer} wins!`;
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    }
    else {
        changePlayer();
    }
}

function reset() {
    currPlayer = "X"
    options = ["","","","","","","","",""];
    statusText.textContent = `${currPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

intializeGame();