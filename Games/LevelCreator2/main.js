const player = new Player(false, 0, 10, 50, 50, 100, 500, -900);
player.c = "red" // Set the colour of the player from default: black to red
player.gravityMax = -300
ENGINE.Config.sideScroller = true
ENGINE.addPlayer(player, true)

//Define The ENGINE
const GameName = "StoryGameLevelCreator2" // Set The ENGINE Name
ENGINE.NameOfGame = GameName

const SaveNameInput = getElementById("NameOfSaveInput"); // Get All of the elements
const SaveNameErrorElement = getElementById("SaveNameError")

const LocalSaveButton = getElementById("SaveLocallyButton");
const DownloadButton = getElementById("DownloadSaveButton");

const DeleteAllSavesButton = getElementById("deleteAllSaves");

const RemoveUIButton = getElementById("Hide UI");
const UIElement = getElementById("UI")

const NameOfLevelContainer = getElementById("NameOfLevelContainer")
const SubmitLevelName = getElementById("SubmitLevelName")

const GameAssetsContainer = getElementById("GameAssetsContainer")
const GameAssetsAscentElement = getElementById("AscentGameSelect")

let stats;
let LevelName = "" // Set Some Default Variables Used For Later On
let LocalSaveLevels = []
let Drawing = false
let Deleting = false
let AlreadyLoaded = false
let UIClosed = true
let playerSpawnPosition = { x: 0, y: 0 }

function ChangePlayerSpawnPos(position) { //DEBUG
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
    stats = STATS.new()
    stats.autoLoad()

    addEngineEvent(Enum.Events.Pressed.LeftClick, () => {
        Drawing = true
        Deleting = false
    })
    addEngineEvent(Enum.Events.Released.LeftClick, () => {
        Drawing = false
        Deleting = false
    })
    addEngineEvent(Enum.Events.Pressed.RightClick, () => {
        Drawing = false
        Deleting = true
    })
    addEngineEvent(Enum.Events.Released.RightClick, () => {
        Drawing = false
        Deleting = false
    })

    const LocalSaveStorage = JSON.parse(localStorage.getItem(GameName + "Levels"))
    const LevelsElement = getElementById("Levels")
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
                const MainMenuElement = getElementById("MainMenu")
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

    getElementById("CreateNew").addEventListener("mouseup", () => {
        const MainMenuElement = getElementById("MainMenu")
        NameOfLevelContainer.style.display = "flex"
        MainMenuElement.style.display = "none"
    })
}

function update(deltaTime) {
    // const Speed = 10
    // if (ENGINE.InputHandler.keys_down.w) ENGINE.VARIABLES.Cam.y += Speed // Move the Camera
    // if (ENGINE.InputHandler.keys_down.a) ENGINE.VARIABLES.Cam.x += Speed
    // if (ENGINE.InputHandler.keys_down.s) ENGINE.VARIABLES.Cam.y -= Speed
    // if (ENGINE.InputHandler.keys_down.d) ENGINE.VARIABLES.Cam.x -= Speed

    if (ENGINE.InputHandler.keys_down.w) player.move('w'); // Move the player
	else player.stopMove("w")
	if (ENGINE.InputHandler.keys_down.a) player.move('a');
	else player.stopMove("a")
	if (ENGINE.InputHandler.keys_down.d) player.move('d');
	else player.stopMove("d")
}

function draw(ctx) {
    const MousePosition = ENGINE.getMousePosition()

    let x = 0;
    let y = 1;

    for (let i = 0; i < WORLD.data.length; i++) {
        x = 0;
        for (let j = 0; j < WORLD.data[i].length; j++) {
            if (_rectIntersect(MousePosition.x, MousePosition.y, 0, 0, x, y, WORLD.blockSize, WORLD.blockSize)) {
                ctx.globalAlpha = 0.4
                fillRect(x, y, WORLD.blockSize, WORLD.blockSize)
                ctx.globalAlpha = 1

                if (Drawing) {
                    let element = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                    WORLD.data[i][j] = 1
                    WORLD.setTile({ i: i, j: j }, element);
                }
                else if (Deleting) {
                    WORLD.data[i][j] = 0
                    WORLD.deleteTile({ i: i, j: j })
                }
            }

            strokeRect(x, y, WORLD.blockSize, WORLD.blockSize)
            x += WORLD.blockSize;
        }
        y += WORLD.blockSize;
    }

    // Draw where player gets spawn
    ctx.globalAlpha = 0.5
    fillRect(playerSpawnPosition.x, playerSpawnPosition.y, 50, 50, "green")
    ctx.globalAlpha = 1

    fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15, "black")

    strokeRect(0, 0, ENGINE.Config.WorldSize.x, ENGINE.Config.WorldSize.y)
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
        // UIElement.style.display = "flex"
        LevelName = SaveNameInput.value

        GameAssetsContainer.style.display = "flex"
        // console.log("Started game");
        // StartGame()
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
            LocalSaveLevels[SaveIndex].data = WORLD.data
            localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
        } else {
            LocalSaveLevels.push({ name: LevelName, data: WORLD.data })
            localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
        }
    }
    else {
        console.log("Creating Save");
        LocalSaveLevels.push({ name: LevelName, data: WORLD.data })
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
                download(LevelName + ".level", JSON.stringify(WORLD.data))
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



//Load the assets into the side browser thingy
function ImportAssets(assets) {
    
}




// Selecting The Game for assets to use

GameAssetsAscentElement.addEventListener("mouseup", () => {
    WORLD.init()
    ImportAssets(ASCENTASSETS)
    StartGame()
})




















// Custom Move Code the incorporate the 's' key
player.move = (movement) => {
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
player.stopMove = (movement) => {
    switch (movement) {
        case "w":
            if (!ENGINE.InputHandler.keys_down.s)
                player.vy = 0
            else
                player.move("s")
            break;
        case "a":
            if (!ENGINE.InputHandler.keys_down.d)
                player.vx = 0;
            else
                player.move("d")
            break;

        case "d":
            if (!ENGINE.InputHandler.keys_down.a)
                player.vx = 0;
            else
                player.move("a")
            break;

        case "s":
            if (!ENGINE.InputHandler.keys_down.w)
                player.vy = 0
            else
                player.move("w")
            break
    }
}