/**
 * Define The GameEngine
 */
const Game = new _("StoryGame")
Game.Config.TooSmallScreen = document.getElementById("Screen-Too-Small-Element") // Change The TooSmallScreen Element

/**
 * Define The Player
 */
const player = new Player(Game, 10, 10, 50, 50, 100, 300, -300)
Game.addPlayer(player, true)

/**
 * Debug
 */
// const ground = new Square(Game, true, 10, 800, 1000, 50)

const world = new World(levelData, 0)

/**
 * 
 *  Variables
 *  Description: Variables Here
 * 
 */
const MainMenuElementDOM = document.getElementById("MainMenu");
const TitleButtonsDOM = document.getElementById("title-buttons");
const ButtonsInContainerDOM = document.getElementsByClassName("button_container");
const TitleDOM = document.getElementById("title");
const Animations = { /* A List Of All The Animations in a Object */
    title_position: (progress) => {
        TitleButtonsDOM.style.height = progress * 100 + "%"
    },

    opacity_buttons: (progress) => {
        for (var i = 0, max = ButtonsInContainerDOM.length; i < max; i++) {
            ButtonsInContainerDOM[i].style.opacity = progress;
        }
    },

    opacity_buttons_none: (progress) => {
        TitleDOM.style.opacity = -progress + 1

        for (var i = 0, max = ButtonsInContainerDOM.length; i < max; i++) {
            ButtonsInContainerDOM[i].style.opacity = -progress + 1;
        }
    },

    people: (progress) => {
        ctx.globalAlpha = -progress + 1
    }
}

const SaveData = {
    ["LoadinAnimSeen"]: false,
    ["Settings"]: {
        SkipDialogue: false,
        BackgroundColour: "#000000",
        Debug: false,

    },
}

/**
 *
 *   A Object Containing All the Data For All the Levels, Might Move to Its Own File If It Gets Too Big
 *
 */
const _Levels = [
    {
        Name: "Tutorial",
        Data: {
            Objects: {

            },
            Dialogue: [
                
            ]
        }
    },
    {
        Name: "Level 1"

    },
    {
        Name: "Level 2"

    },
    {
        Name: "Level 3"

    },
    {
        Name: "Level 4"

    },
    {
        Name: "Level 5"

    },
]











/**
 * Global Functions
 */

/**
 * 
 * Used in the Animate Function For Returning a timeFraction to the power of 2
 * 
 */
function _Quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

/**
 * @param {*} timing The Time Fraction Used For 
 * @param {*} draw The Function Used For Drawing Each Frame
 * @param {*} duration The Duration Of The Animation
 * @param {*} max The Max Number It Can Reach 0 - 1
 * @returns A Promise used for await only returns a resolve()
 */
 function animate(timing, draw, duration, max) {

    return new Promise((resolve, reject) => {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > max) timeFraction = max;

            // calculate the current animation state
            let progress = timing(timeFraction);

            draw(progress); // draw it

            if (timeFraction < max) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }

        });
    })
}