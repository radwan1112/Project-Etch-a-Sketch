const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;
const DEFAULT_Bg_COLOR = "#fefefe";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentBgColor = DEFAULT_Bg_COLOR;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentBgColor(newBgColor) {
  currentBgColor = newBgColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const colorPicker = document.getElementById("colorPicker");
const groundPicker = document.getElementById("groundColor");
const colorBtn = document.getElementById("colorBtn");
const board = document.getElementById("board");
const gridRange = document.getElementById("gridRange");
const rainbow = document.getElementById("rainbow");
const eraser = document.getElementById("eraser");
const toggleGrid = document.getElementById("toggle_grid");
const clear = document.getElementById("clear");


function setUpGrid(D_SIZE) {
  generateGrid(D_SIZE);
}

function generateGrid(size) {
  while (board.firstChild) {
    board.firstChild.remove();
  }
  board.style.setProperty("grid-template-columns", "repeat(" + size + ", 1fr)");
  board.style.setProperty("grid-template-rows", "repeat(" + size + ", 1fr)");

  document.getElementById("grid_size").innerText = size + " x " + size;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.className = "block-style";
    div.addEventListener("mouseover", customize);
    board.appendChild(div);
  }
}

gridRange.addEventListener("change", function sliderRange() {

  

  let defaultVal = gridRange.defaultValue;
  let currentVal = gridRange.value;

  setCurrentSize(currentVal);
  generateGrid(currentSize);

});

colorPicker.addEventListener("change", () => {
  setCurrentColor(colorPicker.value);
  setCurrentMode("color");
  colorBtn.classList.add("active");
  rainbow.classList.remove("active");

});

colorBtn.addEventListener("click", () =>{
  setCurrentColor(colorPicker.value);
  setCurrentMode("color");
  colorBtn.classList.toggle("active");
  rainbow.classList.remove("active");
});


rainbow.addEventListener("click", () => {

  if(currentMode === 'rainbow') {
    setCurrentColor(colorPicker.value);
    setCurrentMode("color");
    rainbow.classList.remove("active");
  }      
  else {
    setCurrentMode("rainbow");
    rainbow.classList.add("active");
  }    
});

eraser.addEventListener("click", () =>{

  if(currentMode === "eraser") {
    setCurrentMode("color");
    eraser.classList.remove("active");
  }

  else {
    setCurrentMode("eraser");
    eraser.classList.add("active");
  } 
});


groundPicker.addEventListener("change", () => {
  setCurrentBgColor(groundPicker.value);
});

clear.addEventListener("click", () => {
  generateGrid(currentSize);
});




function customize(e) {

  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = currentBgColor;
  } else if (currentMode === "shading") {
    e.target.style.backgroundColor = currentBgColor;
  }
  else if(currentMode === 'lighting'){
    e.target.style.backgroundColor = currentBgColor;
  }
  
}


window.onload = () => {
  setUpGrid(DEFAULT_SIZE);
};
