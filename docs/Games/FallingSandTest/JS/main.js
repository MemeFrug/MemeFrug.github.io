console.log("yes");

//Get Context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//World
const cols = 200
const rows = 200
const Points = []

//Get Mouse Position
let mousePos = { x: 0, y: 0 };
let mouseHighlight = {i:0, j: 0}

canvas.addEventListener('mousemove', event => {
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    mousePos = { x: x, y: y };

    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {  
            var cellx = i * 5
            var celly = j * 5
            const cellsize = 5
    
            if (mousePos.x <= cellx+cellsize && mousePos.x >= cellx && mousePos.y >= celly && mousePos.y <= celly + cellsize){
                mouseHighlight = {i:i, j:j}
            }
        }
    }
});

let Drawing = false

function Draw() {
    
    Points[mouseHighlight.i][mouseHighlight.j].Occupied = elements.sand
    Points[mouseHighlight.i][mouseHighlight.j +1].Occupied = elements.sand
}

canvas.addEventListener('mousedown', event => {
    Drawing = true
})

canvas.addEventListener('mouseup', event => {
    Drawing = false
})

//Where We Update and Draw
let lastTime = 0;
function _Update(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Drawing) Draw()

    //Draw Cells
    let Change = []

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var x = i * 5
            var y = j * 5
            Points[i][j].UpdateCell()

            //Draw Mouse Pos
            if (i == mouseHighlight.i && j == mouseHighlight.j){
                ctx.fillRect(x, y, 5, 5);
            }

            if (Points[i][j].Occupied.id == 0) continue;

            //Check Below
            // console.log(Points[i][j]);
            if (!Points[i][j+1]){} 
            else if (Points[i][j + 1].Occupied.id == elements.void.id) {
                Change.push(() => {
                    let CurrentOccupied = Points[i][j].Occupied
                    let CurrentOccupied2 = Points[i][j + 1].Occupied

                    Points[i][j].Occupied = CurrentOccupied2
                    Points[i][j + 1].Occupied = CurrentOccupied
                })
            } 
            else if (!Points[i-1]){}
            else if (Points[i - 1][j + 1].Occupied.id == elements.void.id) {
                Change.push(() => {
                    let CurrentOccupied = Points[i][j].Occupied
                    let CurrentOccupied2 = Points[i - 1][j + 1].Occupied

                    Points[i][j].Occupied = CurrentOccupied2
                    Points[i - 1][j + 1].Occupied = CurrentOccupied
                })
            } 
            else if (!Points[i+1]) {}
            else if (Points[i + 1][j + 1].Occupied.id == elements.void.id) {
                Change.push(() => {
                    let CurrentOccupied = Points[i][j].Occupied
                    let CurrentOccupied2 = Points[i + 1][j + 1].Occupied

                    Points[i][j].Occupied = CurrentOccupied2
                    Points[i + 1][j + 1].Occupied = CurrentOccupied
                })
            }

            ctx.fillStyle = Points[i][j].c
            ctx.fillRect(x, y, 5, 5)
        }
    }

    //Do changes
    Change.forEach(element => {
        element()
    });

    requestAnimationFrame(_Update)
}

function _Init() {
    for (let i = 0; i < cols; i++) {
        Points[i] = [];
        for (let j = 0; j < rows; j++) {
            Points[i][j] = new Cell(elements.void)
        }
    }

    _Update()
}

//debug
function CreateSand() {
    Points[10][1].Occupied = elements.sand
}

// Start Game
_Init()