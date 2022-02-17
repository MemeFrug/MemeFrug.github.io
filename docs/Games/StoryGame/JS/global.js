/**
 * Main Class Function for The Game
 */
const Game = new class Game {
    constructor() {
        this._Save = {
            saveData: {
                // ["LoadinAnimSeen"]: false,
            },
            Save: () => {
                window.localStorage.setItem("StoryGameSaveData", JSON.stringify(this._Save.saveData))
            },
            Load: () => {
                const saveData = window.localStorage.getItem("StoryGameSaveData")
                if (!saveData) {
                    console.log("No Save Found, Creating a new save");
                    this._Save.Save()
                    this._Save.Load()
                } else {
                    console.log("Save Found, Overiting Save Object");
                    this._Save.saveData = JSON.parse(saveData)
                }
            },
            UpdateSave: (Variable, Value, CreateNew) => {
                if (CreateNew) {
                    if (typeof(Variable) !== "string"){
                        console.error("Variable Parameter is Not A String");
                        return false
                    }
        
                    _Save.saveData[Variable] = Value
                    return true
                }
                if (typeof(Variable) !== "string"){
                    console.error("Variable Parameter is Not A String");
                    return false
                }
                if (_Save.saveData[Variable] == undefined) {
                    console.error("Variable Parameter Does not exist in saveData");
                    return false
                }
                this._Save.saveData[Variable] = Value
                return true
            }
        }
        //Debug
        this.Debug = {
    
        }
        // Config
        this.Config = {
            //Resolution
            scale: 1
    
        }
        //Start The Game
        this.Start = () => {
            //Check if browser supports localStorage
            if (window.localStorage == undefined) {
                while (window.localStorage == undefined) {
                    alert("Your browser does not support localStorage, therefore cannot save, please switch browsers")
                }
            }
    
            // Start Resizing the canvas
            this.canvas.addResizeEvent()
            this.Update()
        }
        // Draw Each Frame
        this.Draw = () => {
    
            this.canvas.ctx.clearRect(0,0,this.canvas.element.width, this.canvas.element.height)
            this.canvas.ctx.fillRect(20,20,100,100)
        }
        //Each Frame Update
        this.Update = (deltaTime) => {
            const scale = this.Config.scale
    
            //Update
            
    
            //Draw
            this.Draw()
    
            // context.scale will scale the original drawings to fit on
            // the newly resized canvas
            this.canvas.ctx.scale(scale,scale);
    
            //Draw
            this.Draw(this.canvas.ctx);
    
            // always clean up! Reverse the scale
            this.canvas.ctx.scale(scale,scale);
    
            //Get New Frame
            requestAnimationFrame(this.Update)
        }
        // window object
        this.canvas = {
            // Get the canvas element
            element: document.getElementById("canvas"),
            
            // The Context
            ctx: undefined,
    
            // resize
            resize: () => {
                this.canvas.element.width = window.innerWidth;
                this.canvas.element.height = 16 * this.canvas.element.width / 9;
                this.canvas.ctx = this.canvas.element.getContext("2d");
                console.log("Resizing");
            },
            // add the resize event
            addResizeEvent: () => {
                if (!this.canvas.element) {
                    throw new Error("Canvas Is Not Reachable, Try adding a canvas tag with an id of 'canvas'")
                }
    
                this.canvas.resize()
                window.addEventListener("resize", this.canvas.resize)
                
            }
        }
    }
}

//-----------------------












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

let _IsFocused = true; // A Variable Used To See if Is In focussed













/**
 *
 *   Levels Global
 *   Description: A Object Containing All the Data For All the Levels, Might Move to Its Own File If It Gets Too Big
 *
 */
_Levels = [
    {
        Name: "Tutorial",
        Data: {
            Objects: {

            },
            Dialogue: [
                new Dialogue("John", "Text", 1000),
                new Dialogue("Me", "Text", 100) // Like so
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
 * 
 * @param {*} min The Min
 * @param {*} max The Max
 * @returns A Random Number Between the Min And the Max
 */
function GetRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
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