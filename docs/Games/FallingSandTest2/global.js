//Get Context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//World
const cols = 200
const rows = 200
const cellsize = 5
const Points = []

//Get Mouse Position
let mousePos = { x: 0, y: 0 };
let mouseHighlight = { i: 0, j: 0 }

let Drawing = false

canvas.addEventListener('mousemove', event => {
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    mousePos = { x: x, y: y };

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var cellx = i * cellsize
            var celly = j * cellsize

            if (mousePos.x <= cellx + cellsize && mousePos.x >= cellx && mousePos.y >= celly && mousePos.y <= celly + cellsize) {
                mouseHighlight = { i: i, j: j }
            }
        }
    }
});

function PlaceElements() {
    Points[mouseHighlight.i][mouseHighlight.j] = new Sand(mouseHighlight.i, mouseHighlight.j)
}

canvas.addEventListener('mousedown', event => {
    Drawing = true
})

canvas.addEventListener('mouseup', event => {
    Drawing = false
})

//Global Functions
function dieAndReplace(params, element) {
    Points[params.i, params.j] = new element(params.i, params.j)
}