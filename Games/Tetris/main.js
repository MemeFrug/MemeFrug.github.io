console.log("main.js Loaded");

class Piece {
    constructor(coordinates = [0,0]) {
        this.linkedParts = []
        this.c = "blue"
        this.coordinates = coordinates
    }
    moveUp() {
        this.linkedParts.forEach(part => {
            part.coordinates[1] -= 1
        });
        this.coordinates[1] -= 1
    }

    moveDown() {
        this.linkedParts.forEach(part => {
            part.coordinates[1] += 1
        });
        this.coordinates[1] += 1
    }

    draw(ctx) {
        ctx.fillStyle = this.c
        ctx.fillRect(this.coordinates[0]*Game.settings.cubeSize,this.coordinates[1]*Game.settings.cubeSize,Game.settings.cubeSize,Game.settings.cubeSize)
    }
}

const Game = {
    world: [],
    canvas: document.getElementById("canvas"),
    context: document.getElementById("canvas").getContext("2d"),
    timers: [],
    selectedPiece: undefined,
    settings: {
        width: 10, // Cube Pixels
        height: 20,
        cubeSize: 50 // pixels
    },
    resizeCanvas: () => {
        console.log("Resizing Canvas");
        Game.canvas.width = Game.settings.width*Game.settings.cubeSize
        Game.canvas.height = Game.settings.height*Game.settings.cubeSize

        Game.canvas.style.height = "80%"
    },
    spawnNewPiece: (type = "lType") => {
        let pieces = []
        switch (type) {
            case "lType":
                pieces.push(new Piece([6,0]))
                pieces.push(new Piece([5,0]))
                pieces.push(new Piece([4,0]))
                pieces.push(new Piece([4,1]))
                Game.selectedPiece = pieces[2]
                break;

            default:
                break;
        }

        for (let i = 0; i < pieces.length; i++) {
            const initialPiece = pieces[i];
            for (let j = 0; j < pieces.length; j++) {
                const part = pieces[j];
                if (initialPiece != part) initialPiece.linkedParts.push(part)
            }
            Game.world[initialPiece.coordinates[0]][initialPiece.coordinates[1]] = initialPiece
        }


    },
    initialise: () => {
        console.log("initialising game");
        for (let y = 0; y < Game.settings.height; y++) {
            let row = []
            for (let x = 0; x < Game.settings.width; x++) {
                row.push([])
            }
            Game.world.push(row)
        }
        Game.resizeCanvas()
        window.addEventListener("resize", Game.resizeCanvas)
        window.addEventListener("keyup", (e) => {
            if (e.code = "SpaceBar") {
                
            }
        })
        // Add a timer for every tick
        Game.timers.push({initial: 100, loop: true, callback:()=>{
            if (!Game.selectedPiece) Game.spawnNewPiece()
            else rayCastDown()
        }})
        requestAnimationFrame(update)
    }
}

function placePiece() {
    //function to place all of the selected pieces into the map
    let part = Game.selectedPiece
    Game.world[part.coordinates[0]][part.coordinates[1]] = part
    
    part.linkedParts.forEach(linkedPart => {
        Game.world[linkedPart.coordinates[1]][linkedPart.coordinates[0]] = linkedPart
    });

    //Moment the piece is placed remove the selected
    Game.selectedPiece = undefined
}

function rayCastDown() {
    let placeThePart = false

    // Check anything below selected
    const belowSelected = Game.world[Game.selectedPiece.coordinates[1]+1][Game.selectedPiece.coordinates[0]]
    if (Game.selectedPiece.linkedParts.indexOf(belowSelected) == -1) {
        if (belowSelected instanceof Piece) {
            placeThePart = true;
        }
    }
    //Check anything below linked parts
    
    if (!placeThePart) {
        for (let i = 0; i < Game.selectedPiece.linkedParts.length; i++) {
            const part = Game.selectedPiece.linkedParts[i];
            if (Game.world[part.coordinates[1]+1] == undefined) {
                placeThePart = true;
                break;
            }
            const belowLinkedSelected = Game.world[part.coordinates[1] +1][part.coordinates[0]]
            console.log(belowLinkedSelected);
            if (Game.selectedPiece.linkedParts.indexOf(belowSelected) == -1) {
                if (belowLinkedSelected instanceof Piece) {
                    placeThePart = true;
                }
            }
        }
        
    }

    // If there isnt move down
    if (!placeThePart) Game.selectedPiece.moveDown()
    else {
        placePiece()
    }
}

function draw(deltaTime = undefined) {
    Game.context.clearRect(0,0, Game.canvas.width, Game.canvas.height)
    for (let y = 0; y < Game.world.length; y++) {
        for (let x = 0; x < Game.world[y].length; x++) {
            const Cube = Game.world[y][x];
            if (Cube instanceof Piece) Cube.draw(Game.context)
            Game.context.strokeRect(x*Game.settings.cubeSize, y*Game.settings.cubeSize, Game.settings.cubeSize,Game.settings.cubeSize)
        }
    }
}

let lastTime = 0
function update(delta) {
    const deltaTime = delta - lastTime
    lastTime = delta

    Game.timers.forEach(timer => {
        if (timer.current <= 0) {
            if (timer.callback) timer.callback()
            else console.warn("No Timer Callback");

            if (timer.loop) timer.current = timer.initial
            else Game.timers.splice(Game.timers.indexOf(timer), 1)
        }
        else {
            if (timer.current) timer.current -= deltaTime
            else timer.current = timer.initial
        }
    });

    draw(deltaTime)
    requestAnimationFrame(update)
}

Game.initialise()