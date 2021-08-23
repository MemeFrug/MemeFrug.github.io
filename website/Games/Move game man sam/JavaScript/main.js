let nosave;
let firstplay;
var Time1 = localStorage.getItem("Time")
if (Time1 == null) {
    console.log('No Save File')
    Time1 = 0
    firstplay = true
    nosave = true
} else {
    console.log('found save file')
    nosave = false
    firstplay = false
    document.getElementById("personel best").textContent = Time1 + " Seconds"
}

let ays = false
var aysbut = document.getElementById('reset')
aysbut.addEventListener('click', () => {
    aysbut.textContent = "Are You Sure?"
    if (ays == false) {
        ays = true
    } else {

        localStorage.clear()
        location.reload()
    }
})

//Get Random integehjny
const random = (min = 0, max = 50) => {
    let num = Math.random() * (max - min) + min;

    return Math.round(num);
};

//Variables
let canvas = document.getElementById('gamescreen');
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 1100;
const GAME_HEIGHT = 850;

var startailvl1timer;

//Main Menu
function MainMenu() {

    // Button position and dimensions 
    var buttonX = (GAME_WIDTH / 2) - 250;
    var buttonY = GAME_HEIGHT / 2;
    var buttonW = 500;
    var buttonH = 100;

    // Render button and text
    ctx.fillStyle = 'red'
    ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
    var MainMenuText = new TextCreator((GAME_WIDTH / 2) - 240, (GAME_HEIGHT / 2) - 230, "90px", "Arial", 'red')
    MainMenuText.draw(ctx, "Max's Game")
    var PlayText = new TextCreator(buttonX + 180, buttonY + 80, "80px", "Arial", 'white')
    PlayText.draw(ctx, "Play")

    // Add event listener to canvas element 
    canvas.addEventListener('click', function event2(event) {
        // Control that click event occurred within position of button 
        // NOTE: This assumes canvas is positioned at top left corner  
        if (
            event.x > buttonX &&
            event.x < buttonX + buttonW &&
            event.y > buttonY &&
            event.y < buttonY + buttonH
        ) {
            // Executes if button was clicked! 
            console.log('Button was clicked!');
            whatlevel = 1
            UPDATE2()
            this.removeEventListener('click', event2)
            char = new character(40, 20, GAME_WIDTH, GAME_HEIGHT)
            new inputhandler()
            startailvl1timer = setInterval(AILvl1Update, 50)
        }
    }); 
}
//INputes
let whatlevel = 0;


//Levels

let char;

let lastTime = 0;
let charposx;
let charposy;

let once1 = true; //level1
let once2 = true; //level2
let once3 = true; //ect
let once4 = true;

var Interval;


//AI
function AILvl1Update() {
    levels[1].Enemy.update(char.position.x, char.position.y);
    levels[1].Enemy.collisionDetection(levels[1].wall1)
    levels[1].Enemy.collisionDetection(levels[1].wall2)
}

function AILvl2Update() {
    levels[3].Enemy.update(levels[3].char1.position.x, levels[3].char1.position.y);
    levels[3].Enemy2.update(levels[3].char1.position.x, levels[3].char1.position.y);
    levels[3].Enemy3.update(levels[3].char1.position.x, levels[3].char1.position.y);
    levels[3].Enemy4.update(levels[3].char1.position.x, levels[3].char1.position.y);

    //Ai 1
    levels[3].Enemy.collisionDetection(levels[3].Enemy2)
    levels[3].Enemy.collisionDetection(levels[3].Enemy3)
    levels[3].Enemy.collisionDetection(levels[3].Enemy4)
    //Ai 2
    levels[3].Enemy2.collisionDetection(levels[3].Enemy)
    levels[3].Enemy2.collisionDetection(levels[3].Enemy3)
    levels[3].Enemy2.collisionDetection(levels[3].Enemy4)

    //Ai 3
    levels[3].Enemy3.collisionDetection(levels[3].Enemy)
    levels[3].Enemy3.collisionDetection(levels[3].Enemy2)
    levels[3].Enemy3.collisionDetection(levels[3].Enemy4)
    //Ai 4
    levels[3].Enemy4.collisionDetection(levels[3].Enemy)
    levels[3].Enemy4.collisionDetection(levels[3].Enemy2)
    levels[3].Enemy4.collisionDetection(levels[3].Enemy3)
}
//End of AI Collision and updating

//Funcitons for levels
function TimeLeft() {
    if (whatlevel == 3) {
        levels[3].Timeleft = levels[3].Timeleft - 1
        if (levels[3].Timeleft < 1) {
            clearInterval(Interval)
            whatlevel = 4
            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        }
    }
}

