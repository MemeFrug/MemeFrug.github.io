//Define The Game
let Game = new _("StoryGameLevelCreator")
Game.Config.sideScroller = true

const player = new Player(Game, 0, 0, 50, 50, 100, 300, -300, 0)
Game.addPlayer(player, true)

const world = new World(levelData)

let cubeHoveringOver = {i: 1, j: 1}

let mouseDown = false

window.addEventListener("mouseup", () => {
    mouseDown = false
})

window.addEventListener("mousedown", () => {
    mouseDown = true
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
                ctx.fillRect(x, y, 50, 50)

                if (mouseDown) {
                    let dirt = new Square(Game, true, x, y, 50, 50);
                    world.tiles.push(dirt);
                }
            }

            ctx.strokeRect(x, y, 50, 50)
            x += 50;
        }

        y += 50;
    }
})

window.addEventListener("Game:AfterDrawLoop", () => {
    Game.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative

    const MousePosition = Game.canvas.getMousePosition()
    Game.canvas.ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})

Game._Init() // Start The Game