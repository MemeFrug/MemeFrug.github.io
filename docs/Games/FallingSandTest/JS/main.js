//Get Context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//World
const World = []
const WorldWidth = 10
const WorldHeight = 10

const WidthCell = 10
const HeightCell = 10

for (let i = 0; i < WorldHeight; i++) {
    const Column = []
    for (let ii = 0; ii < WorldWidth; ii++) {
        Column.push(new Cell(WidthCell, HeightCell))
    }
    World.push(Column)
}


//Get Mouse Position
let mousePos = {x: 0, y: 0};
canvas.addEventListener('mousemove', event => {
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    mousePos = {x: x, y: y};
});

//Where We Update and Draw
let lastTime = 0;
function _Update(timeStamp) {
    let deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < World.length; i++) {
        const element = World[i];

        let Lastpos = 0
        for (let ii = 0; ii < element.length; ii++) {
            const element2 = element[ii];
            ctx.strokeRect(ii, i, element2.w, element2.h)
        }
    }

    //Draw the mouse (but if it gets too performance heavy remove this)
    const MouseSize = 10
    ctx.fillRect(mousePos.x - MouseSize/2, mousePos.y - MouseSize/2, MouseSize, MouseSize);

    requestAnimationFrame(_Update)
}

function _Init() {
    _Update()
}

// Start Game
_Init()