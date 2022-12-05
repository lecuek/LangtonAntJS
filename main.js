const GRID_DIV = document.getElementById("grid");
// const WIDTH = parseInt(prompt("Width? :"))
// const HEIGHT = parseInt(prompt("Height? :"))
const WIDTH = 50;
const HEIGHT = 50;
const CELL_HEIGHT = 50;
const CELL_WIDTH = 50;
const CELL_UNIT = "px";

const COLORS = {
    white: "#FFFFFF",
    blue: "#FF"
}

class Cell {
    constructor(){
        this.color = COLORS.white;
        this.height = CELL_HEIGHT;
        this.width = CELL_WIDTH;
    }
}

//initialize grid
let grid = [[], []];
for (let i = 0; i < HEIGHT; i++) {
    let row = document.createElement("div");
    grid.push([])
    
    for (let j = 0; j < WIDTH; j++) {
        grid[i].push(new Cell())
        cell = document.cre
        row.appendChild();
        
    }
    GRID_DIV.appendChild(row);
}


function step() {

}

function display() {

}