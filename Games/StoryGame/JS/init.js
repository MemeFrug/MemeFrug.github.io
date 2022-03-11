for (let a = 0; a < 365; a += 1) {
    rays[a] = new Ray(400, 600, radians(a, 10))
}
// rays[0] = new Ray(400, 600, radians(90, 10))

for (let i = 0; i < 5; i++) {
    let x1 = _GetRndInteger(0, Game.Config.WorldSize.x)    
    let x2 = _GetRndInteger(0, Game.Config.WorldSize.x)   
    let y1 = _GetRndInteger(0, Game.Config.WorldSize.y)    
    let y2 = _GetRndInteger(0, Game.Config.WorldSize.y)    

    walls[i] = new Wall(x1, y1, x2, y2)
}

walls.push(new Wall(0, 0, Game.Config.WorldSize.x, 0))
walls.push(new Wall(0, 0, 0, Game.Config.WorldSize.y))
walls.push(new Wall(0, Game.Config.WorldSize.y, Game.Config.WorldSize.x, Game.Config.WorldSize.y))
walls.push(new Wall(Game.Config.WorldSize.x, 0, Game.Config.WorldSize.x, Game.Config.WorldSize.y))

async function BackToHub() {window.location.replace("../../index.html");}
async function Play() {
    document.getElementById("Back-Button").removeEventListener("mouseup", BackToHub);
    document.getElementById("Play-Button").removeEventListener("mouseup", Play);
    MainMenuElementDOM.style.display = "none";
    Game._Init();
}

window.onload = async () => {
    const t = new Audio("./Assets/Audio/masterpiece.mp3");
    t.autoplay = true
    t.loop = true 
}

window.addEventListener("Game:BeforeDrawLoop", () => {
    const Mouse = Game.canvas.getMousePosition() // Returns As a {x: 0, y: 0} aka a vector
    const ctx = Game.canvas.ctx
    walls.forEach(wall => {
        wall.draw(ctx)
    });
    rays.forEach(ray => {
        ray.draw(ctx)
        ray.pos = {
            x: Mouse.x,
            y: Mouse.y
        }
        // ray.lookAt(Mouse.x, Mouse.y) 

        let closest = null;
        let record = Infinity;
        for (let wall of walls) {
            const pt = ray.cast(wall)
            if (pt.result) {
                const d = pt.dist
                if (d < record) {
                    record = d;
                    closest = pt.result;
                }
            } 
        };
        if (closest) {
            ctx.strokeStyle = "red"
            ctx.beginPath(); // Start a new path
            ctx.moveTo(ray.pos.x, ray.pos.y); // Move the pen to (30, 50)
            ctx.lineTo(closest.x, closest.y); // Draw a line to (150, 100)
            ctx.stroke(); // Render the path
            ctx.fillStyle = "green"
            ctx.fillRect(closest.x - 5, closest.y - 5, 10, 10)
        }
    });
})

window.addEventListener("Game:AfterDrawLoop", () => {
    const MousePosition = Game.canvas.getMousePosition()
    const ctx = Game.canvas.ctx
    ctx.fillStyle = "black"
    ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})

document.getElementById("Back-Button").addEventListener("mouseup", BackToHub);
document.getElementById("Play-Button").addEventListener("mouseup", Play);
