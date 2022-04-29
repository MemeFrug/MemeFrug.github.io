//Define The ENGINE
const GameName = "StoryGameLevelCreator" // Set The ENGINE Name
ENGINE.NameOfGame = GameName
const player = new Player(false, 0, 0, 50, 50, 100, 300, -300, 0) // Instance the player
const SaveNameInput = document.getElementById("NameOfSaveInput"); // Get All of the elements
const SaveNameErrorElement = document.getElementById("SaveNameError")
const LocalSaveButton = document.getElementById("SaveLocallyButton");
const DownloadButton = document.getElementById("DownloadSaveButton");
const DeleteAllSavesButton = document.getElementById("deleteAllSaves");
const RemoveUIButton = document.getElementById("Hide UI");
const UIElement = document.getElementById("UI")
const NameOfLevelContainer = document.getElementById("NameOfLevelContainer")
const SubmitLevelName = document.getElementById("SubmitLevelName")
let LevelName = "" // Set Some Default Variables Used For Later On
let LocalSaveLevels = []
let Drawing = false
let Deleting = false
let AlreadyLoaded = false
let UIClosed = true
let playerSpawnPosition = { x: 0, y: 0 }
function ChangePlayerSpawnPos(position) {
    if (position) {
        if (position.x && position.y) {
            playerSpawnPosition = position
        } else {
            console.error("Position.x and y does not Exist");
        }
    } else {
        console.error("Position Does not Exist");
    }
}

ChangePlayerSpawnPos({ x: 10, y: 20 })

function setup() {
    const LocalSaveStorage = JSON.parse(localStorage.getItem(GameName + "Levels"))
    const LevelsElement = document.getElementById("Levels")
    if (LocalSaveStorage) {
        console.log("Found Save File");
        for (let i = 0; i < LocalSaveStorage.length; i++) {
            const element = LocalSaveStorage[i];
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
                LevelName = element.name
                UIElement.style.display = "flex"
                MainMenuElement.style.display = "none"
                levelData = ElementData
                WORLD.data = levelData
                WORLD.init(levelData)
                console.log("Started game");
                StartGame()
            })
        }
    }
    else {
        console.log("Creating Save");
        localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
        setup()
    }

    document.getElementById("CreateNew").addEventListener("mouseup", () => {
        const MainMenuElement = document.getElementById("MainMenu")
        NameOfLevelContainer.style.display = "flex"
        MainMenuElement.style.display = "none"
        WORLD.data = levelData
        WORLD.init(levelData)
    })
}

function update(deltaTime) {
    if (ENGINE.getMouseLeftClick()) {
        Drawing = true
        Deleting = false
    } else {
        Drawing = false
        Deleting = false
    }
    if (ENGINE.getMouseRightClick()) {
        Drawing = false
        Deleting = true
    } else {
        Drawing = false
        Deleting = false
    }
}

function draw(ctx) {
    const MousePosition = ENGINE.getMousePosition()

    if (ENGINE.InputHandler.keys_down.w) player._Move('w'); // Move the player
    else player._stopMoving("w")
    if (ENGINE.InputHandler.keys_down.a) player._Move('a');
    else player._stopMoving("a")
    if (ENGINE.InputHandler.keys_down.s) player._Move('s');
    else player._stopMoving("s")
    if (ENGINE.InputHandler.keys_down.d) player._Move('d');
    else player._stopMoving("d")

    let x = 0;
    let y = 1;

    for (let i = 0; i < levelData.length; i++) {
        x = 0;

        for (let j = 0; j < levelData[i].length; j++) {
            if (_rectIntersect(MousePosition.x, MousePosition.y, 0, 0, x, y, 50, 50)) {
                ctx.globalAlpha = 0.4
                ctx.fillRect(x, y, 50, 50)
                ctx.globalAlpha = 1

                if (Drawing) {
                    let element = new Square(true, x, y, 50, 50);
                    levelData[i][j] = 1
                    WORLD.setTile({ i: i, j: j }, element);
                }
                else if (Deleting) {
                    levelData[i][j] = 0
                    WORLD.deleteTile({ i: i, j: j })
                }
            }

            ctx.strokeRect(x, y, 50, 50)
            x += 50;
        }

        y += 50;
    }

    // Draw where player gets spawn
    ctx.fillStyle = "green"
    ctx.globalAlpha = 0.5
    ctx.fillRect(playerSpawnPosition.x, playerSpawnPosition.y, 50, 50)
    ctx.globalAlpha = 1

    ctx.fillStyle = "black"
    ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)

    ctx.strokeRect(0, 0, ENGINE.Config.WorldSize.x, ENGINE.Config.WorldSize.y)
}

