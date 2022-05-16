const player = new Player(false, 0, 10, 150, 280, 100, 900, -1000);
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

const RemoveUIButton = getElementById("Hide UI");
const UIElement = getElementById("UI")

const UIElement2 = getElementById("UI_2")

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
let backgroundBlock = undefined
// let playerSpawnPosition = { x: 0, y: 0 }

let GameChosen = undefined

let SelectedBlockAsset = undefined

const GameSettings = {
    playerSpawn: { i: 0, j: 0 },
    playerExit: { i: 1, j: 0 },
    worldSize: { i: 50, j: 20 },
    tileSize: { w: 50, h: 50 }
}

// function ChangePlayerSpawnPos(position) { //DEBUG
//     if (position) {
//         if (position.x && position.y) {
//             playerSpawnPosition = position
//         } else {
//             console.error("Position.x and y does not Exist");
//         }
//     } else {
//         console.error("Position Does not Exist");
//     }
// }

// ChangePlayerSpawnPos({ x: 10, y: 20 })

function setup() {
    stats = STATS.new()
    stats.autoLoad()

    document.oncontextmenu = () => false;

    addEngineEvent(Enum.Events.Pressed.LeftClick, () => {
        Drawing = true
        Deleting = false
    })
    addEngineEvent(Enum.Events.Pressed.RightClick, () => {
        Drawing = false
        Deleting = true
    })
    addEngineEvent(Enum.Events.Released.LeftClick, () => {
        Drawing = false
        Deleting = false
    })
    addEngineEvent(Enum.Events.Released.RightClick, () => {
        Drawing = false
        Deleting = false
    })

    WORLD.blockSize = 100
    ENGINE.Config.chunkSize = 400

    const LocalSaveStorage = JSON.parse(localStorage.getItem(GameName + "Levels"))
    const LevelsElement = getElementById("Levels")
    if (LocalSaveStorage) {
        console.log("Found Save File");
        for (let i = 0; i < LocalSaveStorage.length; i++) {
            const element = LocalSaveStorage[i];
            const LevelContainer = document.createElement("div")
            const LevelBox = document.createElement("div")
            const LevelNameElement = document.createElement("p")
            const GameNameElement = document.createElement("p")

            LevelContainer.className = "Level_Container"
            LevelBox.className = "Level"
            LevelBox.id = element.name
            LevelNameElement.className = "Level_Name"
            LevelNameElement.innerHTML = element.name
            GameNameElement.className = "Level_Name"
            GameNameElement.style.fontSize = "25px"
            GameNameElement.innerHTML = element.usedGame
            LevelBox.appendChild(LevelNameElement)
            LevelBox.appendChild(GameNameElement)
            LevelContainer.appendChild(LevelBox)
            LevelsElement.appendChild(LevelContainer)

            LevelContainer.addEventListener("mouseup", async () => {
                const ElementData = element.data
                const MainMenuElement = getElementById("MainMenu")
                LevelName = element.name
                GameChosen = element.usedGame
                MainMenuElement.style.display = "none"
                levelData = ElementData
                WORLD.data = levelData
                WORLD.init(levelData)
                
                document.getElementById("Loading").style.display = "flex"
                if (element.usedGame == "Ascent") {
                    await ImportAssets(ASCENTASSETS)
                    await LoadWorld(ASCENTASSETS)
                    await SetBackgroundBlock(ASCENTASSETS) // Issue
                }
                StartGame()
                document.getElementById("Loading").style.display = "none"
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
    if (ENGINE.InputHandler.keys_down.w) player.move('w'); // Move the player
    else player.stopMove("w")
    if (ENGINE.InputHandler.keys_down.a) player.move('a');
    else player.stopMove("a")
    if (ENGINE.InputHandler.keys_down.d) player.move('d');
    else player.stopMove("d")
}

function afterDraw(ctx) {
    const MousePosition = ENGINE.getMousePosition()

    ctx.fillStyle = "black"

    let x = 0;
    let y = 1;

    for (let i = 0; i < WORLD.data.length; i++) {
        x = 0;
        for (let j = 0; j < WORLD.data[i].length; j++) {
            if (rectIntersect(MousePosition.x, MousePosition.y, 0, 0, x, y, WORLD.blockSize, WORLD.blockSize)) {
                ctx.globalAlpha = 0.4
                fillRect(x, y, WORLD.blockSize, WORLD.blockSize)
                ctx.globalAlpha = 1

                if (Drawing && WORLD.checkTile({i:i, j:j}).img != SelectedBlockAsset.img) {

                    const element = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                    element.setImg(SelectedBlockAsset.img, true)

                    if (SelectedBlockAsset.noCollision) element.DisableCollision()
                    
                    WORLD.data[i][j] = SelectedBlockAsset.tileData
                    WORLD.setTile({ i: i, j: j }, element);

                    
                    window.onbeforeunload = function() {
                        return true;
                    };
                }
                else if (Deleting && WORLD.checkTile({i:i, j:j}).img != backgroundBlock.img) {
                    if (!backgroundBlock ){
                        WORLD.data[i][j] = 0
                        WORLD.deleteTile({ i: i, j: j })
                        return;
                    }
                    
                    const element = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                    element.setImg(backgroundBlock.img, true)
                    element.DisableCollision()
                    WORLD.data[i][j] = backgroundBlock.tileData
                    WORLD.setTile({ i: i, j: j }, element);

                    
                    window.onbeforeunload = function() {
                        return true;
                    };
                }
            }

            strokeRect(x, y, WORLD.blockSize, WORLD.blockSize)
            x += WORLD.blockSize;
        }
        y += WORLD.blockSize;
    }


    // Draw where player gets spawn
    // ctx.globalAlpha = 0.5
    // fillRect(playerSpawnPosition.x, playerSpawnPosition.y, 50, 50, "green")
    // ctx.globalAlpha = 1


    strokeRect(0, 0, WORLD.size.w, WORLD.size.h)

    //Draw The Player TEST
    player.Draw(ctx)

    fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15, "black")
}














function StartGame() {
    UIElement.style.display = "flex"
    UIElement2.style.display = "flex"
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


                    //Add here if new assets/game

                    if (GameChosen == "Ascent") {
                        regenerate(ASCENTASSETS)
                        LoadWorld(ASCENTASSETS)
                    }


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





SubmitLevelName.addEventListener("mouseup", () => {
    if (SaveNameInput.value == "") {
        console.error("SaveNameInput Cannot Be Nothing");
        SaveNameErrorElement.innerText = "Error: SaveNameInput Cannot Be Nothing"
        SaveNameErrorElement.style.display = "block"
    } else {
        SaveNameErrorElement.style.display = "none"
        NameOfLevelContainer.style.display = "none"
        LevelName = SaveNameInput.value

        GameAssetsContainer.style.display = "flex"
    }
})






/**
    Save The Level Locally onto Local Storage
*/
LocalSaveButton.addEventListener("mouseup", () => {
    window.onbeforeunload = null;
    
    const LocalSaveStorage = localStorage.getItem(GameName + "Levels")

    const createNewSave = () => {
        console.log("Creating Save");
        LocalSaveLevels.push({ name: LevelName, data: WORLD.data, usedGame: GameChosen, Settings: GameSettings })
        localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
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
                break;
            }
        }
        if (FoundSave) {
            console.log(LocalSaveLevels[SaveIndex]);
            LocalSaveLevels[SaveIndex].data = WORLD.data
            localStorage.setItem(GameName + "Levels", JSON.stringify(LocalSaveLevels))
        } else {
            createNewSave()
        }
    }
    else {
        createNewSave()
    }
})





/**
    Download the level into a .level that has an array with 0, and 1s
*/
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







/**
    To move the UI out of the way
*/
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


function regenerate(key) {
    return new Promise(async (resolve) => {
        for (let i = 0; i < WORLD.tiles.length; i++) {
            const element = WORLD.tiles[i];
            for (let j = 0; j < element.length; j++) {
                if (WORLD.tiles[i][j]) {
                    WORLD.tiles[i][j].Destroy()
                    WORLD.tiles[i][j] = undefined
                }
            }
        }
        WORLD.init()
        for (let i = 0; i < key.length; i++) {
            const element = key[i];
            const imageSrc = element.asset
            const dataValue = element.dataValue
            let x = 0;
            let y = 0;

            for (let i = 0; i < WORLD.data.length; i++) {
                x = 0;
                for (let j = 0; j < WORLD.data[i].length; j++) {
                    const elementData = WORLD.data[i][j]
                    if (elementData != dataValue && !(element.name == "background" && elementData == 0)) {
                        continue;
                    }

                    let square = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                    await square.setImg(imageSrc)
                    if (element.noCollision) square.DisableCollision()

                    WORLD.setTile({i:i,j:j}, square)
                    WORLD.data[i][j] = element.dataValue
                    x += WORLD.blockSize;
                }
                y += WORLD.blockSize;
            }
        }

        alert("Atm you should save, and refresh the page and go back into the level, cuz atm its broken if u dont do that")
        resolve()
    });
}

function SetBackgroundBlock(key) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < key.length; i++) {
            const element = key[i];
            const imageSrc = element.asset
            let x = 0;
            let y = 0;

            if (element.name != "background") {
                continue;
            }

            for (let i = 0; i < WORLD.data.length; i++) {
                x = 0;
                for (let j = 0; j < WORLD.data[i].length; j++) {
                    let square = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                    await square.setImg(imageSrc)
                    square.DisableCollision()

                    WORLD.setTile({i:i,j:j}, square)
                    WORLD.data[i][j] = element.dataValue
                    x += WORLD.blockSize;
                }
                y += WORLD.blockSize;
            }
        }

        resolve()
    });
}





