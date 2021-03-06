let currentLevelIndex = 0
let showingYouDieScreen = false
let showingText = false
let textShowing = ""
let nameShowing = ""


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.controls = true;
    document.body.appendChild(this.sound);
    this.changeSource = function (src) {
        this.sound.src = src;
        console.log(this.sound);
        console.log(this.sound.loop);
    }
    this.changeVolume = (volume) => {
        this.sound.volume = volume;
    }
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
    this.loop = function () {
        this.sound.loop = !this.sound.loop
        console.log(this.sound.loop);
    }
    this.changePlaybackRate = function (rate) {
        this.sound.playbackRate = rate
    }
}

const music = new sound("./assets/background1.mp3")
music.changeVolume(0.5)
music.loop()

function setup() {
    const player = new Player(false, 0, 50, 90, 190)
    const stopWatch = new Stopwatch()
    player.c = "red"

    player.jump_strength = -1250
    player.speed = 600

    ENGINE.Config.cameraFollowSpeed = 10
    ENGINE.Config.gravity = 3500
    ENGINE.Config.sideScroller = true
    ENGINE.Config.cameraScale = 1
    ENGINE.addPlayer(player, true)
    ENGINE.drawLoop.splice(ENGINE.drawLoop.indexOf(player), 1)

    WORLD.blockSize = 100

    STATS.new().autoLoad()

    getElementById("playButton").onclick = async () => {
        getElementById("MainMenu").style.display = "none"
        getElementById("LoadingScreen").style.display = "flex"
        await loadLevel(Levels[currentLevelIndex])
        getElementById("LoadingScreen").style.display = "none"
        createCanvas(true)
        setCanvasBackground("white")
        music.play()
        stopWatch.start()

        await showText("???", "Woah, Where am i?")
        await sleep(100)
        await showText("David", "Oh... I did'nt see you there, my names David!")
        await sleep(100)
        await showText("David", "Whats yours??")
        await sleep(500)
        await showText("David", "....")
        await sleep(100)
        await showText("David", "I have a feeling that we need to reach the top of this tower.")

        hideText();
    }
}

function showText(name, text) {
    return new Promise(async (resolve, reject) => {
        showingText = true
        nameShowing = name
        textShowing = ""
        for (let i = 0; i < text.length; i++) {
            const element = text[i];
            // const SansAudio = new Audio("./Assets/snd_txtsans.wav")
            // SansAudio.volume = 0.3
            // SansAudio.play()
            textShowing += element
            if (element == ",") {
                await sleep(500)
            } else if (element == "?") {
                await sleep(700)
            } else if (element == "!") {
                await sleep(300)
            } else if (element == ".") {
                await sleep(700)
            } else {
                await sleep(40)
            }
        }
        resolve()
    });
}

function hideText() {
    showingText = false
    nameShowing = ""
    textShowing = ""
}

//TODO Add event listeners uwu
function update(deltaTime) {
    const player = ENGINE.GetLocalPlayer()
    if (ENGINE.InputHandler.keys_down.w) player.move('w'); // Move the player
    else player.stopMove("w")
    if (ENGINE.InputHandler.keys_down.a) player.move('a');
    else player.stopMove("a")
    if (ENGINE.InputHandler.keys_down.d) player.move('d');
    else player.stopMove("d")

    // if (ENGINE.InputHandler.keys_down.W) player.move('w'); // Move the player
    // else player.stopMove("w")
    // if (ENGINE.InputHandler.keys_down.A) player.move('a');
    // else player.stopMove("a")
    // if (ENGINE.InputHandler.keys_down.D) player.move('d');
    // else player.stopMove("d")

    if (player.y > Levels[currentLevelIndex].length * WORLD.blockSize - 3000) {
        console.log("u die");
        showingYouDieScreen = true
    }
}

function afterDraw(ctx) {
    const player = ENGINE.GetLocalPlayer()

    //Draw The Player TEST
    player.Draw(ctx)
}

function drawUI(ctx) {
    if (showingYouDieScreen) {
        fillRect(0, 0, ENGINE.Config.nativeWidth, ENGINE.Config.nativeHeight, "black")
        ctx.fillStyle = "red"
        ctx.font = "100px Arial";
        fillText("Wrong Way Idiot.", ENGINE.Config.nativeHeight / 2, ENGINE.Config.nativeHeight / 2)
    }


    if (showingText) {
        ctx.globalAlpha = 0.8
        ctx.fillStyle = "rgba(0, 0, 0, 1)"
        ctx.fillRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.3, ENGINE.Config.nativeWidth / 2, 200)
        // ctx.strokeStyle = "white"
        // ctx.lineWidth = 9
        // ctx.strokeRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.6, ENGINE.Config.nativeWidth / 2, 300)
        ctx.fillStyle = "rgb(216, 216, 216)"
        ctx.font = "40px DTM-Sans"
        fillText(nameShowing + ": ", 550, ENGINE.Config.nativeHeight / 1.2)
        fillText(textShowing, 760, ENGINE.Config.nativeHeight / 1.2, 650, 40)
    }

    // Draw the Timer
    ctx.fillStyle = "black"
    ctx.globalAlpha = 0.5
    ctx.fillRect(70,0, 190, 110)

    ctx.fillStyle = "white"
	ctx.font = "40px Arial"
	ctx.fillText(Time, 80, 90)
}

function deleteLevel() {
    return new Promise((resolve, reject) => {
        ENGINE.chunksDrawLoop = []

        for (let i = 0; i < WORLD.tiles.length; i++) {
            const element = WORLD.tiles[i];
            for (let j = 0; j < element.length; j++) {
                WORLD.deleteTile({ i: i, j: j })
            }
        }

        resolve()
    });
}

function loadLevel(levelData) {
    return new Promise(async (resolve, reject) => {
        console.log("Loading Level");
        WORLD.init(levelData)

        const key = [
            { name: "background", asset: "./assets/backgroundBrick.png", dataValue: 1, noCollision: true },
            { name: "brick", asset: "./assets/brick.png", dataValue: 2 },
            { name: "spike1", asset: "./assets/spike1.png", dataValue: 3, noCollision: true, willKill: true },
            { name: "stairs", asset: "./assets/stairs.png", dataValue: 4 },
            { name: "stairsReversed", asset: "./assets/stairsReversed.png", dataValue: 5 },
            { name: "stairsUpsidedown", asset: "./assets/stairsUpsidedown.png", dataValue: 6 },
            { name: "stairsUpsidedownReversed", asset: "./assets/stairsUpsidedownReversed.png", dataValue: 7 },
        ]

        for (let i = 0; i < key.length; i++) {
            const element = key[i];
            const tileValue = element.dataValue
            const imageSrc = element.asset
            const willKill = element.willKill

            let x = 0;
            let y = 0;
            for (let i = 0; i < WORLD.data.length; i++) {
                x = 0;
                for (let j = 0; j < WORLD.data[i].length; j++) {
                    if (WORLD.data[i][j] == tileValue) {
                        // resolve();
                        let square = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                        await square.setImg(imageSrc)

                        WORLD.tiles[i][j] = square;

                        if (willKill) {
                            square.customCollision = (obj) => {
                                if (obj instanceof Player) {
                                    console.log("yes");
                                }
                            }
                        } else {

                            if (element.noCollision) square.DisableCollision()
                        }
                    }
                    x += WORLD.blockSize;
                }
                y += WORLD.blockSize;
            }
        }

        resolve()
    });
}