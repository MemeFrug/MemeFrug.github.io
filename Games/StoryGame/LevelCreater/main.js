//Define The Game
const Game = new _("StoryGameLevelCreator")
const player = new Player(Game, 0, 0, 50, 50, 100, 300, -300, 0)
const world = new World(levelData)
Game.Config.sideScroller = true
Game.addPlayer(player, true)
Game._Init() // Start The Game

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

let Drawing = false
let Deleting = false
window.addEventListener("mouseup", (e) => {
    e.preventDefault()
    if (e.button == 0) { // Pressing Left Button
        Drawing = false
        Deleting = false
    }
    else if (e.button == 2) { // Pressing Right
        Drawing = false
        Deleting = false
    }
})

window.addEventListener("mousedown", (e) => {
    e.preventDefault()
    if (e.button == 0) { // Pressing Left Button
        Drawing = true
        Deleting = false
    }
    else if (e.button == 2) { // Pressing Right
        Drawing = false
        Deleting = true
    }
})

window.addEventListener("Game:BeforeDrawLoop", () => {
    const MousePosition = Game.canvas.getMousePosition()

    const ctx = Game.canvas.ctx

    let x = 0;
    let y = 1;

    for (let i = 0; i < levelData.length; i++) {
        x = 0;

        for (let j = 0; j < levelData[i].length; j++) {
            if (_rectIntersect(MousePosition.x, MousePosition.y, 0, 0, x, y, 50, 50)){
                ctx.globalAlpha = 0.4
                ctx.fillRect(x, y, 50, 50)
                ctx.globalAlpha = 1

                if (Drawing) {
                    let element = new Square(Game, true, x, y, 50, 50);
                    world.setTile({i: i, j: j}, element);
                }
                else if (Deleting) {
                    world.deleteTile({i: i, j: j})
                }
            }

            ctx.strokeRect(x, y, 50, 50)
            x += 50;
        }

        y += 50;
    }
})

window.addEventListener("Game:AfterDrawLoop", () => {
    const MousePosition = Game.canvas.getMousePosition()
    Game.canvas.ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})