function LoadWorld(key) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < key.length; i++) {
            const element = key[i];
            const tileValue = element.dataValue
            const imageSrc = element.asset

            let x = 0;
            let y = 0;
            for (let i = 0; i < WORLD.data.length; i++) {
                x = 0;
                for (let j = 0; j < WORLD.data[i].length; j++) {
                    if (WORLD.data[i][j] == tileValue) {
                        let square = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                        await square.setImg(imageSrc)

                        if (element.noCollision) square.DisableCollision()

                        WORLD.tiles[i][j] = square;
                    }
                    x += WORLD.blockSize;
                }
                y += WORLD.blockSize;
            }
        }

        resolve()
    });
}







//Load the assets into the side browser thingy
function ImportAssets(assets) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < assets.length; i++) {
            const element = assets[i];
            loadImage(element.asset).then(image => {
                const container = createElement("div")
                container.className = "Button_container"
                const containerButton = createElement("div")
                containerButton.className = "Button"
                const containerButtonIcon = createElement("img")
                containerButtonIcon.src = element.asset

                containerButton.appendChild(containerButtonIcon)
                container.appendChild(containerButton)
                getElementById("BlocksChoose").appendChild(container)

                SelectedBlockAsset = { tileData: element.dataValue, img: image, noCollision: element.noCollision }
                
                if (element.name == "background") backgroundBlock = { img: image, tileData: element.dataValue }

                container.addEventListener("mouseup", () => {
                    SelectedBlockAsset = { tileData: element.dataValue, img: image, noCollision: element.noCollision }
                })
            })
        }

        resolve()
    });
}




