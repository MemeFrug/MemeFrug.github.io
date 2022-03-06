//Define The Game
const GameName = "StoryGameLevelCreator"
const Game = new _(GameName)
const player = new Player(Game, false, 0, 0, 50, 50, 100, 300, -300, 0)
const SaveNameInput = document.getElementById("NameOfSaveInput");
const SaveNameErrorElement = document.getElementById("SaveNameError")
const LocalSaveButton = document.getElementById("SaveLocallyButton");
// const LoadSaveButton = document.getElementById("LoadSaveButton");
const DownloadButton = document.getElementById("DownloadSaveButton");
const DeleteAllSavesButton = document.getElementById("deleteallsaves");
const RemoveUIButton = document.getElementById("Hide UI");
const UIElement = document.getElementById("UI")
const NameOfLevelContainer = document.getElementById("NameOfLevelContainer")
const SubmitLevelName = document.getElementById("SubmitLevelName")
let LevelName = ""
let world = undefined
let LocalSaveLevels = []
let Drawing = false
let Deleting = false
let AlreadyLoaded = false
let UIClosed = true
player.c = "red"
player.gravityMax = 0
player.DisableCollision()
player._Move = (movement) => {
    switch (movement) { // Make a switch statement
        case "w":
            player.vy = -player.speed // set the virtical velocity to jump
            break;

        case "a":
            player.vx = -player.speed // Make the speed negative to it goes the oposite way (-x)
            break;

        case "d":
            player.vx = player.speed // Make the x velocity positive of the speed so it goes right
            break;

        case "s":
            player.vy = player.speed
    }
}

player._stopMoving = (movement) => {
    switch (movement) {
        case "w":
            player.vy = 0
            break;
        case "a":
            player.vx = 0;
            break;

        case "d":
            player.vx = 0;
            break;
        
        case "s":
            player.vy = 0
            break
    }
}
Game.Config.sideScroller = true
Game.Config.boundries.left = 0 // Set The Boundries (Currently only left)
Game.Config.boundries.right = Game.Config.WorldSize.x - player.w
Game.Config.sideScrollerSideOffset.left = 10 // Set the camera offset on the edges
Game.Config.sideScrollerSideOffset.top = 10
Game.Config.sideScrollerSideOffset.bottom = 10
Game.Config.sideScrollerSideOffset.right = 10
Game.Config.sideScrollPlayerFollowDelay = 5   
Game.addPlayer(player, true)

const music = new Audio('../StoryGame/Assets/Audio/masterpiece.mp3'); // MainMenu Music.play(); // Start The Main Music Audio (Debug)
music.autoplay = true
music.loop = true
function stopMusic() {music.pause()}
function startMusic() {music.play()}
function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function onload() {
    const LocalSaveStorage = JSON.parse(localStorage.getItem(GameName+"Levels"))
    const LevelsElement = document.getElementById("Levels")
    if (LocalSaveStorage) {
        console.log("Found Save File");
        for (let i = 0; i < LocalSaveStorage.length; i++) {
            const element = LocalSaveStorage[i];
            console.log(element);
            const LevelContainer = document.createElement("div")
            const LevelBox = document.createElement("div")
            const LevelNameElement = document.createElement("span")
            LevelContainer.className = "Level_Container"
            LevelBox.className = "Level"
            LevelBox.id = element.name
            LevelNameElement.className = "Level_Name"
            LevelNameElement.innerHTML = element.name
            LevelBox.appendChild(LevelNameElement)
            LevelContainer.appendChild(LevelBox)
            LevelsElement.appendChild(LevelContainer)

            LevelContainer.addEventListener("mouseup", () => {
                const ElementData = element.data
                const MainMenuElement = document.getElementById("MainMenu")
                const UIElement = document.getElementById("UI")
                LevelName = element.name
                UIElement.style.display = "flex"
                MainMenuElement.style.display = "none"
                levelData = ElementData
                world = new World(levelData, Game)
                Game._Init()
                console.log("Started game");
            })
        }
    }
    else {
        console.log("Creating Save");
        localStorage.setItem(GameName+"Levels", JSON.stringify(LocalSaveLevels))
        onload()
    }

    document.getElementById("CreateNew").addEventListener("mouseup", () => {
        const MainMenuElement = document.getElementById("MainMenu")
        NameOfLevelContainer.style.display = "flex"
        MainMenuElement.style.display = "none"
    })
}

window.onload = onload()

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

