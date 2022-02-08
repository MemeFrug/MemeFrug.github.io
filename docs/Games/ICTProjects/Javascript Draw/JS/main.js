// main.js
console.log("Loaded");

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const colorpick = document.getElementById('color')
const rangepick = document.getElementById('range')

let newwidth = 0;
let newheight = 0;

let mousePos = {x: 0, y: 0};
const MouseSize = 5

canvas.addEventListener('mousemove', event => {
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    mousePos = {x: x, y: y};
});

function Resize() {
    newwidth = window.innerWidth;
	newheight = window.innerHeight;

	canvas.width = newwidth;
	canvas.height = newheight;
	ctx = canvas.getContext("2d");
}

let isClicking = false

canvas.addEventListener('mousedown', event =>
{
    isClicking = true
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;
});

canvas.addEventListener('mouseup', event =>
{
    isClicking = false
});

window.addEventListener("resize", Resize, false)

let lastMousePosition = {x: 0, y: 0}

function Draw() {
    if (!isClicking) {
        // ctx.fillRect(mousePos.x - MouseSize/2, mousePos.y - MouseSize/2, MouseSize, MouseSize);
        // ctx.clearRect(0, 0, newwidth, newheight)
    }else {
        ctx.strokeStyle = colorpick.value
        
        ctx.lineWidth = rangepick.value;
        ctx.moveTo(lastMousePosition.x, lastMousePosition.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
    }


    lastMousePosition = mousePos
    requestAnimationFrame(Draw)
}

Resize()
Draw()