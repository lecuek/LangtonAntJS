const GRID_DIV = document.getElementById("grid");
const COUNTER = document.getElementById("counter");
// const WIDTH = parseInt(prompt("Width? :"))
// const HEIGHT = parseInt(prompt("Height? :"))
const WIDTH = 550;
const HEIGHT = 550;
const CELL_HEIGHT = 2;
const CELL_WIDTH = 2;
const CELL_UNIT = "px";
let globalGrid = [[], []];
let totalSteps = 0;

const COLORS = [
    "#FFFFFF",
    "#000000",
    "#111155",
    "#AA1155"
]
const COLORSMAP = {
    "#FFFFFF" : 0,
    "#000000" : 1,
    "#111155" : 2,
    "#AA1155" : 3

}
class Cell {
    constructor(element){
        this.color = COLORS[0];
        this.height = CELL_HEIGHT;
        this.width = CELL_WIDTH;
        this.element = element;
    }
    nextColor(){
        this.color = COLORS[modulo((COLORSMAP[this.color]+1),COLORS.length)];
        this.element.style.backgroundColor = this.color;
        this.element.classList.add("cellActive");
    }
    
}
const DIRECTION = [
    0,
    1,
    2,
    3
]
const DIRECTIONMAP = {
    0 : "up",
    1 : "right",
    2 : "down",
    3 : "left"
}
let Ant = {
    position : {
        x : 0,
        y : 0
    },
    direction : DIRECTION[0],
    turnRight(){
        this.direction = modulo(this.direction+1,4);
        return this.direction;
    },
    turnLeft(){
        this.direction = modulo(this.direction-1,4);
        return this.direction;
    }
}
function modulo(a,n){
    return ((a % n ) + n ) % n
}
function initGrid(){
    
    //initializes grid
    for (let i = 0; i < HEIGHT; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        globalGrid.push([])
        
        for (let j = 0; j < WIDTH; j++) {
            let cell = document.createElement("span");
            // cell.style.height = `${CELL_HEIGHT}${CELL_UNIT}`;
            // cell.style.width = `${CELL_WIDTH}${CELL_UNIT}`;
            cell.classList.add("cell");
            row.appendChild(cell);
            globalGrid[i].push(new Cell(cell));
            
        }
        GRID_DIV.appendChild(row);
    }
}


function rule(cell, ant){
    if (COLORSMAP[cell.color]%2 == 0){
        ant.turnLeft();
    }
    else{
        ant.turnRight();
    }
}


function moveAnt(){
    let x = Ant.position.x;
    let y =  Ant.position.y;

    //Vertical
    if (Ant.direction%2 == 0){
        //Up
        if (Ant.direction == 0)
            Ant.position.y = modulo(y+1, HEIGHT);
        //Down
        else
            Ant.position.y = modulo(y-1, HEIGHT);
    }    
    //Horizontal
    else{
        //Right
        if (Ant.direction == 1)
            Ant.position.x = modulo(x+1, WIDTH);
        //Left
        else
            Ant.position.x = modulo(x-1, WIDTH);
    }
}

function step(times = 1) {

    let x = Ant.position.x
    let y = Ant.position.y;

    let cell = globalGrid[x][y]

    rule(cell, Ant);
    
    moveAnt();
    cell.nextColor();
    
    times -= 1;
    totalSteps +=1;
    if(times > 0)
        step(times);
    
    
}
function repeatSteps(){
    step();
    setTimeout(repeatSteps, 0);
}

function updateCounter(){
    COUNTER.innerHTML = "Step: " + totalSteps;
    window.setTimeout(updateCounter, 1000);
}

function main(speed = 1){
    Ant.position.x = Math.floor(WIDTH/2);
    Ant.position.y = Math.floor(HEIGHT/2);
    GRID_DIV.innerHTML = "";
    initGrid();
    for (let i = 0; i < speed; i++) {
        repeatSteps();
    }
    updateCounter();

}