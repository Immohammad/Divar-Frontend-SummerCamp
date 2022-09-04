const N = 4;
const M = 4;

let turn = "R";
let selectedLines = [];

let red = 0; //red's score
let blue = 0; //blue's score

const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };

const playersTurnText = (turn) =>
  `It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
  line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

/////////Don't change
const createGameGrid = () => {
  const gameGridContainer = document.getElementsByClassName(
    "game-grid-container"
  )[0];

  const rows = Array(N)
    .fill(0)
    .map((_, i) => i);
  const cols = Array(M)
    .fill(0)
    .map((_, i) => i);

  rows.forEach((row) => {
    cols.forEach((col) => {
      const dot = document.createElement("div");
      dot.setAttribute("class", "dot");

      const hLine = document.createElement("div");
      hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
      hLine.setAttribute("id", `h-${row}-${col}`);
      hLine.addEventListener("click", handleLineClick);

      gameGridContainer.appendChild(dot);
      if (col < M - 1) gameGridContainer.appendChild(hLine);
    });

    if (row < N - 1) {
      cols.forEach((col) => {
        const vLine = document.createElement("div");
        vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
        vLine.setAttribute("id", `v-${row}-${col}`);
        vLine.addEventListener("click", handleLineClick);

        const box = document.createElement("div");
        box.setAttribute("class", "box");
        box.setAttribute("id", `box-${row}-${col}`);

        gameGridContainer.appendChild(vLine);
        if (col < M - 1) gameGridContainer.appendChild(box);
      });
    }
  });

  document.getElementById("game-status").innerHTML = playersTurnText(turn);
};
/////////Don't change

const changeTurn = () => {
  const nextTurn = turn === "R" ? "B" : "R";

  const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

  lines.forEach((l) => {
    //if line was not already selected, change it's hover color according to the next turn
    if (!isLineSelected(l)) {
      l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
    }
  });
  turn = nextTurn;
  //changing the text at the bottom of the page when turn changed
  document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

//Major changes have been made in this function
const handleLineClick = (e) => {
  const lineId = e.target.id;

  const selectedLine = document.getElementById(lineId);

  if (isLineSelected(selectedLine)) {
    //if line was already selected, return
    return;
  }

  selectedLines = [...selectedLines, lineId];

  colorLine(selectedLine);
  let hitter = turn; //save current person
  changeTurn();
  /////////////
  const idAsString = String(lineId); //store selected line's id as string for row and column extraction
  const row = +idAsString[2]; //line's row number
  const col = +idAsString[4]; //line's column number

  if (idAsString[0] == "v") {
    //checking border situations
    if (
      //checking if this square has conditions to being colored
      col == 0 &&
      isLineSelected(document.getElementById(`v-${row}-${col + 1}`)) &&
      isLineSelected(document.getElementById(`h-${row}-${col}`)) &&
      isLineSelected(document.getElementById(`h-${row + 1}-${col}`))
    ) {
      changeTurn();
      document
        .getElementById(`box-${row}-${col}`)
        .classList.add(bgClasses[turn]);
      increment();
    } else if (
      col == 3 &&
      isLineSelected(document.getElementById(`v-${row}-${col - 1}`)) &&
      isLineSelected(document.getElementById(`h-${row}-${col - 1}`)) &&
      isLineSelected(document.getElementById(`h-${row + 1}-${col - 1}`))
    ) {
      changeTurn();
      document
        .getElementById(`box-${row}-${col - 1}`)
        .classList.add(bgClasses[turn]);
      increment();
    } else {
      //if this line wasnt border
      if (
        isLineSelected(document.getElementById(`v-${row}-${col - 1}`)) &&
        isLineSelected(document.getElementById(`h-${row}-${col - 1}`)) &&
        isLineSelected(document.getElementById(`h-${row + 1}-${col - 1}`))
      ) {
        changeTurn();
        document
          .getElementById(`box-${row}-${col - 1}`)
          .classList.add(bgClasses[turn]);
        increment();
      }
      if (
        isLineSelected(document.getElementById(`v-${row}-${col + 1}`)) &&
        isLineSelected(document.getElementById(`h-${row}-${col}`)) &&
        isLineSelected(document.getElementById(`h-${row + 1}-${col}`))
      ) {
        if (hitter == turn) {
        } else {
          changeTurn();
        }
        document
          .getElementById(`box-${row}-${col}`)
          .classList.add(bgClasses[turn]);
        increment();
      }
    }
  } else if (idAsString[0] == "h") {
    //same steps as for vertical lines
    if (
      row == 0 &&
      isLineSelected(document.getElementById(`h-${row + 1}-${col}`)) &&
      isLineSelected(document.getElementById(`v-${row}-${col}`)) &&
      isLineSelected(document.getElementById(`v-${row}-${col + 1}`))
    ) {
      changeTurn();
      document
        .getElementById(`box-${row}-${col}`)
        .classList.add(bgClasses[turn]);
      increment();
    } else if (
      row == 3 &&
      isLineSelected(document.getElementById(`h-${row - 1}-${col}`)) &&
      isLineSelected(document.getElementById(`v-${row - 1}-${col}`)) &&
      isLineSelected(document.getElementById(`v-${row - 1}-${col + 1}`))
    ) {
      changeTurn();
      document
        .getElementById(`box-${row - 1}-${col}`)
        .classList.add(bgClasses[turn]);
      increment();
    } else {
      if (
        isLineSelected(document.getElementById(`h-${row - 1}-${col}`)) &&
        isLineSelected(document.getElementById(`v-${row - 1}-${col}`)) &&
        isLineSelected(document.getElementById(`v-${row - 1}-${col + 1}`))
      ) {
        changeTurn();
        document
          .getElementById(`box-${row - 1}-${col}`)
          .classList.add(bgClasses[turn]);
        increment();
      }
      if (
        isLineSelected(document.getElementById(`h-${row + 1}-${col}`)) &&
        isLineSelected(document.getElementById(`v-${row}-${col}`)) &&
        isLineSelected(document.getElementById(`v-${row}-${col + 1}`))
      ) {
        if (hitter == turn) {
        } else {
          changeTurn();
        }
        document
          .getElementById(`box-${row}-${col}`)
          .classList.add(bgClasses[turn]);
        increment();
      }
    }
  }
  /////////////
  //Checking if the game is over
  if (selectedLines.length == 24) {
    document.getElementById("game-status").innerHTML = `${
      red > blue ? "Red" : "Blue"
    } won`;
    return;
  }
};

//function for adding points
const increment = () => {
  if (turn == "R") red++;
  else blue++;
};

const colorLine = (selectedLine) => {
  selectedLine.classList.remove(hoverClasses[turn]);
  selectedLine.classList.add(bgClasses[turn]);
};

createGameGrid();
