/**
 * Main Class Function for The Game
 */
const Game = new class Game {
    constructor() {
        this.functionLoop = [],

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
                    if (typeof (Variable) !== "string") {
                        console.error("Variable Parameter is Not A String");
                        return false
                    }

                    _Save.saveData[Variable] = Value
                    return true
                }
                if (typeof (Variable) !== "string") {
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
            x: 1
        }
        // Config
        this.Config = {

        }
        //Start The Game
        this._Init = () => {
            //Check if browser supports localStorage
            if (window.localStorage == undefined) {
                while (window.localStorage == undefined) {
                    alert("Your browser does not support localStorage, therefore cannot save, please switch browsers")
                }
            }

            // Start Resizing the canvas
            this.canvas.addEvents()
            this.Update()
        }
        // Draw Each Frame
        this.Draw = () => {
            const nativeWidth = 1920;  // the resolution the games is designed to look best in
            const nativeHeight = 1080;

            // the resolution of the device that is being used to play
            var deviceWidth = window.innerWidth;  // please check for browser compatibility
            var deviceHeight = window.innerHeight;

            var scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

            var deviceDisplayWidth = deviceWidth/scaleFitNative;
            var deviceDisplayHeight = deviceHeight/scaleFitNative;

            this.canvas.ctx.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
            this.canvas.ctx.strokeRect(0, 0, deviceDisplayWidth, deviceDisplayHeight)
            
            this.Debug.x += 1   
        }
        //Each Frame Update
        this.Update = (deltaTime) => {
            // const scale = this.Config.scale

            //Update


            //Draw
            this.Draw()

            //Draw
            this.Draw(this.canvas.ctx);

            //Get New Frame
            requestAnimationFrame(this.Update)
        }
        // window object
        this.canvas = {

            _IsFocused: true,

            // Get the canvas element
            element: document.getElementById("canvas"),

            // The Context
            ctx: undefined,

            // resize
            resize: () => {
                const nativeWidth = 1920;  // the resolution the games is designed to look best in
                const nativeHeight = 1080;

                // the resolution of the device that is being used to play
                var deviceWidth = window.innerWidth;  // please check for browser compatibility
                var deviceHeight = window.innerHeight;

                var scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

                // this.canvas.element.width = window.innerWidth;
                // this.canvas.element.height = 16 * this.canvas.element.width / 9;
                this.canvas.ctx = this.canvas.element.getContext("2d");
                this.canvas.element.style.width = deviceWidth + "px";
                this.canvas.element.style.height = deviceHeight + "px";
                this.canvas.element.width = deviceWidth;
                this.canvas.element.height = deviceHeight;

                console.log("Resizing");

                // ctx is the canvas 2d context 
                this.canvas.ctx.setTransform(
                    scaleFitNative,0, // or use scaleFillNative 
                    0,scaleFitNative,
                    0,0
                );

                if(scaleFitNative < 1){
                    this.canvas.ctx.imageSmoothingEnabled = true; // turn it on for low res screens
                }else{
                    this.canvas.ctx.imageSmoothingEnabled = false; // turn it off for high res screens.
                }
            },
            // add the resize event
            addEvents: () => {
                if (!this.canvas.element) { // Check if canvas exists
                    throw new Error("Canvas Is Not Reachable, Try adding a canvas tag with an id of 'canvas'")
                }

                this.canvas.resize() // Resize the Canvas Now,
                window.addEventListener("resize", this.canvas.resize) // Add A window.resize event to update the canvas respectivley

                /**
                 * Check When The Window is being focussed and not, and change a variable depending on that
                 */
                this.canvas.onblur = () => {
                    _IsFocused = false;
                }
                this.canvas.onfocus = () => {
                    _IsFocused = true;
                }
            }
        }
    }
}

/**
 * 
 * 
 * Global Variables
 * 
 *
 */

/**
 * 
 * @param {*} min The Min
 * @param {*} max The Max
 * @returns A Random Number Between the Min And the Max
 */
function _GetRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Object Class For Objects, note should be extended upon
 */
const _Classes = {
     Object: class {
        constructor(x, y) {
            this.x = x
            this.y = y
    
            //Loop
            this.fIndex = Game.functionLoop.length
            Game.functionLoop.push(this)
        }
    
        beforeDestroy() {
    
        }
    
        Destroy() {
            //Do HardCode First
            this.beforeDestroy()
    
            //Do Custom Before Destroy Code
            this.dispatchEvent(new Event("beforeDestroy"))
        }
    
        Update() {
            //Do Custom Before Loop Code
            this.dispatchEvent(new Event("beforeUpdate"))
    
            //Update Code
    
    
            //Do Custom Before Loop Code
            this.dispatchEvent(new Event("afterUpdate"))
        }
    }
} 