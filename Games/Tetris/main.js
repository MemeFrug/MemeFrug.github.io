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

    returnLinkedPieces() {
        let newArray = []
        this.linkedParts.forEach(part => {
            newArray.push(new Piece(part.coordinates))
        });
        return newArray
    }
}

const Game = {
    world: [],
    canvas: document.getElementById("canvas"),
    context: document.getElementById("canvas").getContext("2d"),
    timers: [],
    selectedPiece: undefined,
    projectedPieces: [],
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
                pieces.push(new Piece([6,1]))
                pieces.push(new Piece([5,1]))
                pieces.push(new Piece([4,1]))
                pieces.push(new Piece([4,2]))
                Game.selectedPiece = pieces[0]
                pieces[0].c = "red"
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
            switch (e.key) {
                case "SpaceBar":
                    console.log("pressed space bar");
                    break;
                case "ArrowLeft":
                    console.log("pressed ArrowLeft");
                    //Move selected part to the left

                    break;
                case "ArrowRight":
                    console.log("pressed ArrowRight");
                    //Move selected part to the right

                    break;
                case "ArrowUp":
                    console.log("pressed ArrowUp");
                    // rotation clockwise is (y, -x)

                    break;
                case "ArrowDown":
                    console.log("pressed ArrowDown");
                    // rotation counter-clockwise is (-y, x)

                    break;
            
                default:
                    break;
            }
        })
        // Add a timer for every tick
        Game.timers.push({initial: 100, loop: true, callback:()=>{
            Game.projectedPieces = []
            if (!Game.selectedPiece) Game.spawnNewPiece()
            else rayCastDown()
        }})
        requestAnimationFrame(update)
    }
}

function placePiece() {
    //function to place all of the selected pieces into the map
    let part = Game.selectedPiece
    Game.world[part.coordinates[1]][part.coordinates[0]] = part
    
    part.linkedParts.forEach(linkedPart => {
        Game.world[linkedPart.coordinates[1]][linkedPart.coordinates[0]] = linkedPart
    });

    //Moment the piece is placed remove the selected
    Game.selectedPiece = undefined
}

function rayCastDownPartReturn(part, offset=[0,1]) {
    if (Game.world[part.coordinates[1]+offset[1]] == undefined) {
        return true;
    }
    const belowLinkedSelected = Game.world[part.coordinates[1] + offset[1]][part.coordinates[0]+offset[0]]
    if (Game.selectedPiece.linkedParts.indexOf(belowLinkedSelected) == -1) {
        if (belowLinkedSelected instanceof Piece) {
            return true;
        }
    }
    return false;
}

function rayCastDown() {
    let placeThePart = false

    // Check anything below selected
    placeThePart = rayCastDownPartReturn(Game.selectedPiece)

    //Check anything below linked parts
    if (!placeThePart && Game.selectedPiece) {
        for (let i = 0; i < Game.selectedPiece.linkedParts.length; i++) {
            const part = Game.selectedPiece.linkedParts[i];
            const rayCast = rayCastDownPartReturn(part)
            if (rayCast) {
                placeThePart = rayCast
            }
        }
    }


    // Project it down
    // Create a new part
    const projectedPart = new Piece(Game.selectedPiece.coordinates)

    projectedPart.linkedParts = Game.selectedPiece.returnLinkedPieces()
    let projectedYCoords = 0

    let j = 1

    while (projectedYCoords <= 0 || Game.settings.height - j >= Game.settings.height) {
        for (let i = 0; i < projectedPart.linkedParts.length; i++) {
            const part = projectedPart.linkedParts[i];
            // Ray cast down
            let rayCastProject = rayCastDownPartReturn(part, [0, j])
            // Hit something
            if (rayCastProject) {
                // Stop the loop and move all other linked blocks that far down
                projectedYCoords = j
                console.log("found one");
                break;
            }
        }
        console.log(Game.settings.height, j, projectedYCoords);
        j++
    }

    for (let i = 0; i < projectedPart.linkedParts.length; i++) {
        const part = projectedPart.linkedParts[i];
        // part.coordinates[1] += j
        Game.projectedPieces.push(part.coordinates)
    }

    //Draw the linked parts
    // Draw the main parts
    Game.projectedPieces.push(projectedPart.coordinates)

    // If there isnt move down
    if (!placeThePart && Game.selectedPiece) Game.selectedPiece.moveDown()
    else if (Game.selectedPiece) {
        placePiece()
    }
}
console.log("HUak Tua");
function draw(deltaTime = undefined) {
    let ctx = Game.context
    Game.context.clearRect(0,0, Game.canvas.width, Game.canvas.height)
    for (let y = 0; y < Game.world.length; y++) {
        for (let x = 0; x < Game.world[y].length; x++) {
            const Cube = Game.world[y][x];
            if (Cube instanceof Piece) Cube.draw(Game.context)
            Game.context.strokeRect(x*Game.settings.cubeSize, y*Game.settings.cubeSize, Game.settings.cubeSize,Game.settings.cubeSize)
        }
    }
    Game.projectedPieces.forEach(coords => {
        //Loop all the way down until touch, so that there will be grey outline
        ctx.globalAlpha = 0.7
        ctx.fillStyle = "black"
        ctx.fillRect(coords[0] * Game.settings.cubeSize, coords[1] * Game.settings.cubeSize, Game.settings.cubeSize, Game.settings.cubeSize)
        ctx.globalAlpha = 1
    })
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