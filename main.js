const boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");
const instructions = document.querySelector(".instructions");
const reset = document.querySelector(".reset");
const winningArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let icon = "X";

const toggle = () => {
  if (icon === "X") icon = "O";
  else icon = "X";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerHTML) {
      box.innerHTML = `<h1>${icon}</h1>`;
      toggle();
      checkForWinner();
    }
  });
});

const checkForWinner = () => {
  let xArray = [];
  let oArray = [];

  boxes.forEach((box) => {
    if (box.textContent) {
      if (box.textContent === "X") xArray.push(parseInt(box.id));
    }
    if (box.textContent === "O") oArray.push(parseInt(box.id));
  });

  if (xArray.length >= 3 && compareWinningArrays(xArray)) {
    return declareWinner("Crosses");
  } else if (oArray.length >= 3 && compareWinningArrays(oArray)) {
    return declareWinner("Noughts");
  } else if (xArray.length + oArray.length === 9) {
    return (message.innerHTML = `<h2>You both are losers</h2>`);
  }
};

let winCode = null;
const compareWinningArrays = (playerArray) => {
  for (const combo of winningArrays) {
    let outcome = true;
    for (const num of combo) {
      if (!playerArray.includes(num)) {
        outcome = false;
        break;
      }
    }
    if (outcome) {
      winCode = combo;
      return true;
    }
  }
  return false;
};

const declareWinner = (win) => {
  message.innerHTML = `<h2>${win} wins!</h2>`;
  instructions.innerHTML = "Well done!";
  // highlight
};

const resetBoard = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
  });
  icon = "X";
  message.innerHTML = "<h2>Crosses start</h2>";
  instructions.innerHTML = "<p>Click in a box to play</p>";
  winCode = null;
};

reset.addEventListener("click", resetBoard);