function StartGame() {
    createCanvas(true, Enum.ResizeType.AspectRatio)
    setCanvasBackground("white")

    // A event listener to see when a file enters the screen
    document.addEventListener("dragenter", (e) => {
        const isLink = e.dataTransfer.types.includes("Files"); // Check if its a file
        if (isLink) {
            e.preventDefault(); // Needed For the drop event listener to work
        }
    })
    // A event listener to see when the file gets dragged across the screen
    document.addEventListener("dragover", (e) => {
        const isLink = e.dataTransfer.types.includes("Files"); // Check if its a file
        if (isLink) {
            e.preventDefault(); // Needed For the drop event listener to work
        }
    })
    // A Event listener to listen for the event of dropping a file onto the screen
    document.addEventListener("drop", (e) => {
        e.preventDefault() // Prevents the default event (Opening a new tab that reads the files content)
    })

    // A Event listener to listen for the event of dropping a file onto the canvas
    //TODO Remove AlreadyLoaded Variable
    ENGINE.canvas.element.addEventListener("drop", (e) => {
        e.preventDefault() // Prevents the default event (Opening a new tab that reads the files content)
        if (!AlreadyLoaded) { // Check if already been loaded
            AlreadyLoaded = true
            var file = e.dataTransfer.files[0]
            if (file.name.includes(".level")) {
                reader = new FileReader(); // Instance a new fileReader
                reader.onload = function (event) { // When Read the file and ready (on load)
                    const filename = file.name // Store the file name
                    const data = event.target.result // Store the data inside the file
                    LevelName = filename.replace(".level", "") // Change the level name to the files name (Without the .level at the end)
                    levelData = JSON.parse(data) // Turn the data that was a string into proper format and set levelData to it
                    WORLD.regenerate(levelData) // Reload the WORLD with the new levelData
                    console.log("Loaded WORLD");
                    return; // Leave the function (No current use for it)
                };
                reader.readAsText(file); // Read the file
                return false; // Idk why i just felt like it was necessary
            } else {
                console.error("File Is Not a .level");
                alert("That File is not a .level") // Alert the user that the file that was dragged into the screen was not a .level files
            }
        } else { // If already been loaded then
            console.error("Already Loaded A Save, Cannot Anymore please refresh the page");
            alert("Already Loaded A Save, Cannot Anymore please refresh the page") // Alert the user that You Cannot load anymore
        }
    })
}

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
        WORLD.data = levelData
        ENGINE._Init()
        console.log("Started game");
    }
})

LocalSaveButton.addEventListener("mouseup", (e) => {
    const LocalSaveStorage = localStorage.getItem(GameName + "Levels")
    console.log("Inputted Name: ", LevelName);

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
            localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
        } else {
            LocalSaveLevels.push({ name: LevelName, data: levelData })
            localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
        }
    }
    else {
        console.log("Creating Save");
        LocalSaveLevels.push({ name: LevelName, data: levelData })
        localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
    }
})

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

















// Custom Move Code the incorporate the 's' key
player._Move = (movement) => {
    switch (movement) { // Make a switch statement
        case "w":
            player.vy = -player.speed // set the vertical velocity to jump
            break;

        case "a":
            player.vx = -player.speed // Make the speed negative to it goes the opposite way (-x)
            break;

        case "d":
            player.vx = player.speed // Make the x velocity positive of the speed so it goes right
            break;

        case "s":
            player.vy = player.speed
    }
}
// Custom Stop Moving Code, to incorporate the 's' key and to make the 'w' key incorporate the 's' key aswell
player._stopMoving = (movement) => {
    switch (movement) {
        case "w":
            if (!ENGINE.InputHandler.keys_down.s)
                player.vy = 0
            else
                player._Move("s")
            break;
        case "a":
            if (!ENGINE.InputHandler.keys_down.d)
                player.vx = 0;
            else
                player._Move("d")
            break;

        case "d":
            if (!ENGINE.InputHandler.keys_down.a)
                player.vx = 0;
            else
                player._Move("a")
            break;

        case "s":
            if (!ENGINE.InputHandler.keys_down.w)
                player.vy = 0
            else
                player._Move("w")
            break
    }
}
player.c = "red" // Set the colour of the player from default: black to red
player.gravityMax = -300 // Set the gravity max, so gravity is'nt applied, is -300 because when jumping the velocity y gets set to -300, so make sure gravityMax is -300 so it does'nt affect the jumping
player.DisableCollision() // Disable the collisions with other gameObjects (Removes it from the gameObjects Array)
ENGINE.Config.sideScroller = true // Sets The Camera To Be Moveable
ENGINE.Config.boundaries.left = 0 // Set the Boundaries
ENGINE.Config.boundaries.right = ENGINE.Config.WorldSize.x - player.w
ENGINE.Config.boundaries.top = 0
ENGINE.Config.boundaries.bottom = ENGINE.Config.WorldSize.y - player.h
ENGINE.Config.sideScrollerSideOffset.left = 10 // Set the camera offset on the edges
ENGINE.Config.sideScrollerSideOffset.top = 10
ENGINE.Config.sideScrollerSideOffset.bottom = 10
ENGINE.Config.sideScrollerSideOffset.right = 10
ENGINE.addPlayer(player, true) // Add the player to the game as a local player