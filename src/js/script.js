const PlayerFactory = (symbol) => {
    return {
        symbol,
    }
};

/**
 * Board Module
 */

const Gameboard = (() => {
    let gameboard = new Array(9).fill(null);
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return {
        gameboard,
        winningCombinations
    }
})();

const playGame = (() => {
    let player1 = PlayerFactory("X");
    let player2 = PlayerFactory("O");
    let playerTurn = player1.symbol;

    const winningPlayer = () => {
        /**
         * iterattion of objects.
         */
        for (const conditions of Gameboard.winningCombinations) {
            /**
             * destructuring array
             */
            let [a, b, c] = conditions;

            if (Gameboard.gameboard[a] && (Gameboard.gameboard[a] == Gameboard.gameboard[b] && Gameboard.gameboard[a] == Gameboard.gameboard[c])) {
                displayController.cells.forEach(cell => {
                    cell.removeEventListener("click", clickedCell);
                });
                return ([a, b, c]);
            }
        } return false;
    }

    const clickedCell = (e) => {
        const cellIndex = e.target.id;
        //check if array does not contain this id.
        if (!Gameboard.gameboard[cellIndex]) {
            Gameboard.gameboard[cellIndex] = playerTurn;
            e.target.innerText = playerTurn;

            if (winningPlayer() !== false) {
                displayController.message.innerHTML = `${playerTurn} Won!`;
                let winningCombo = winningPlayer();
                winningCombo.map((cell) => {
                    displayController.cells[cell].style.backgroundColor = "Red";

                });

            }
            playerTurn = playerTurn == player1.symbol ? player2.symbol : player1.symbol;
        }

    };

    return {
        clickedCell,
        player1,
        player2,
        playerTurn
    }
})();

const displayController = (() => {
    let cells = Array.from(document.getElementsByClassName("cell"));
    let message = document.querySelector('[data-winning-message]');
    let restart = document.getElementById("restartButton");

    cells.forEach(cell => {
        cell.addEventListener("click", playGame.clickedCell);
    });
    restart.addEventListener("click", () => {
        message.innerHTML = "Tic Tac Toe";
        playGame.playerTurn = playGame.playerTurn == playGame.player2.symbol ? playGame.player1.symbol : playGame.player2.symbol;
        Gameboard.gameboard.fill(null);
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.style.backgroundColor = "";
            cell.addEventListener("click", playGame.clickedCell);
        });
    });

    return {
        cells,
        message
    }
})();
