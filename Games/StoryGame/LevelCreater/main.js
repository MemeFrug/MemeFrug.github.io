//Define The Game
let Game = new _("StoryGameLevelCreator")
Game.Config.sideScroller = true

const player = new Player(Game, 0, 0, 50, 50, 100, 300, -300, 0)
Game.addPlayer(player, true)

window.addEventListener("Game:UpdateLoop", () => {
    
})

window.addEventListener("Game:AfterDrawLoop", () => {
    const MousePosition = Game.canvas.getMousePosition()
    Game.canvas.ctx.fillRect(MousePosition.x, MousePosition.y, 10, 10)
})

const world = new World(levelData, 0)

Game._Init() // Start The Game