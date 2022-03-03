//Define The Game
const GameName = "StoryGameLevelCreator"
const Game = new _(GameName)
const player = new Player(Game, 0, 0, 50, 50, 100, 300, -300, 0)
const world = new World(levelData, Game)
const SaveNameInput = document.getElementById("NameOfSaveInput");
const LocalSaveButton = document.getElementById("SaveLocallyButton");
const LoadSaveButton = document.getElementById("LoadSaveButton");
const DownloadButton = document.getElementById("DownloadSaveButton");
let LocalSaveLevels = []
let Drawing = false
let Deleting = false
player.c = "red"
Game.Config.sideScroller = true
Game.Config.boundries.left = 0 // Set The Boundries (Currently only left)
Game.Config.boundries.right = Game.Config.WorldSize.x - player.w
Game.Config.sideScrollerSideOffset = 0 // Set the camera offset on the edges
Game.addPlayer(player, true)
Game._Init() // Start The Game

const music = new Audio('../Assets/Audio/masterpiece.mp3'); // MainMenu Music.play(); // Start The Main Music Audio (Debug)
music.autoplay = true
music.loop = true
function stopMusic() {music.pause()}
function startMusic() {music.play()}

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

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
    if (e.button == 0) { // Pressing Left Button
        Drawing = true
        Deleting = false
    }
    else if (e.button == 2) { // Pressing Right
        e.preventDefault()
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
                    levelData[i][j] = 1
                    world.setTile({i: i, j: j}, element);
                }
                else if (Deleting) {
                    levelData[i][j] = 0
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

LocalSaveButton.addEventListener("mousedown", (e) => {
    const LevelName = SaveNameInput.value
    const LocalSaveStorage = localStorage.getItem(GameName+"Levels")
    console.log("Inputed Name: ", LevelName);

    if (LocalSaveStorage) {
        console.log("Found Save File");
        LocalSaveLevels = JSON.parse(LocalSaveStorage)
        LocalSaveLevels.push(levelData)
        localStorage.setItem(GameName+"Levels", JSON.stringify(LocalSaveLevels))
    }
    else {
        console.log("Creating Save");
        LocalSaveLevels.push(LevelName)
        localStorage.setItem(GameName+"Levels", JSON.stringify(LocalSaveLevels))
    }
})

LoadSaveButton.addEventListener("mousedown", (e) => {
    const LevelName = SaveNameInput.value
    const LevelsFromStorage = JSON.parse(localStorage.getItem(GameName+"Levels"))
    if (LevelsFromStorage) {
        LevelsFromStorage.forEach(Level => {
            Level.forEach(Name => {
                if (Name = LevelName) {

                }
            })
        });
    }
})