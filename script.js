let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;

// Initialize game board
for (let i = 1; i <= 9; i++) {
    gameBoard.push(document.getElementById(`cell-${i}`));
}

// Add event listeners to cells
gameBoard.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnInfo();
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a].textContent === gameBoard[b].textContent && gameBoard[b].textContent === gameBoard[c].textContent && gameBoard[a].textContent !== '') {
            declareWinner(gameBoard[a].textContent);
            return;
        }
    }

    if (gameBoard.every(cell => cell.textContent !== '')) {
        declareDraw();
    }
}

function updateTurnInfo() {
    document.getElementById('turn-info').textContent = `Player ${currentPlayer}'s turn`;
}

function declareWinner(winner) {
    gameOver = true;
    document.getElementById('game-outcome').textContent = `Player ${winner} wins!`;
}

function declareDraw() {
    gameOver = true;
    document.getElementById('game-outcome').textContent = `It's a draw!`;
}