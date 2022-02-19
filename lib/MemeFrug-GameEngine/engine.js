/**
 * Main Class Function for The Game
 */
class _ {
    constructor(_nameOfGame = undefined) {
        if (!_nameOfGame || typeof _nameOfGame != "string") throw new Error("Name Of Game Cannot Be undefined, and cannot be type: '" + typeof _nameOfGame + "' Expected 'string'")

        this.functionLoop = [],
        this.drawLoop = [],

        this._Save = {
            saveSet: false,
            saveData: {},
            Save: () => {
                console.log("Saving Game");
                window.localStorage.setItem(_nameOfGame+"SaveData", JSON.stringify(this._Save.saveData))
            },
            SetSave: (SaveFile) => {
                if (this._Save.saveSet) throw new Error("Save File Has Already Been Set, Cannot Set Again")
                if (typeof SaveFile != "object" || Array.isArray(SaveFile)) throw new Error("Save File Is A '" + typeof SaveFile + "' Expected 'object' (If same one could be an Array)");
                this._Save.saveSet = true
                this._Save.saveData = SaveFile
            },
            Load: () => {
                const saveData = window.localStorage.getItem(_nameOfGame+"SaveData")
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
            nativeWidth: 1400,  // the resolution the games is designed to look best in
            nativeHeight: 768,

            timeFraction: 1,
            TooSmallScreen: undefined,
            Playing: true,
            
            WorldSize: {
                x: undefined,
                y: undefined
            }
        }
        //Start The Game
        this._Init = () => {
            //Check if browser supports localStorage
            if (window.localStorage == undefined) {
                while (window.localStorage == undefined) {
                    alert("Your browser does not support localStorage, therefore cannot save, please switch browsers")
                }
            }
            
            this.Config.WorldSize.x = this.Config.nativeWidth
            this.Config.WorldSize.y = this.Config.nativeHeight

            // Start Resizing the canvas
            this.canvas.addEvents()
            this.Update()
        }
        // Draw Each Frame
        this.Draw = () => {
            var nativeWidth = this.Config.nativeWidth;  // the resolution the games is designed to look best in
            var nativeHeight = this.Config.nativeHeight;            

            // the resolution of the device that is being used to play
            var deviceWidth = window.innerWidth;  // please check for browser compatibility
            var deviceHeight = window.innerHeight;

            this.canvas.ctx.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
            this.canvas.ctx.strokeRect(0, 0, nativeWidth, nativeHeight)
            this.canvas.ctx.fillRect(this.Debug.x, 0, 100, 100)
            
            for (let i = 0; i < this.drawLoop.length; i++) {
                const element = this.drawLoop[i];
                if (element.Draw != undefined) element.Draw()
            }
        }
        //Each Frame Update
        this.Update = (deltaTime) => {
            //Check If The Game Is Playing
            if (!this.Config.Playing) { // If Not Then Still Draw But Not Update
                //Draw
                this.Draw()
                requestAnimationFrame(this.Update)
                return
            }

            //Update
            this.Debug.x += 1   

            //Draw
            this.Draw()

            //Get New Frame
            requestAnimationFrame(this.Update)
        }
        // window object
        this.canvas = {

            _IsFocused: true,
            TooSmallEventDispatched: false,

            // Get the canvas element
            element: document.getElementById("canvas"),

            // The Context
            ctx: undefined,

            // resize
            resize: () => {
                this.canvas.ctx = this.canvas.element.getContext("2d");

                var nativeWidth = this.Config.nativeWidth;  // the resolution the games is designed to look best in
                var nativeHeight = this.Config.nativeHeight;           

                // // the resolution of the device that is being used to play
                var deviceWidth = window.innerWidth;
                var deviceHeight = window.innerHeight;

                var scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

                this.canvas.element.style.width = nativeWidth * scaleFitNative + "px";
                this.canvas.element.style.height = nativeHeight * scaleFitNative + "px";
                this.canvas.element.width = nativeWidth * scaleFitNative;
                this.canvas.element.height = nativeHeight * scaleFitNative;

                this.canvas.ctx.setTransform(
                    scaleFitNative,0,
                    0,scaleFitNative,
                    0,0
                );

                if (scaleFitNative < 0.5 && !this.canvas.TooSmallEventDispatched) {
                    this.canvas.element.dispatchEvent(new Event("ShowScreenTooSmallElement"))
                    this.canvas.TooSmallEventDispatched = true
                } else if (this.canvas.TooSmallEventDispatched) {
                    this.canvas.element.dispatchEvent(new Event("HideScreenTooSmallElement"))
                    this.canvas.TooSmallEventDispatched = false
                }

                if(scaleFitNative < 1){
                    this.canvas.ctx.imageSmoothingEnabled = true; // turn it on for low res screens
                } else{
                    this.canvas.ctx.imageSmoothingEnabled = false; // turn it off for high res screens.
                }
            },
            // add the events
            addEvents: () => {
                if (!this.canvas.element) throw new Error("Canvas Is Not Reachable, Try adding a canvas tag with an id of 'canvas'") // If the Canvas element does not exist throw an error

                this.canvas.resize() // Resize the Canvas Now,
                window.addEventListener("resize", this.canvas.resize) // Add A window.resize event to update the canvas respectivley
                window.addEventListener('blur', () => {this.canvas._IsFocused = false}) // Check If the window goes out of focus
                window.addEventListener('focus', () => {this.canvas._IsFocused = true}) // Check If the window goes into focus

                if (this.Config.TooSmallScreen) {
                    this.canvas.element.addEventListener("ShowScreenTooSmallEvent", () => {
                        this.canvas.element.style.display = "block"
                        this.Config.TooSmallScreen.style.display = "block"})
                    this.canvas.element.addEventListener("HideScreenTooSmallElement", () => {
                        this.canvas.element.style.display = "block"
                        this.Config.TooSmallScreen.style.display = "none"})
                }
            }
        }
    }
}




























/**
 * 
 * 
 * Global Variables
 * Helpfull functions
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
 * A Clamp Function That Returns The Value Clamped Between the min and max parameters
 * @param {*} value The Value That You Want To Clamp
 * @param {*} min The Min Number That You Want The Value To Be
 * @param {*} max The Maximum Number that you want the value to reach
 * @returns The Value Clamped (If i needs to be)
 */
function _Clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

























/**
 * Object Class For Objects, note should be extended upon
 */
const _Classes = {
     Object: class {
        constructor(Game, x, y) {
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