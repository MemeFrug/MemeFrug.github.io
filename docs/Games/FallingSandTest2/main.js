//Where We Update and Draw
let lastTime = 0;
function _Update(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Drawing) PlaceElements()

    //Draw Cells
    let Change = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var x = i * cellsize
            var y = j * cellsize

            //Draw Mouse Pos
            if (i == mouseHighlight.i && j == mouseHighlight.j){
                ctx.fillStyle = "black"
                ctx.fillRect(x, y, 5, 5);
            }

            if (Points[i][j].Element == elementType.VOID) continue;
            
            Change = Points[i][j].Update(deltaTime, Change, {i: i, j: j})

            ctx.fillStyle = Points[i][j].c
            ctx.fillRect(x, y, cellsize, cellsize)
        }
    }

    Change.forEach(element => {
        element()
    });

    requestAnimationFrame(_Update)
}

function _Init() {
    for (let i = 0; i < cols; i++) {
        Points[i] = [];
        for (let j = 0; j < rows; j++) {
            Points[i][j] = new Void(i, j)
        }
    }

    _Update()
}

//debug
function StartTest() {
    Points[10][1] = new Sand(10, 1)
    Points[10][2] = new Sand(10, 5)
}

// Start Game
_Init()