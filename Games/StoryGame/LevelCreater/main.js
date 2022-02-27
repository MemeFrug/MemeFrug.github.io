//Define The Game
let Game = new _("StoryGameLevelCreator")
Game.Config.sideScroller = true

const player = new Player(Game, 0, 0, 50, 50, 100, 300, -300, 0)
Game.addPlayer(player, true)

window.addEventListener("Game:UpdateLoop", () => {
    
})

let mousePos = {
    x: 0,
    y: 0
}


                // A Config Varaible Assigned to A Local Variable For Easier Typing
                const nativeWidth = Game.Config.nativeWidth;
                const nativeHeight = Game.Config.nativeHeight;

                // The Current Size Of The Window in Width and Height
                const deviceWidth = window.innerWidth;
                const deviceHeight = window.innerHeight;

                // Get The Scale
                const scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

document.addEventListener("mousemove", (e) => {
    var rect = Game.canvas.element.getBoundingClientRect();

    e.preventDefault();
    e.stopPropagation();

    var mouseX = parseInt(e.clientX - rect.left);
    var mouseY = parseInt(e.clientY - rect.top);
    
    mousePos = {
        x: mouseX,
        y: mouseY
    }
})

window.addEventListener("Game:AfterDrawLoop", () => {
    Game.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative

    const MousePosition = Game.canvas.getMousePosition()
    Game.canvas.ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})

const world = new World(levelData, 0)

Game._Init() // Start The Game