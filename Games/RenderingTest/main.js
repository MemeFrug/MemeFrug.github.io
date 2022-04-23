let stats;
let i = 100;


//Generate World
function _GenerateWorld() {
    return new Promise((resolve, reject) => {

        //Some Values to change world gen
        const WorldSizeX = 9000

        //Set New World Size
        ENGINE.Config.WorldSize.x = WorldSizeX

        //Create the first block
        
        var lastblock = WORLD.setTile({i: 0, j: 28}, new Square(true, 0, 28 * 50, 50, 50))
        var lastblockPos = {i: 0, j: 28}
        // WORLD.Objects.push(new Square(true, 0, WORLD[i].Size.y - 2000, 300, WORLD[i].Size.y - 2000)) // This is the starting block

        let lastrandomnum = -1

        for (let i = 0; i < WORLD.data[0].length; i++) {
            const upordown = _GetRndInteger(0, 2);
            console.log(upordown);
            if (upordown == 0) { // down
                lastblockPos = {i: lastblockPos.i + 1, j: lastblockPos.j - 1}
                // lastblock = WORLD.setTile(lastblockPos, new Square(true, 0, lastblockPos.j * 50, 50, 50))
            } else if (upordown == 1) { // up
                lastblockPos = {i: lastblockPos.i + 1, j: lastblockPos.j + 1}
                // lastblock = WORLD.setTile(lastblockPos, new Square(true, 0, lastblockPos.j * 50, 50, 50))
            } else if (upordown == 2) { // straight
                lastblockPos = {i: lastblockPos.i + 1, j: lastblockPos.j}
                // lastblock = WORLD.setTile(lastblockPos, new Square(true, 0, lastblockPos.j * 50, 50, 50))
            }

            lastrandomnum = upordown
        }
        resolve()
    })
}

function draw(ctx) {
    const MousePosition = ENGINE.getMousePosition()
    const canvas = ENGINE.canvas.element
    const rect = ENGINE.canvas.element.getBoundingClientRect();
    ctx.scale(0.3, 0.3)
    ctx.fillRect(i += 1, 100, 50, 50)

    let x = 0;
    let y = 1;

    for (let i = 0; i < WORLD.data.length; i++) {
        x = 0;

        for (let j = 0; j < WORLD.data[i].length; j++) {
            if (_rectIntersect(MousePosition.x, MousePosition.y, 0, 0, x, y, 50, 50)) {
                ctx.globalAlpha = 0.4
                ctx.fillRect(x, y, 50, 50)
                ctx.globalAlpha = 1
            }

            ctx.strokeRect(x, y, 50, 50)
            x += 50;
        }

        y += 50;
    }

    // ENGINE.VARIABLES.Cam.x = i -= 10
}


function setupGame() {
    createCanvas(true, Enum.ResizeType.AspectRatio)
    setCanvasBackground("#2fa3b5")

    WORLD.init()
    _GenerateWorld()
}

function setup() {
    stats = new Stats();
    stats.autoLoad()

    document.getElementById("PlayButtonElement").addEventListener("mouseup", () => {
        document.getElementById("MainMenu").style.display = "none"
        setupGame()
    })
}