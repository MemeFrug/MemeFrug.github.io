var amountoftime = new TextCreator(800 /*GAME_WIDTH - 300*/, 40, "40px", "Arial", 'black');

let textval = 0
let onl = true;
let onl1 = true;
let notdead = true
var Update2Interval;

function UPDATE1() {
    if (notdead == true) {
        textval = textval + 1
    }
}

function UPDATE2() {
    if (onl == true) {
        Update2Interval = setInterval(UPDATE1, 1000)
        onl = false
    }
    if (onl1 == true && textval >= 100) {
        onl1 = false
        amountoftime.x = GAME_WIDTH - 350
    }
    amountoftime.draw(ctx, "Time: " + textval.toString() + " Seconds")
    requestAnimationFrame(UPDATE2)
}