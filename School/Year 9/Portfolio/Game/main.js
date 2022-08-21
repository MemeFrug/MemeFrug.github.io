console.log("Started")

const canvas = document.getElementById("canvas")
const gameContainer = document.getElementById("GameContainer")
let ctx = canvas.getContext('2d')

let drawLoop = [];
let updateLoop = [];
let g = 30 
let player;

let ViewportX = 0;
let ViewportY = 0;

let score = 0;

function fitToContainer(){
    ViewportX = 1920
    ViewportY = 1080

    canvas.style.width = "1000px"
    canvas.style.height = "600px"
    canvas.width = 1920
    canvas.height = 1200    
}

let oldTimeStamp = 0;

function Tick(timeStamp) {
    const deltaTime = (timeStamp - oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
    oldTimeStamp = timeStamp; // Update oldTimeStamp To the new one
    
    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0,0, canvas.width, canvas.height)

    //Update
    for (let i = 0; i < updateLoop.length; i++) {
        const element = updateLoop[i];
        element.update(deltaTime) // Add deltaTime
    }
    //Draws
    for (let i = 0; i < drawLoop.length; i++) {
        const element = drawLoop[i];
        
        element.draw(ctx)
    }

    requestAnimationFrame(Tick)
}

function StartGame() {
    console.log("started game")

    //Create The Player
    player = {
        y: 0,
        vy: 0,
        jumpHeight: -9,
        needToJump: false,
        update(deltaTime) {
            this.y += this.vy
            this.vy += g * deltaTime
            
            if (this.y + 300 >= ViewportY) {
                this.y = ViewportY - 300
                this.vy = 0
                if (this.needToJump) this.Jump()
                return
            }
            this.needToJump = false
        },
        draw(ctx) {
            ctx.fillStyle = "blue"
            ctx.fillRect(10, this.y, 100, 300)
        },
        Jump() {
            this.needToJump = false;
            this.vy = this.jumpHeight
        }
    }

    //Add the ground
    drawLoop.push({draw(ctx) {
        ctx.fillStyle = "black"
        ctx.fillRect(0,ViewportY,5000,5000)
    }})
    //Add the player
    drawLoop.push(player)
    updateLoop.push(player)
    //Add the score text
    drawLoop.push({draw(ctx) {
        ctx.fillStyle = "red"
        ctx.font = "90px Arial"
        ctx.fillText("Score: " + score, canvas.clientWidth / 2 , canvas.clientHeight / 2)
    }})

    //Add first enemy
    enemy = {
        x: ViewportX,
        update() {
            if (collisionDetection(this.x, ViewportY - 100, 100, 100, 10, player.y, 100, 300)) {
                score = 0
                alert("U died")
                this.x = ViewportX
                return;
            }

            this.x -= 20

            if (this.x <= -100) {
                this.x = ViewportX
                score++;
            }
        },
        draw(ctx) {
            ctx.fillRect(this.x, ViewportY - 100, 100, 100)
        }
    }
    drawLoop.push(enemy)
    updateLoop.push(enemy)
}

function clearLoops() {
    drawLoop = []
    updateLoop = []
}

function Init() {
    fitToContainer()
    drawLoop.push({draw(ctx) {
        ctx.fillStyle = "black"
        ctx.font = "120px Arial"
        ctx.fillText("Click To Start", canvas.clientWidth / 2 - 350, canvas.clientHeight / 2)
    }})
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case " ":
                console.log("pressed space bar")
                if (!player) {
                    clearLoops()
                    StartGame()
                    return
                }
                player.needToJump = true
                break;
        
            default:
                break;
        }
    })

    canvas.addEventListener("mouseup", () => {
        console.log("clicked")
        if (!player) {
            clearLoops()
            StartGame()
            return
        }

        player.needToJump = true
    })   

    requestAnimationFrame(Tick)
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {;
        return false;
    }
    return true;
}

function collisionDetection(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 + w1 < x2 ||
            x1 > x2 + w2 ||
            y1 + h1 < y2 ||
            y1 > y2 + h2) {
            return false
        }
        return true;
}

window.onload = Init