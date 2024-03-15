const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];

const boardElement = document.querySelector("#board");
const resultElement = document.querySelector("#result");
const rematchBtn = document.querySelector("#restart");

/*Initial function to start the game */
const startGame = function () {
  /*Giving reset button disabled status so that user can't click it multiple times and crash the game */
  rematchBtn.classList.add("disabled");

  setTimeout(() => {
    /*Remove disabled status */
    rematchBtn.classList.remove("disabled");
  }, 2000);

  /*Declare needed variables */
  let activePlayer = "X";
  let squares;

  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  /*Function centered around displaying the board to the user */
  const displayBoard = function () {
    boardElement.innerHTML += `${board
      .map((row, rowIndex) =>
        row
          .map(
            (_, colIndex) =>
              `<div class="square" data-row=${rowIndex} data-column=${colIndex}></div>`
          )
          .join("")
      )
      .join("")}`;

    squares = document.querySelectorAll(".square");
  };

  /*Function centered around checking who won and if there was a draw */
  const checkResult = function (board) {
    let winner;

    WINNING_COMBINATIONS.forEach((el, i) => {
      const firstSquare = board[el[0].row][el[0].column];
      const secondSquare = board[el[1].row][el[1].column];
      const thirdSquare = board[el[2].row][el[2].column];

      if (
        firstSquare &&
        firstSquare === secondSquare &&
        firstSquare === thirdSquare
      ) {
        winner = activePlayer;

        squares.forEach((el) => el.classList.add("disabled"));

        document.querySelector("#result").innerHTML = `<p>${winner} won!</p>`;
        document.querySelector("#result").classList.add("results-showing");
      } else if (movesPlayed === 9 && !winner) displayDraw();

      return winner;
    });
  };

  /*Function used for switching player and symbol*/
  const switchPlayer = function () {
    activePlayer = activePlayer === "X" ? "O" : "X";
  };

  /*Function centered around creating draw HTML */
  const displayDraw = function () {
    document.querySelector("#result").innerHTML = `<p>Draw</p>`;
    document.querySelector("#result").classList.add("results-showing");
  };

  /*Function centered around giving Rematch button an even handler to reset the game */
  const restartGame = function () {
    squares.forEach((el) => el.classList.remove("disabled"));

    document.querySelector("#result").innerHTML = ``;
    document.querySelector("#result").classList.remove("results-showing");

    boardElement.innerHTML = "";

    displayBoard();
    startGame();
  };

  /*Displaying page before giving the squares their event listeners */
  displayBoard();

  /*Adding a move counter */
  let movesPlayed = 0;
  /*Giving squares event listeneres and reading where the user clicks and when */
  squares.forEach((el) =>
    el.addEventListener("click", function () {
      if (activePlayer === "X") {
        this.innerHTML = "X";
        this.classList.add("disabled");

        board[this.dataset.row][this.dataset.column] = "X";

        movesPlayed++;
        checkResult(board);
        switchPlayer();
      } else {
        this.innerHTML = "O";
        this.classList.add("disabled");
        board[this.dataset.row][this.dataset.column] = "O";

        movesPlayed++;
        checkResult(board);
        switchPlayer();
      }
    })
  );

  /*Giving rematch button event listnr to restart the game */
  rematchBtn.addEventListener("click", restartGame);
};
startGame();
