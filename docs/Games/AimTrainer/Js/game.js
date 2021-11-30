const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Game Variables
const SpotMaxSize = 100;
const SpotMinSize = 60;
const MouseSize = 10
const SpeedofNewSpot = 500 //Milliseconds

//functions
function Spots() {
    this.spots = [];
    this.addSpot = function() {
        const size = Math.floor(Math.random() * (SpotMaxSize - SpotMinSize + 1)) + SpotMinSize;

        const x = Math.floor(Math.random() * (canvas.width - size));
        const y = Math.floor(Math.random() * (canvas.height - size));
        
        this.spots.push(new SpotCreator(x, y, size, size));
    };
    this.removeSpot = function(spotI) {
        this.spots.splice(spotI, 1);
    };
    this.checkIfClickedSpot = function(x, y) {
        for (let i = 0; i < this.spots.length; i++) {
            if (x > this.spots[i].x && x < this.spots[i].x + this.spots[i].w && y > this.spots[i].y && y < this.spots[i].y + this.spots[i].h) {
                this.removeSpot(i);

                //Returns for future functionality if needed
                return true;
            }
        }
        return false;
    }
}
const SpotsClass = new Spots();

//events
canvas.addEventListener('mousedown', event =>
{
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    SpotsClass.checkIfClickedSpot(x, y);
});

let mousePos = {x: 0, y: 0};

canvas.addEventListener('mousemove', event => {
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    mousePos = {x: x, y: y};
});

function Draw() {
    // Initialize the game
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < SpotsClass.spots.length; i++) {
        const spot = SpotsClass.spots[i];
        ctx.fillRect(spot.x, spot.y, spot.w, spot.h);
    }

    //Draw the mouse (but if it gets too performance heavy remove this)
    ctx.fillRect(mousePos.x - MouseSize/2, mousePos.y - MouseSize/2, MouseSize, MouseSize);

    requestAnimationFrame(Draw);
}

//Add a button to start the game
SpotsClass.addSpot();

setInterval(() => {
    SpotsClass.addSpot();
}, SpeedofNewSpot);

Draw();
