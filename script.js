let rowColNum = 16;
let drawMode = "black";
const gridHeight = 760;
const gridWidth = 760;

//UI Elements
const gridContainer = document.querySelector(".grid-container");
const changeSizeBtn = document.querySelector(".grid-change-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const blackBtn = document.querySelector("#black-btn");
const eraseBtn = document.querySelector("#eraser-btn");

//Listeners
changeSizeBtn.addEventListener("click", () => {
  const newSize = parseInt(
    prompt(
      "What new size do you want?Must be between 1-100. Other inputs will be changed automatically."
    )
  );
  if (newSize <= 1) {
    rowColNum = 1;
    makeGrid();
  } else if (newSize >= 100) {
    rowColNum = 100;
    makeGrid();
  } else {
    rowColNum = newSize;
    makeGrid();
  }
});

rainbowBtn.addEventListener("click", () => (drawMode = "rainbow"));
eraseBtn.addEventListener("click", () => (drawMode = "eraser"));
blackBtn.addEventListener("click", () => (drawMode = "black"));

//Functions
function makeGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < rowColNum ** 2; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.setAttribute("class", "grid-square");
    gridSquare.style.height = `${100 / rowColNum}%`;
    gridSquare.style.width = `${100 / rowColNum}%`;
    gridContainer.appendChild(gridSquare);
    gridSquare.addEventListener("mouseover", (e) => {
      changeColor(e.target);
    });
  }
}

function changeColor(square) {
  switch (drawMode) {
    case "black":
      square.style.backgroundColor = "black";
      break;
    case "rainbow":
      square.style.backgroundColor = randomColor();
      break;
    case "eraser":
      square.style.backgroundColor = "white";
      break;
    default:
      break;
  }
}

function randomColor() {
  return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
    Math.random() * 255
  )}, ${Math.round(Math.random() * 255)})`;
}

//Start on load
makeGrid(rowColNum);
