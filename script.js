//Globals
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
const gridSizeText = document.querySelector(".grid-size-text");

//Listener for changing size of grid on button press
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
  gridSizeText.textContent = `${rowColNum} x ${rowColNum}`;
});

//Draw mode changing listeners
rainbowBtn.addEventListener("click", () => (drawMode = "rainbow"));
eraseBtn.addEventListener("click", () => (drawMode = "eraser"));
blackBtn.addEventListener("click", () => (drawMode = "black"));

//Creates fresh *x* grid based on current rowNumCol value for grid size
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

//Changes the color and opacity of a grid square based on draw mode
//Passed as a mouseover event callback on all grid squares
function changeColor(square) {
  let opacity = parseFloat(
    window.getComputedStyle(square).getPropertyValue("opacity")
  );
  opacity += 0.1;
  square.style.opacity = opacity;
  switch (drawMode) {
    case "black":
      square.style.backgroundColor = "black";
      break;
    case "rainbow":
      square.style.backgroundColor = randomColor();
      break;
    case "eraser":
      square.style.backgroundColor = "white";
      square.style.opacity = 0;
      break;
    default:
      break;
  }
}

//Returns a random color in css rgb format
function randomColor() {
  return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
    Math.random() * 255
  )}, ${Math.round(Math.random() * 255)})`;
}

//Makes grid on load
makeGrid(rowColNum);