Game.canvas.element.addEventListener("mouseup", (e) => {
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

Game.canvas.element.addEventListener("mousedown", (e) => {
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
    ctx.fillStyle = "black"

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
    const ctx = Game.canvas.ctx
    ctx.fillStyle = "black"
    ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})

DeleteAllSavesButton.addEventListener("mouseup", () => {
    localStorage.clear()
    window.location.reload()
})

SubmitLevelName.addEventListener("mouseup", () => {
    if (SaveNameInput.value == "") {
        console.error("SaveNameInput Cannot Be Nothing");
        SaveNameErrorElement.innerText = "Error: SaveNameInput Cannot Be Nothing"
        SaveNameErrorElement.style.display = "block"
    } else {
        SaveNameErrorElement.style.display = "none"
        NameOfLevelContainer.style.display = "none"
        UIElement.style.display = "flex"
        LevelName = SaveNameInput.value
        world = new World(levelData, Game)
        Game._Init()
        console.log("Started game");
    }
})

LocalSaveButton.addEventListener("mouseup", (e) => {
    const LocalSaveStorage = localStorage.getItem(GameName+"Levels")
    console.log("Inputed Name: ", LevelName);

    if (!LevelName || LevelName == "") {
        console.error("Level Name Cant Be Nothing");
        return
    }

    if (LocalSaveStorage) {
        let FoundSave = false
        let SaveIndex = undefined
        console.log("Found Save File");
        LocalSaveLevels = JSON.parse(LocalSaveStorage)
        for (let i = 0; i < LocalSaveLevels.length; i++) {
            const element = LocalSaveLevels[i];
            if (element.name == LevelName) {
                FoundSave = true
                SaveIndex = i
            }
        }
        if (FoundSave) {
            console.log(LocalSaveLevels[SaveIndex]);
            LocalSaveLevels[SaveIndex].data = levelData
            localStorage.setItem(GameName+"Levels", JSON.stringify(LocalSaveLevels))
        } else {
            LocalSaveLevels.push({name: LevelName, data: levelData})
            localStorage.setItem(GameName+"Levels", JSON.stringify(LocalSaveLevels))
        }
    }
    else {
        console.log("Creating Save");
        LocalSaveLevels.push({name: LevelName, data: levelData})
        localStorage.setItem(GameName+"Levels", JSON.stringify(LocalSaveLevels))
    }
})

// LoadSaveButton.addEventListener("mouseup", () => {
//     if (!AlreadyLoaded) {
//         const LevelsFromStorage = JSON.parse(localStorage.getItem(GameName+"Levels"))
//         console.log(LevelsFromStorage);
//         if (LevelsFromStorage) {
//             LocalSaveStorage = LevelsFromStorage
//             LocalSaveStorage.forEach(element => {
//                 if (element.name == LevelName) {
//                     AlreadyLoaded = true
//                     levelData = element.data
//                     console.log(levelData);
//                     world.regen(levelData)
//                     console.log("Found Save File");
//                     return;
//                 }
//             });
//             if (!AlreadyLoaded) {
//                 console.error("Could Not Find That Save File Locally");
//                 alert("Could Not Find That Save File Locally")
//             }
//         }
//     } else {
//         console.error("Already Loaded A Save, Cannot Anymore please refresh the page");
//         alert("Already Loaded A Save, Cannot Anymore please refresh the page")
//     }
// })

DownloadButton.addEventListener("mouseup", () => {
    if (LevelName != "") {
        if (LocalSaveLevels) {
            if (LocalSaveLevels.length > 0) {
                LocalSaveLevels.forEach(element => {
                    if (element.name == LevelName) {
                        console.log("Found Level Name In Files, Downloading It");
                        download(LevelName + ".level", JSON.stringify(element.data))
                    }
                });
            } else {
                console.log("Downloading Current Scene");
                download(LevelName + ".level", JSON.stringify(levelData))
            }
        }
    } else {
        console.error("Level Name Cannot Be ''");
    }
})

RemoveUIButton.addEventListener("mouseup", () => {
    console.log("Pressed");
    if (UIClosed) {
        UIClosed = false
        let percentage = 0
        const intervalID = setInterval(() => {
            percentage--
            UIElement.style.left = JSON.stringify(percentage) + "%"
            if (percentage == -13) {
                clearInterval(intervalID)
            }
        }, 10);
        RemoveUIButton.innerHTML = ">"
    } else {
        UIClosed = true
        let percentage = -15
        const intervalID = setInterval(() => {
            percentage++
            UIElement.style.left = JSON.stringify(percentage) + "%"
            if (percentage == 0) {
                clearInterval(intervalID)
            }
        }, 10);
        RemoveUIButton.innerHTML = "<"
    }
})

document.addEventListener("dragenter", (e) => {
    const isLink = e.dataTransfer.types.includes("Files");
    console.log(e.dataTransfer.types);
    console.log(isLink);
    if (isLink) {
      e.preventDefault();
    }
})
document.addEventListener("dragover", (e) => {
    const isLink = e.dataTransfer.types.includes("Files");
    if (isLink) {
      e.preventDefault();
    }
})

document.addEventListener("drop", (e) => {
    e.preventDefault()
})

Game.canvas.element.addEventListener("drop", (e) => {
    e.preventDefault()
    if (!AlreadyLoaded) {
        AlreadyLoaded = true
        var file = e.dataTransfer.files[0]
        if (file.name.includes(".level")) {
            reader = new FileReader();
            reader.onload = function(event) {
                const filename = file.name
                const data = event.target.result
                LevelName = filename.replace(".level", "")
                levelData = JSON.parse(data)
                world.regen(levelData)
                console.log("Loaded World");
                return;
            };
            reader.readAsText(file);
            return false;
        } else {
            console.error("File Is Not a .level");
        }
    } else {
        console.error("Already Loaded A Save, Cannot Anymore please refresh the page");
        alert("Already Loaded A Save, Cannot Anymore please refresh the page")
    }
})