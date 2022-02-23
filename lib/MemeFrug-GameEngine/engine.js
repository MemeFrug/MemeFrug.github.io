console.log("%c Do 'Help()' For Commands","color: yellow; font-family:monospace; font-size: 20px");
let Help = function () {console.log("There is No Help Function Yet");}

/**
 * Main Class Function for The Game
 */
class _ {
    constructor(_nameOfGame = undefined) {
        // Check If NameOfGame Variable Exists And Is Defined, Used For Saving
        if (!_nameOfGame || typeof _nameOfGame != "string") throw new Error("Name Of Game Cannot Be undefined, and cannot be type: '" + typeof _nameOfGame + "' Expected 'string'")

        this.functionLoop = [], // The Update Loop, Everything in here gets their .Update() Function Called
        this.drawLoop = [], // The Draw Loop, Everything In Here Gets their .Draw() Function Called

        this.gameObjects = [], // All of the Current Objects In the Sceen

        this._Save = { // The Save Object
            saveSet: false, // Check If Setting The Save Is Already Done
            saveData: {}, // The Save Data Used For Saving, And Loading The Save
            /**
             * Calling This Saves The saveData variable into Local Storage
             */
            Save: () => {
                console.log("Saving Game");
                window.localStorage.setItem(_nameOfGame+"SaveData", JSON.stringify(this._Save.saveData)) // Set The LocalStorage Of The Current Game to the current Save Data
            },
            /**
             * Used For Setting The SaveFile Manually and Can Only Be Called Once.
             * @param {*} SaveFile The Save File (Should be a object like: {})
             */
            SetSave: (SaveFile) => {
                if (this._Save.saveSet) throw new Error("Save File Has Already Been Set, Cannot Set Again") // If saveSet Variable Has Already Been Set
                // Check if the parameter is a object and not a array, if not then throw a error
                if (typeof SaveFile != "object" || Array.isArray(SaveFile)) throw new Error("Save File Is A '" + typeof SaveFile + "' Expected 'object' (If same one could be an Array)");
                this._Save.saveSet = true // Set The Variable to true so this function cannot be called again
                this._Save.saveData = SaveFile // Set The Save Data To the Parameter
            },
            /**
             * Gets The LocalStorage Data, If It Finds Data, It sets The saveData Variable to it, otherwise it cannot find the data, 
             * it Calls this._Save.Save() and trys to load again
             * @returns false if there is no save file
             * @returns true if it Succeeds and finds a safeFile from localStorage and sets the saveData to it
             */
            Load: () => {
                const saveData = window.localStorage.getItem(_nameOfGame+"SaveData") // Gets the save file from localStorage
                if (!saveData) { // If The save file from localStorage Does not exists then return false
                    console.log("No Save File Found");
                    return false
                } else { // If the save file exists from localStorage then,
                    console.log("Save Found, Overiting Save Object");
                    this._Save.saveData = JSON.parse(saveData) // Set the Save Data to it, Parsing It To turn it into a object, not a string
                    return true // Return true
                }
            },
            /**
             * A Function To Update A Specific Variable
             * @param {*} Variable The Specific Variable To Change
             * @param {*} Value The Value To Change It Too
             * @param {*} CreateNew A True Or False, If It Cannot Find The Variable, It Would Create a new one
             * @returns true if successfull
             * @returns false if not successfull
             */
            UpdateSave: (Variable, Value, CreateNew) => {
                if (CreateNew) { // If the CreateNew parameter is true then,
                    if (typeof Variable !== "string") { // Check if The Variable to change is a string
                        console.error("Variable Parameter is Not A String");
                        return false // Return False as it failed
                    }

                    this._Save.saveData[Variable] = Value // If the variable to change is a string, then set the variable in save data to true, regardless if its there or not
                    return true // Return True, meaning it was successfull
                }
                if (typeof Variable !== "string") { // If the CreateNew parameter is false, check if the Variable is a string
                    console.error("Variable Parameter is Not A String");
                    return false // return false meaning it failed
                }
                if (this._Save.saveData[Variable] == undefined) { // If the Variable in saveData object Does not exists
                    console.error("Variable Parameter Does not exist in saveData");
                    return false // return false meaning it failed
                }
                this._Save.saveData[Variable] = Value // Set the Variable in saveData to the value 
                return true // return true as it succeeded
            }
        }
        // Debug
        this.Debug = {
            WhatMaxIsSayingIsTrue: () => {console.error("Idiot.");} // Idiot.
        }
        // Config
        this.Config = {
            nativeWidth: 1920,  // The Resolution Set
            nativeHeight: 1080,

            TooSmallScreen: undefined, // An Element, if defined would appear if the screen gets too small

            WorldSize: { // The Size of The World
                x: 1920,
                y: 1080
            }
        }

        //The Variables
        this._ = {
            Playing: true, // If The GameEngine is updating (Can still Draw)
            oldTimeStamp: 0, // Used For DeltaTime
        }

        /**
         * Call This Function To Start The Game, It calls the Update Loop, adds the canvas events, checks for browser support, and shows the canvas.
         */
        this._Init = () => {
            if (window.localStorage == undefined) { // If The Browser Does not Support localStorage
                alert("Your browser does not support localStorage, therefore cannot save, please switch browsers") // Alert The User
                throw new Error("LocalStorage Does Not Exist On this browser please switch Browser") // Throw An Error (Also Stops The Current Code From Playing)
            }

            this.canvas.element.style.display = "block" // Show The Canvas
            this.canvas.element.innerHTML = "<h1>Your Browser Cannot Handle HTML5, Please Switch To a Different Browser</h2>"

            this.canvas.addEvents() // Add The Necessary Events Onto The Canvas
            // Request an animation frame for the first time
            // The gameLoop() function will be called as a callback of this request
            window.requestAnimationFrame((timeStamp) => {this.Update(timeStamp)});
        }

        this.detectCollisions = () => {
            let obj1;
            let obj2;
            
            const gameObjects = this.gameObjects

            // Reset collision state of all objects
            for (let i = 0; i < gameObjects.length; i++) {
                gameObjects[i].isColliding = false;
            }

            // Start checking for collisions
            for (let i = 0; i < gameObjects.length; i++)
            {
                obj1 = gameObjects[i];
                for (let j = i + 1; j < gameObjects.length; j++)
                {
                    obj2 = gameObjects[j];
                    
                    if(obj1 instanceof Square && obj2 instanceof Square) {
                        // Compare object1 with object2
                        if (_rectIntersect(obj1.x, obj1.y, obj1.w, obj1.h, obj2.x, obj2.y, obj2.w, obj2.h)) {
                            obj1.isColliding = true;
                            obj2.isColliding = true;
        
                            let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                            let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                            let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                            let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                            // Calculate speed of the detected collision
                            let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
        
                            // Apply restitution to the speed
                            speed *= Math.min(obj1.restitution, obj2.restitution);
        
                            if (speed < 0) {
                                break;
                            }
        
                            let impulse = 2 * speed / (obj1.mass + obj2.mass);
                            obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                            obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                            obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                            obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                        }
                    // }else if (obj1 instanceof Circle && obj2 instanceof Circle) {
                    //     if (_circleIntersect(obj1.x,obj1.y,obj1.r,obj2.x,obj2.y,obj2.r)) {
                    //         obj1.isColliding = true;
                    //         obj2.isColliding = true;

                    //         let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    //         let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    //         let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    //         let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};

                    //         // Calculate speed of the detected collision
                    //         let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    //         // Apply restitution to the speed
                    //         speed *= Math.min(obj1.restitution, obj2.restitution);

                    //         if (speed < 0){
                    //             break
                    //         }

                    //         let impulse = 2 * speed / (obj1.mass + obj2.mass); // Mass into the equasion aswell
                    //         obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    //         obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    //         obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    //         obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                    //     }
                    }
                }
            }
        }

        /**
         * Function To Draw Each Frame, Should Get Called In The Update Loop
         */
        this.Draw = () => {
            var nativeWidth = this.Config.nativeWidth; // Width Of The Viewport
            var nativeHeight = this.Config.nativeHeight; // Height Of The Viewport          

            const ctx = this.canvas.ctx

            ctx.clearRect(0, 0, nativeWidth, nativeHeight) // Clear The Screen For The Next Frame
            
            // ctx.fillRect(10, 10, 50, 50);

            for (let i = 0; i < this.drawLoop.length; i++) { // Loop Through All Of The Functions In Draw Loop
                const element = this.drawLoop[i];
                if (element.Draw != undefined) element.Draw(ctx) // If the Index has a draw function, run it
            }
        }
        /**
         * An Update Function That Get Called Every Frame
         * @param {*} deltaTime The Time Between Each Frame1
         */
        this.Update = (timeStamp) => {
            const deltaTime = (timeStamp - this._.oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
            this._.oldTimeStamp = timeStamp; // Update oldTimeStamp To the new one

            if (!deltaTime) {
                console.warn("deltaTime Was NaN");
                requestAnimationFrame(this.Update); // Call The Update Function
                return; // Stop This Loop
            }

            //Check If The Game Is Playing
            if (!this._.Playing) { // If Not Playing Then Dont Update, But Still Draw
                // Draw Function, Used For Drawing All Elements Onto the canvas
                this.Draw()
                requestAnimationFrame(this.Update) //Get New Frame and call this.Update Again
                return
            }

            for (let i = 0; i < this.functionLoop.length; i++) { //For Every Single Item In the FunctionLoop
                const element = this.functionLoop[i];
                if (element.Update != undefined) element.Update(deltaTime) // If The Update Function Exists, Call it
            }

            this.Draw() // Draw Function, Used For Drawing All Elements Onto the canvas

            requestAnimationFrame(this.Update) //Get New Frame and call this.Update Again
        }
        // window object
        this.canvas = {

            // A Variable That Gets Updated If The Window Is In Focus Or Not
            _IsFocused: true,

            // To Check If A Event Has Been Dispatch, To Make Sure The Event Does Not Get Spammed
            TooSmallEventDispatched: false,

            // A Variable For Other Parts of the code to use to get the size of the 'viewport' or window
            SizeOfViewport: {
                w: undefined,
                h: undefined
            },

            // The Canvas Element
            element: document.getElementById("canvas"),

            // The Context Of The Canvas Current Undefined and gets updated in this.canvas.resize
            ctx: undefined,

            /**
             * Function That Gets Called Whenever The Window Gets Resized, It Updates The Canvas Size and scale
             */
            resize: () => {
                // A Config Varaible Assigned to A Local Variable For Easier Typing
                const nativeWidth = this.Config.nativeWidth; 
                const nativeHeight = this.Config.nativeHeight;           

                // The Current Size Of The Window in Width and Height
                const deviceWidth = window.innerWidth;
                const deviceHeight = window.innerHeight;

                // Get The Scale
                const scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

                // Update The Ctx used for drawing to the new ctx (Dunno if this is needed)
                this.canvas.ctx = this.canvas.element.getContext("2d");

                // Set The Canvas Elements Width And Height To The New Size
                this.canvas.element.style.width = nativeWidth * scaleFitNative + "px";
                this.canvas.element.style.height = nativeHeight * scaleFitNative + "px";
                this.canvas.element.width = nativeWidth * scaleFitNative;
                this.canvas.element.height = nativeHeight * scaleFitNative;

                // Change A Variable To The New Size, So Other Parts Of The Script Can Use It
                this.canvas.SizeOfViewport.w = nativeWidth * scaleFitNative
                this.canvas.SizeOfViewport.h = nativeHeight * scaleFitNative

                // Set The Scale Of The Vieport (All of the stuff Inside Of It will be scaled)
                this.canvas.ctx.setTransform(
                    scaleFitNative,0,
                    0,scaleFitNative,
                    0,0
                );

                if (scaleFitNative < 0.5 && !this.canvas.TooSmallEventDispatched) { // Check If The Screen Is Small, and a variable is false (Make Sure It Doesnt Get Spammed)
                    this.canvas.element.dispatchEvent(new Event("ShowScreenTooSmallElement")) // Send a event Saying to Show the Screen too Small Element
                    this.canvas.TooSmallEventDispatched = true // Change The Variable to True, To Make Sure This Event Doesnt Get Spammed
                } else if (scaleFitNative >= 0.5 && this.canvas.TooSmallEventDispatched) { // Check If The Screen Is Big Enough, and a variable is true (Make Sure It Doesnt Get Spammed)
                    this.canvas.element.dispatchEvent(new Event("HideScreenTooSmallElement")) // Send a event Saying to Hide the Screen too Small Element
                    this.canvas.TooSmallEventDispatched = false // Change The Variable to False, To Make Sure This Event Doesnt Get Spammed
                }

                if(scaleFitNative < 1){
                    this.canvas.ctx.imageSmoothingEnabled = true; // turn it on for low res screens
                } else{
                    this.canvas.ctx.imageSmoothingEnabled = false; // turn it off for high res screens.
                }
            },
            /**
             * Adds The Necessary Events, To The Canvas and window and change some variables
             */
            addEvents: () => {
                if (!this.canvas.element) throw new Error("Canvas Is Not Reachable, Try adding a canvas tag with an id of 'canvas'") // If the Canvas element does not exist throw an error

                this.canvas.resize() // Resize the Canvas Now,
                window.addEventListener("resize", this.canvas.resize) // Add A window.resize event to update the canvas respectivley
                window.addEventListener('blur', () => {this.canvas._IsFocused = false}) // Check If the window goes out of focus
                window.addEventListener('focus', () => {this.canvas._IsFocused = true}) // Check If the window goes into focus

                if (this.Config.TooSmallScreen) { // If The Variable Exists, then
                    //Throw A Error If The Variable Is Not A Element
                    if (!(this.Config.TooSmallScreen instanceof Element)) throw new Error("Config.TooSmallScreen Variable is Not A Element. Please do .Config.TooSmallScreen = documet.getElementById()")
                    this.canvas.element.addEventListener("ShowScreenTooSmallElement", (e) => {// Check If The Event Is Called
                        this.canvas.element.style.display = "none" // Make the canvas invisible
                        this.Config.TooSmallScreen.style.display = "block"}) // Make The 'TooSmallScreen' Appear
                    this.canvas.element.addEventListener("HideScreenTooSmallElement", (e) => { // Check If The Event Is Called
                        this.canvas.element.style.display = "block" // Make the canvas visible
                        this.Config.TooSmallScreen.style.display = "none"}) // Make The 'TooSmallScreen' Disapear
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

function _rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

function _circleIntersect(x1, y1, r1, x2, y2, r2) {

    // Calculate the distance between the two circles
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= ((r1 + r2) * (r1 + r2))
}






















/**
 * Object Class For Objects, note should be extended upon
 */
class gameObject{
    constructor(Game, x, y, mass) {
        this.x = x
        this.y = y
        this.vx = vx;
        this.vy = vy;
        this.mass = mass
        this.Game = Game
        this.isColliding = false;

        //functions
        this.beforeDestroy = undefined
        this.afterDestroy = undefined
    }

    Destroy() {
        this.beforeDestroy()

        //Then Remove any instances to destroy
        if (this.fIndex) {
            this.Game.functionLoop.splice(this.fIndex, 1)
        }
        if (this.dIndex) {
            this.Game.drawLoop.splice(this.dIndex, 1)
        }
        if (this.cIndex) {
            this.Game.gameObject.splice(this.cIndex, 1)
        }

        this.afterDestroy()
    }
}

class Square extends gameObject {
    constructor(Game, x = 0, y = 0, w = 50, h = 50, mass) {
        super(Game, x, y, vx, vy, mass, beforeDestroy, afterDestroy, isColliding)
        this.w = w
        this.h = h

        //Loop for Update
        this.fIndex = Game.functionLoop.length
        Game.functionLoop.push(this)

        //Loop for Draw
        this.dIndex = Game.drawLoop.length
        Game.drawLoop.push(this)

        //Loop For Collision
        this.cIndex = Game.gameObjects.length
        Game.gameObjects.push(this)
    }

    Draw(ctx) {
        // Draw a simple square
        ctx.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    Update(deltaTime) {
        //Do Custom Before Loop Code
        // this.dispatchEvent(new Event("beforeUpdate"))

        //Update Code
        // Apply acceleration / Gravity
        this.vy += this.Game.Config.g * deltaTime; 

        // Move with set velocity
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        //Do Custom Before Loop Code
        // this.dispatchEvent(new Event("afterUpdate"))
    }
}

// class Circle extends gameObject {
//     constructor(Game, x, y, vx, vy, mass, r = 30) {
//         super(Game, x, y, vx, vy, mass)
//         this.r = r

//         this.isColliding = false;

//         //Loop for Update
//         this.fIndex = Game.functionLoop.length
//         Game.functionLoop.push(this)

//         //Loop for Draw
//         this.dIndex = Game.drawLoop.length
//         Game.drawLoop.push(this)

//         //Loop For Collision
//         this.cIndex = Game.gameObjects.length
//         Game.gameObjects.push(this)
//     }

//     Draw(ctx) {
//         // Draw a simple square
//         ctx.fillStyle = this.isColliding?'#ff8080':'#0099b0';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
//         ctx.fill();

//         // Draw heading vector
//         ctx.beginPath();
//         ctx.moveTo(this.x, this.y);
//         ctx.lineTo(this.x + this.vx, this.y + this.vy);
//         ctx.stroke();
//     }

//     Update(deltaTime) {
//         //Do Custom Before Loop Code
//         // this.dispatchEvent(new Event("beforeUpdate"))

//         //Update Code
//         // Apply acceleration / Gravity
//         this.vy += this.Game.Config.g * deltaTime; 

//         // Move with set velocity
//         this.x += this.vx * deltaTime;
//         this.y += this.vy * deltaTime;

//         //Do Custom Before Loop Code
//         // this.dispatchEvent(new Event("afterUpdate"))
//     }
// }