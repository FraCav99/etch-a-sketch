const gridContainer = document.querySelector('.grid-container');
const displaySize = document.getElementById('show-size');

const resetBtn = document.getElementById('reset');
const randomFillBtn = document.getElementById('random__fill');

const colorPicker = document.getElementById('color');

const sizeValueInput = document.getElementById('size');
let gridSize = +sizeValueInput.value;

displaySize.textContent = gridSize; // set initial value

gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, minmax(0px, 1fr))`;  // default size of grid columns

generateGrid(); // Set default size for grid

sizeValueInput.oninput = () => {
    regenerateGrid();
    gridSize = +sizeValueInput.value;
    displaySize.textContent = gridSize;

    // overwrite precedent style
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${gridSize}, minmax(0px, 1fr))`);
    generateGrid();
}

gridContainer.addEventListener('mouseover', e => {
    const target = e.target;

    target.matches(".grid-item") ? 
    target.style.backgroundColor = colorPicker.value : 
    null;
});

resetBtn.addEventListener('click', resetGrid);
randomFillBtn.addEventListener('click', setRandomColor);

function getRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function setRandomColor() {
    for (let gridItem of gridContainer.childNodes) {
        gridItem.style.backgroundColor = '#' + getRandomColor();
    }
}

function regenerateGrid() {
    let child = gridContainer.lastElementChild;
    while (child) {
        gridContainer.removeChild(child);
        child = gridContainer.lastElementChild;
    }
}

function resetGrid() {
    for (let gridItem of gridContainer.childNodes) {
        gridItem.style.backgroundColor = 'white'
    }
}

function generateGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridContainer.append(gridItem);
        }
    }
}