// Selecting The Game for assets to use
GameAssetsAscentElement.addEventListener("mouseup", async () => {
    GameAssetsContainer.style.display = "none"
    GameChosen = "Ascent"
    WORLD.init()
    document.getElementById("Loading").style.display = "flex"
    await ImportAssets(ASCENTASSETS)
    await SetBackgroundBlock(ASCENTASSETS)
    document.getElementById("Loading").style.display = "none"
    StartGame()
})





getElementById("widthOfWorld").addEventListener("blur", async () => {
    const element = getElementById("widthOfWorld")
    if (element.value <= 1) element.value = 1

    await WORLD.ChangeWorldSize(element.value, getElementById("heightOfWorld").value)
    if (GameChosen == "Ascent") regenerate(ASCENTASSETS)

    
    ENGINE.generateChunks() 
})

getElementById("heightOfWorld").addEventListener("blur", async () => {
    const element = getElementById("heightOfWorld")
    if (element.value <= 1) element.value = 1

    await WORLD.ChangeWorldSize(getElementById("widthOfWorld").value, element.value);
    if (GameChosen == "Ascent") regenerate(ASCENTASSETS)
    
    ENGINE.generateChunks()
})











function stoppoop() {
    ENGINE.Config.g = 2500
    player.gravityMax = 10000
    player.move = (movement) => {
        switch (movement) { // Make a switch statement
            case "w":
                if (player.isOnGround) { // Check if on the ground
                    player.vy = player.jump_strength // set the Vertical velocity to jump
                    player.isOnGround = false
                }
                break;

            case "a":
                player.vx = -player.speed // Make the speed negative to it goes the opposite way (-x)
                break;

            case "d":
                player.vx = player.speed // Make the x velocity positive of the speed so it goes right
                break;
        }
    }

    player.stopMove = (movement) => {
        switch (movement) {
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
        }
    }
}






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