let variabletraps = false;
function Level4Traps() {
    if (whatlevel == 4) {
        if (variabletraps == false) {
            variabletraps = true
            levels[4].trap1.activated = false;
            levels[4].trap2.activated = false;
            levels[4].trap3.activated = false;
            levels[4].trap4.activated = false;
            levels[4].trap5.activated = false;
            levels[4].trap6.activated = false;
            levels[4].trap7.activated = false;
            levels[4].trap8.activated = false;
            levels[4].trap9.activated = false;
            levels[4].trap10.activated = false;
            levels[4].trap11.activated = false;
        } else if (variabletraps == true) {
            variabletraps = false
            levels[4].trap1.activated = true;
            levels[4].trap2.activated = true;
            levels[4].trap3.activated = true;
            levels[4].trap4.activated = true;
            levels[4].trap5.activated = true;
            levels[4].trap6.activated = true;
            levels[4].trap7.activated = true;
            levels[4].trap8.activated = true;
            levels[4].trap9.activated = true;
            levels[4].trap10.activated = true;
            levels[4].trap11.activated = true;
        }
    }
}
//--------------------------------

var Interval = setInterval(TimeLeft, 1000)
var lvl4interval = setInterval(Level4Traps, 1000)
var startailvl3timer;

function UPDATE(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    //Level1
    if (whatlevel == 1) {
        if (once1 == true) {
            once1 = false
            levels[1].Enemy.stop()
        }
        char.update(deltaTime);

        char.collisionDetection(levels[1].wall1)
        char.collisionDetection(levels[1].wall2)

        if (char.iscolliding(levels[1].nextlvl)) {
            whatlevel = 2;
            clearInterval(startailvl1timer)
            delete character.char
            console.log('switch to level 2')
        }
        if (char.iscolliding(levels[1].Enemy)) {
            console.log('respawning')
            levels[1].respawn()
        }

        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        levels[1].draw(ctx, "#000000")
        char.draw(ctx);
        charposx = char.position.x
        charposy = char.position.y
    }

    //Level 2
    if (whatlevel == 2) {
        levels[2].char1.update(deltaTime)
        if (once2 == true) {
            levels[2].char1.stop()
            //setInterval(levels[1].update1(), 2000)
            //setInterval(levels[1].update2(), 4000)
            once2 = false
        }
        levels[2].char1.collisionDetection(levels[2].wall1)
        levels[2].char1.collisionDetection(levels[2].wall2)
        levels[2].char1.collisionDetection(levels[2].laser1)
        if (levels[2].char1.iscolliding(levels[2].laser2)) {
            levels[2].respawn()
        }
        if (levels[2].char1.iscolliding(levels[2].laser3)) {
            levels[2].respawn()
        }
        if (levels[2].char1.iscolliding(levels[2].laser4)) {
            levels[2].respawn()
        }
        if (levels[2].char1.iscolliding(levels[2].laser5)) {
            levels[2].respawn()
        }

        if (levels[2].char1.iscolliding(levels[2].nextlvl)) {
            whatlevel = 3;
            console.log('switched to level 3')
        }

        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        levels[2].draw(ctx, "#000000", "#FF0000")
        charposx = levels[2].char1.position.x
        charposy = levels[2].char1.position.y
    }

    //Level 3
    if (whatlevel == 3) {
        levels[3].char1.update(deltaTime)
        if (once3 == true) {
            levels[3].char1.stop()
            levels[3].Enemy.stop()
            startailvl3timer = setInterval(AILvl2Update, 100)
            once3 = false
        }

        if (levels[3].char1.iscolliding(levels[3].Enemy)) {
            console.log('respawning')
            levels[3].respawn()
        } if (levels[3].char1.iscolliding(levels[3].Enemy2)) {
            console.log('respawning')
            levels[3].respawn()
        } if (levels[3].char1.iscolliding(levels[3].Enemy3)) {
            console.log('respawning')
            levels[3].respawn()
        } if (levels[3].char1.iscolliding(levels[3].Enemy4)) {
            console.log('respawning')
            levels[3].respawn()
        }

        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        levels[3].draw(ctx, "#000000")
        levels[3].update() //more collision code in here
    }

    //Level 4
    if (whatlevel == 4) {
        levels[4].char1.update(deltaTime)
        if (once4 == true) {
            levels[4].char1.stop()
            clearInterval(startailvl3timer)
            once4 = false
        }

        levels[4].char1.collisionDetection(levels[4].wall2)
        levels[4].char1.collisionDetection(levels[4].wall1)

        //Clears entire screen
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        levels[4].draw(ctx, "#000000" /*Black*/)
        levels[4].update()
        charposx = levels[4].char1.position.x
        charposy = levels[4].char1.position.y
    }

    requestAnimationFrame(UPDATE)
}

MainMenu()
UPDATE();