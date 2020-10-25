const gridContainer = document.querySelector('.grid-container');
const displaySize = document.getElementById('show-size');

const resetBtn = document.getElementById('reset');

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

resetBtn.addEventListener('click', resetGrid);

function applyColor(element) {
    element.addEventListener('mouseover', () => {
        element.classList.add('hover-effect');
    });
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
        if (gridItem.classList) {
            gridItem.classList.remove('hover-effect');
        }
    }
}

function generateGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            applyColor(gridItem);
            gridContainer.append(gridItem);
        }
    }
}