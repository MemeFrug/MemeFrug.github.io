/**
 * TODO: Make Loading Work
 * TODO: Make able to jump and move at the same time in the Player class
 */
console.log("%c Do 'Help()' For Commands", "color: yellow; font-family: monospace; font-size: 20px");
let Help = function () { console.log("There is No Help Function Yet"); }

//DEBUG -------------------------------
const UIElement = document.createElement("div")
UIElement.style.cssText = `   
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    padding: 0;
    margin: auto;
    width: 800px;
    height: 600px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0
`

const SettingsUI = document.createElement("div")
SettingsUI.style.cssText = ` 
    display: flex;background-color: rgba(0, 0, 0, 0);width: 100%;height: auto;align-items: flex-start;justify-content: flex-end;flex-direction: row;position:absolute;
`

const SettingsButton = document.createElement("div");
SettingsButton.style.cssText = `
    background-color: rgba(0, 0, 0, 0.5);
    margin: 1vw;
    width: 5vw;
    height: 5vw;
`

SettingsUI.appendChild(SettingsButton)
UIElement.appendChild(SettingsUI)

/**
 * Main Class Function for The Game
 */
class _ {
    constructor(_nameOfGame = undefined) {
        // Check If NameOfGame Variable Exists And Is Defined, Used For Saving
        if (!_nameOfGame || typeof _nameOfGame != "string") throw new Error("Name Of Game Cannot Be undefined, and cannot be type: '" + typeof _nameOfGame + "' Expected 'string'")
        this.functionLoop = [], // The Update Loop, Everything in here gets their .Update() Function Called
            this.drawLoop = [], // The Draw Loop, Everything In Here Gets their .Draw() Function Called

            this.gameObjects = [], // All of the Current Objects In the Screen

            this.inputHandler = {
                keys_down: {
                    w: false,
                    a: false,
                    s: false,
                    d: false
                },

                addEvents: () => {
                    document.addEventListener('keydown', (event) => {
                        const LocalPlayer = this.GetLocalPlayer()
                        switch (event.key) {
                            //left arrow
                            case "ArrowLeft":
                                if (LocalPlayer) LocalPlayer.package._Move('a')
                                this.inputHandler.keys_down.a = true
                                break;
                            //right arrow
                            case 'ArrowRight':
                                if (LocalPlayer) LocalPlayer.package._Move('d')
                                this.inputHandler.keys_down.d = true
                                break;
                            //move up arrow
                            case 'ArrowUp':
                                if (LocalPlayer) LocalPlayer.package._Move('w')
                                this.inputHandler.keys_down.w = true
                                break;
                            //move down arrow
                            case 'ArrowDown':
                                if (LocalPlayer) LocalPlayer.package._Move('s')
                                this.inputHandler.keys_down.s = true
                                break;
                            //move up key
                            case 'w':
                                if (LocalPlayer) LocalPlayer.package._Move('w')
                                this.inputHandler.keys_down.w = true
                                break;
                            //move left key
                            case "a":
                                if (LocalPlayer) LocalPlayer.package._Move('a')
                                this.inputHandler.keys_down.a = true
                                console.log("moving Left");
                                break;
                            //move down key
                            case "s":
                                if (LocalPlayer) LocalPlayer.package._Move('s')
                                this.inputHandler.keys_down.s = true
                                break;
                            //move right key
                            case "d":
                                if (LocalPlayer) LocalPlayer.package._Move('d')
                                this.inputHandler.keys_down.d = true
                                break;
                            case " ":
                                if (LocalPlayer) LocalPlayer.package._Move('w')
                                this.inputHandler.keys_down.w = true
                        }
                    })
                    document.addEventListener('keyup', (event) => {
                        const LocalPlayer = this.GetLocalPlayer()
                        switch (event.key) {
                            //left arrow
                            case 'ArrowLeft':
                                if (LocalPlayer) LocalPlayer.package._stopMoving('a')
                                this.inputHandler.keys_down.a = false
                                break;
                            //right arrow
                            case 'ArrowRight':
                                if (LocalPlayer) LocalPlayer.package._stopMoving('d')
                                this.inputHandler.keys_down.d = false
                                break;
                            //move up arrow
                            case 'ArrowUp':
                                if (LocalPlayer) LocalPlayer.package._stopMoving('w')
                                this.inputHandler.keys_down.w = false
                                break;
                            //move down arrow
                            case 'ArrowDown':
                                if (LocalPlayer) LocalPlayer.package._stopMoving('s')
                                this.inputHandler.keys_down.s = false
                                break;

                            //move up key
                            case 'w':
                                if (LocalPlayer) LocalPlayer.package._stopMoving('w')
                                this.inputHandler.keys_down.w = false
                                break;
                            //move left key
                            case "a":
                                if (LocalPlayer) LocalPlayer.package._stopMoving('a')
                                this.inputHandler.keys_down.a = false
                                break;
                            //move down key
                            case "s":
                                if (LocalPlayer) LocalPlayer.package._stopMoving('s')
                                this.inputHandler.keys_down.s = false
                                break;
                            //move right key
                            case "d":
                                if (LocalPlayer) LocalPlayer.package._stopMoving('d')
                                this.inputHandler.keys_down.d = false
                                break;

                            case " ":
                                if (LocalPlayer) LocalPlayer.package._stopMoving('w')
                                this.inputHandler.keys_down.w = false
                        }
                    })
                }
            }

        this._Save = { // The Save Object
            saveSet: false, // Check If Setting The Save Is Already Done
            saveData: {}, // The Save Data Used For Saving, And Loading The Save
            /**
             * Calling This Saves The saveData variable into Local Storage
             */
            Save: () => {
                console.log("Saving Game");
                window.localStorage.setItem(_nameOfGame + "SaveData", JSON.stringify(this._Save.saveData)) // Set The LocalStorage Of The Current Game to the current Save Data
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
             * it Calls this._Save.Save() and tries to load again
             * @returns false if there is no save file
             * @returns true if it Succeeds and finds a safeFile from localStorage and sets the saveData to it
             */
            Load: () => {
                const saveData = window.localStorage.getItem(_nameOfGame + "SaveData") // Gets the save file from localStorage
                if (!saveData) { // If The save file from localStorage Does not exists then return false
                    console.log("No Save File Found");
                    return false
                } else { // If the save file exists from localStorage then,
                    console.log("Save Found, Overwriting Save Object");
                    this._Save.saveData = JSON.parse(saveData) // Set the Save Data to it, Parsing It To turn it into a object, not a string
                    return true // Return true
                }
            },
            /**
             * A Function To Update A Specific Variable
             * @param {*} Variable The Specific Variable To Change
             * @param {*} Value The Value To Change It Too
             * @param {*} CreateNew A True Or False, If It Cannot Find The Variable, It Would Create a new one
             * @returns true if successful
             * @returns false if not successful
             */
            UpdateSave: (Variable, Value, CreateNew) => {
                if (CreateNew) { // If the CreateNew parameter is true then,
                    if (typeof Variable !== "string") { // Check if The Variable to change is a string
                        console.error("Variable Parameter is Not A String");
                        return false // Return False as it failed
                    }

                    this._Save.saveData[Variable] = Value // If the variable to change is a string, then set the variable in save data to true, regardless if its there or not
                    return true // Return True, meaning it was successful
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
        // Config
        this.Config = {
            nativeWidth: 1920,  // The Resolution Set
            nativeHeight: 1080,

            TooSmallScreen: undefined, // An Element, if defined would appear if the screen gets too small
            _LoadingElement: document.createElement('div'),
            _LoadingElementStyle: `position: absolute; display: flex; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; justify-content: center; align-items: center; background-color: black; color: white;`,
            _LoadingElementText: "Loading...",

            sideScroller: false,
            sideScrollPlayerPosition: 2, // This Variable Gets Divided By the screens space and minus the player by the width and height divided by 2
            sideScrollerSideOffset: { // The Offset Of The Side Scroll (Where the camera reaches the edge)
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },

            settings: {
                Offset: {
                    x: 90,
                    y: 90
                },
                Size: {
                    w: 70,
                    h: 70
                },
                Transparency: 0.5,
                Colour: "grey",
            },

            boundaries: { // Get The Boundaries of all objects, Makes no gameObject Go Past This Point
                left: undefined,
                right: undefined,
                top: undefined,
                bottom: undefined
            },

            g: 1600, // The Worlds Gravity  

            WorldSize: { // The Size of The World
                x: 5000,
                y: 1500
            }
        }

        //The Variables
        this._ = {
            Playing: true, // If The GameEngine is updating (Can still Draw)
            oldTimeStamp: 0, // Used For DeltaTime
            DeltaTimeTooLargeAmount: 0,

            mousePosition: {
                x: 0,
                y: 0
            },

            Cam: {
                x: 0,
                y: 0
            },
        }

        this.load = {
            loadElements: [],
            _: () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        for (let i = 0; i < this.load.loadElements.length; i++) {
                            const element = this.load.loadElements[i];
                            await element.load
                        }
                        console.log("Finished Loading");
                        resolve()
                    } catch (e) {
                        console.log("Error Happened While Loading Elements:", e);
                        reject()
                    }
                });
            },

            addLoadElement: (element) => {
                if (element) {
                    if (element.load) {
                        //TODO: Finished this function, and loading in general
                    }
                } else {
                    console.error("Element Does Not Exist");
                }
            }
        }

        this.settings = {
            Settings: [],
            // _: { // Some Functions Used By the gameEngine
            //     DrawSettings: (ctx) => {
            //         ctx.fillStyle = this.Config.settings.Colour
            //         ctx.globalAlpha = this.Config.settings.Transparency
            //         ctx.fillRect(this.Config.nativeWidth - this.Config.settings.Offset.x, this.Config.nativeHeight - this.Config.settings.Offset.y, this.Config.settings.Size.w, this.Config.settings.Size.h) // TODO: Draw Settings Icon
            //     },
            //     Update: (ctx) => {
            //         const MousePosition = Game.canvas.getMousePosition()
            //         if (_rectIntersect(MousePosition.x, MousePosition.y, 1, 1, this.Config.nativeWidth - this.Config.settings.Offset.x - this._.Cam.x, this.Config.nativeHeight - this.Config.settings.Offset.y - this._.Cam.y, this.Config.settings.Size.w, this.Config.settings.Size.h)) {
            //             console.log("intersecting");
            //         }
            //     }
            // },
            updateSetting(setting, value) {
                if (setting instanceof Setting) {
                    const indexOf = this.Settings.indexOf(setting.name);
                    this.Settings[indexOf].value = value
                } else if (typeof setting == "string") {
                    const indexOf = this.Settings.indexOf(setting);
                    this.Settings[indexOf].value = value
                } else {
                    console.error("Settings is type:", typeof setting, "Should Be 'string' or a class called Setting, try new Setting({name})");
                }
            },
            addSetting(setting, defaultValue) {
                if (setting instanceof Setting) {
                    setting.value = defaultValue
                    this.Settings.push(setting)
                } else if (typeof setting == "string") {
                    const newSetting = new Setting(setting)
                    newSetting.value = defaultValue
                    this.Settings.push(newSetting)
                } else {
                    console.error("Settings is type:", typeof setting, "Should Be 'string' or a class called Setting, try new Setting({name})");
                }
            },
            removeSetting(setting) {
                if (setting instanceof Setting) {
                    const indexOf = this.Settings.indexOf(setting.name);
                    this.Settings.splice(indexOf, 1)
                } else if (typeof setting == "string") {
                    const indexOf = this.Settings.indexOf(setting);
                    this.Settings.splice(indexOf, 1)
                } else {
                    console.error("Settings is type:", typeof setting, "Should Be 'string' or a class called Setting, try new Setting({name})");
                }
            }
        }

        this.players = []

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
                // A Config Variable Assigned to A Local Variable For Easier Typing
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

                // Set The Scale Of The Viewport (All of the stuff Inside Of It will be scaled)
                this.canvas.ctx.setTransform(
                    scaleFitNative, 0,
                    0, scaleFitNative,
                    0, 0
                );

                if (scaleFitNative < 0.5 && !this.canvas.TooSmallEventDispatched) { // Check If The Screen Is Small, and a variable is false (Make Sure It Does'nt Get Spammed)
                    this.canvas.element.dispatchEvent(new Event("ShowScreenTooSmallElement")) // Send a event Saying to Show the Screen too Small Element
                    this.canvas.TooSmallEventDispatched = true // Change The Variable to True, To Make Sure This Event Does'nt Get Spammed
                } else if (scaleFitNative >= 0.5 && this.canvas.TooSmallEventDispatched) { // Check If The Screen Is Big Enough, and a variable is true (Make Sure It Does'nt Get Spammed)
                    this.canvas.element.dispatchEvent(new Event("HideScreenTooSmallElement")) // Send a event Saying to Hide the Screen too Small Element
                    this.canvas.TooSmallEventDispatched = false // Change The Variable to False, To Make Sure This Event Does'nt Get Spammed
                }

                if (scaleFitNative < 1) {
                    this.canvas.ctx.imageSmoothingEnabled = true; // turn it on for low res screens
                } else {
                    this.canvas.ctx.imageSmoothingEnabled = false; // turn it off for high res screens.
                }

                // Update UI Screen Size DEBUG ------------------
                UIElement.style.width = this.canvas.element.style.width
                UIElement.style.height = this.canvas.element.style.height
            },

            /**
             * Returns The Mouse Position
             */
            getMousePosition: () => {
                return this._.mousePosition;
            },

            /**
             * On Mouse Move, Used in the addEvents function
             */
            onMouseMove: (e) => {
                var rect = Game.canvas.element.getBoundingClientRect();

                e.preventDefault();
                e.stopPropagation();

                var transform = Game.canvas.ctx.getTransform();

                var screenX = parseInt(e.clientX - rect.left);
                var screenY = parseInt(e.clientY - rect.top);

                const invMat = transform.invertSelf();

                this._.mousePosition = {
                    x: Math.round(screenX * invMat.a + screenY * invMat.c + invMat.e),
                    y: Math.round(screenX * invMat.b + screenY * invMat.d + invMat.f)
                };
            },

            /**
             * Adds The Necessary Events, To The Canvas and window and change some variables
             */
            addEvents: () => {
                if (!this.canvas.element) throw new Error("Canvas Is Not Reachable, Try adding a canvas tag with an id of 'canvas'") // If the Canvas element does not exist throw an error

                return new Promise((resolve, reject) => {
                    this.canvas.resize() // Resize the Canvas Now,
                    this.inputHandler.addEvents()
                    window.addEventListener("resize", this.canvas.resize) // Add A window.resize event to update the canvas respectfully
                    window.addEventListener('blur', () => { this.canvas._IsFocused = false; this._.Playing = false }) // Check If the window goes out of focus and stop updating the engine
                    window.addEventListener('focus', () => { this.canvas._IsFocused = true; this._.Playing = true }) // Check If the window goes into focus and continue updating the engine
                    document.addEventListener("mousemove", this.canvas.onMouseMove); // Get Mouse Position


                    if (this.Config.TooSmallScreen) { // If The Variable Exists, then
                        //Throw A Error If The Variable Is Not A Element
                        if (!(this.Config.TooSmallScreen instanceof Element)) throw new Error("Config.TooSmallScreen Variable is Not A Element. Please do .Config.TooSmallScreen = document.getElementById()")
                        this.canvas.element.addEventListener("ShowScreenTooSmallElement", (e) => {// Check If The Event Is Called
                            this.canvas.element.style.display = "none" // Make the canvas invisible
                            this.Config.TooSmallScreen.style.display = "block"
                        }) // Make The 'TooSmallScreen' Appear
                        this.canvas.element.addEventListener("HideScreenTooSmallElement", (e) => { // Check If The Event Is Called
                            this.canvas.element.style.display = "block" // Make the canvas visible
                            this.Config.TooSmallScreen.style.display = "none"
                        }) // Make The 'TooSmallScreen' disappear
                    }
                    resolve()
                });
            }
        }
    }

    /**
     * Add A New Player To The World
     */
    addPlayer = (_player, isLocal = false) => {
        this.players.forEach(player => {
            if (_player.id == player.id) { // Check If the Player Already Exists
                return { error: true, msg: "Player Already Exists" }
            }
        });

        _player.isLocal = isLocal // Set The isLocal State
        this.players.push(_player) // Push The New Player Into The Array
        return { error: false, msg: "Added New Player" }
    }

    /**
     * To Get The Current Local Player
     */
    GetLocalPlayer = () => {
        for (let i = 0; i < this.players.length; i++) {
            const element = this.players[i];
            if (element.isLocal) {
                return { error: false, msg: "Successfully Found Player", package: player } // Return The Player
            }
        }

        return { error: true, msg: "Found No Local Player, Try .addPlayer(player, true) first", package: undefined } // Return An Error Msg Because if failed
    }

    /**
     * Call This Function To Start The Game, It calls the Update Loop, adds the canvas events, checks for browser support, and shows the canvas.
     */
    _Init = async () => {
        if (window.localStorage == undefined) { // If The Browser Does not Support localStorage
            alert("Your browser does not support localStorage, therefore cannot save, please switch browsers") // Alert The User
            throw new Error("LocalStorage Does Not Exist On this browser please switch Browser") // Throw An Error (Also Stops The Current Code From Playing)
        }
        if (!this.canvas.element) {
            console.warn("Could not find a canvas Element, Creating One Now");
            const canvas = document.createElement("canvas", {width: 0, height: 0, display: "none"});
            document.body.appendChild(canvas)
            this.canvas.element = canvas
        }

        this.canvas.element.innerHTML = "<h1>Your Browser Cannot Handle HTML5, Please Switch To a Different Browser</h1>" // Used if canvas element does not work, so instead display text saying its not supported
        if (this.Config._LoadingElement) {
            this.Config._LoadingElement.style.cssText = this.Config._LoadingElementStyle
            this.Config._LoadingElement.innerHTML = "Loading..."
            document.body.appendChild(this.Config._LoadingElement)
        }

        // Debug ---------------
        document.body.appendChild(UIElement)
        
        await this.load._()
        await this.canvas.addEvents() // Add The Necessary Events Onto The Canvas
        await sleep(500) // Fake Loading For The Time Being
        this.canvas.element.style.display = "block" // Show The Canvas
        if (this.Config._LoadingElement) document.body.removeChild(this.Config._LoadingElement);

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => { this.Update(timeStamp) });
    }

    detectCollisions = (obj1) => {
        let obj2;

        const gameObjects = this.gameObjects

        // Reset collision state of all objects
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].isColliding = false;
        }

        // Start checking for collisions
        for (let j = obj1.cIndex + 1; j < gameObjects.length; j++) {
            obj2 = gameObjects[j];

            if (obj1 instanceof Player && obj2 instanceof Square) {
                obj1.collisionDetection(obj2)
            }
        }

    }

    /**
     * Function To Draw Each Frame, Should Get Called In The Update Loop
     */
    Draw = () => {
        const ctx = this.canvas.ctx // Get the context to draw on (easier to type now)

        // A Config Variable Assigned to A Local Variable For Easier Typing
        const nativeWidth = this.Config.nativeWidth;
        const nativeHeight = this.Config.nativeHeight;

        // Get The Scale
        const scaleFitNative = Math.min(window.innerWidth / nativeWidth, window.innerHeight / nativeHeight);

        //Camera
        ctx.setTransform(scaleFitNative, 0, 0, scaleFitNative, 0, 0); //reset the transform matrix as it is cumulative

        if (this.Config.sideScroller) {
            //Clamp the camera position to the world bounds while centering the camera around the player
            if (!this.GetLocalPlayer().error) {
                const LocalPlayer = this.GetLocalPlayer().package
                this._.Cam.x = clamp(-LocalPlayer.x + nativeWidth / this.Config.sideScrollPlayerPosition - LocalPlayer.w / 2, -this.Config.WorldSize.x + nativeWidth - this.Config.sideScrollerSideOffset.right, this.Config.sideScrollerSideOffset.left);
                this._.Cam.y = clamp(-LocalPlayer.y + nativeHeight / this.Config.sideScrollPlayerPosition - LocalPlayer.h / 2, -this.Config.WorldSize.y + nativeHeight - this.Config.sideScrollerSideOffset.bottom, this.Config.sideScrollerSideOffset.top);
            } else {
                console.error(this.GetLocalPlayer().msg)
            }
        }

        ctx.clearRect(0, 0, nativeWidth, nativeHeight) // Clear The Screen For The Next Frame

        window.dispatchEvent(new Event("Game:DrawUILoop"))

        // if (nativeWidth <= this.Config.WorldSize.x && nativeHeight <= this.Config.WorldSize.y) {
        ctx.translate(this._.Cam.x, this._.Cam.y);
        // }
        ctx.scale(1, 1); // Set Scale to 1:1
        ctx.fillStyle = "black" // Reset fill Style
        ctx.globalAlpha = 1 // Reset transparency of the context

        window.dispatchEvent(new Event("Game:BeforeDrawLoop"))

        for (let i = 0; i < this.drawLoop.length; i++) { // Loop Through All Of The Functions In Draw Loop
            const element = this.drawLoop[i];
            if (element.Draw != undefined) element.Draw(ctx) // If the Index has a draw function, run it
        }

        ctx.strokeRect(0, 0, this.Config.WorldSize.x, this.Config.WorldSize.y)

        window.dispatchEvent(new Event("Game:AfterDrawLoop"))
    }

    /**
     * An Update Function That Get Called Every Frame
     * @param {*} deltaTime The Time Between Each Frame1
     */
    Update = (timeStamp) => {
        const deltaTime = (timeStamp - this._.oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
        this._.oldTimeStamp = timeStamp; // Update oldTimeStamp To the new one

        if (!deltaTime || deltaTime == NaN || deltaTime > 1) {
            console.warn("deltaTime is NaN Or Time Between Frames Is Too Great, Skipping Frame if continued, please refresh browser, deltaTime: ", JSON.stringify(deltaTime));
            requestAnimationFrame(this.Update); // Call The Update Function
            return; // end this instance of runtime or smt
        }

        //Check If The Game Is Playing
        if (!this._.Playing) { // If Not Playing Then Dont Update, But Still Draw
            // Draw Function, Used For Drawing All Elements Onto the canvas
            this.Draw()
            requestAnimationFrame(this.Update) //Get New Frame and call this.Update Again
            return // End this instance (like stop. and dont continue)
        }

        for (let i = 0; i < this.functionLoop.length; i++) {
            const element = this.functionLoop[i];
            if (element.Update != undefined) element.Update(deltaTime) // If The Update Function Exists, Call it
        }

        for (let i = 0; i < this.gameObjects.length; i++) { //For Every Single Item In the FunctionLoop
            const element = this.gameObjects[i]; // For easier typing
            this.detectCollisions(element) // Do collisions
        }

        window.dispatchEvent(new Event("Game:BeforeUpdateLoop"))

        this.Draw() // Draw Function, Used For Drawing All Elements Onto the canvas

        window.dispatchEvent(new Event("Game:AfterUpdateLoop"))

        requestAnimationFrame(this.Update) //Get New Frame and call this.Update Again
    }
}

/**
 * 
 * 
 * Global Variables
 * Helpful functions
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
function _Clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

function _rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        return false;
    }
    return true;
}

function _circleIntersect(x1, y1, r1, x2, y2, r2) {

    // Calculate the distance between the two circles
    let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= ((r1 + r2) * (r1 + r2))
}

//Function for clamping the players camera //COPIED
function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

/**
 * A Sleep Function, For Use You Do await sleep({Time in ms})
 */
function sleep(ms) {
    return new Promise(resolve => {setTimeout(resolve, ms);});
}



















/**
 * Object Class For Objects, note should be extended upon
 */
class gameObject {
    constructor(Game, isStatic = false, x = 0, y = 0, mass = 0) {
        this.x = x
        this.y = y
        this.vy = 0
        this.vx = 0
        this.mass = mass
        this.Game = Game
        this.isStatic = isStatic
        this.isColliding = false;

        //functions
        this.beforeDestroy = () => { }
        this.afterDestroy = () => { }
    }

    Destroy() {
        if (this.beforeDestroy) this.beforeDestroy() // Calls the Before Destroy Custom Code

        const fIndex = this.Game.functionLoop.indexOf(this);
        const dIndex = this.Game.drawLoop.indexOf(this);
        const cIndex = this.Game.gameObjects.indexOf(this);

        //Then Remove any instances to destroy
        if (this.Game.functionLoop[fIndex]) {// Checks If this variable exists
            this.Game.functionLoop.splice(fIndex, 1)
        }
        if (this.Game.drawLoop[dIndex]) {// Checks If this variable exists
            this.Game.drawLoop.splice(dIndex, 1)
        }
        if (this.Game.gameObjects[cIndex]) {// Checks If this variable exists
            this.Game.gameObjects.splice(cIndex, 1)
        }

        if (this.afterDestroy) this.afterDestroy() // Calls The After Destroy Custom Code

        delete this // Delete The Object
    }
}

class Square extends gameObject {
    constructor(Game, isStatic = false, x = 0, y = 0, w = 50, h = 50, mass = 0) {
        super(Game, isStatic, x, y, mass)
        this.w = w
        this.h = h
        this.c = "black"
        this.gravityMax = 10000
        this.isOnGround = false

        this.collisionEnabled = true

        this.isColliding = false;

        if (!this.isStatic) { // Check if the cube should be updated
            //Loop for Update
            Game.functionLoop.push(this)
        }

        //Loop for Draw
        Game.drawLoop.push(this)

        //Loop For Collision
        this.cIndex = Game.gameObjects.length
        Game.gameObjects.push(this)
    }

    EnableCollision() {
        if (!this.collisionEnabled) {
            this.collisionEnabled = true

            this.cIndex = Game.gameObjects.length
            Game.gameObjects.push(this)
        }
    }

    DisableCollision() {
        if (this.collisionEnabled) {
            this.collisionEnabled = false

            const cIndex = this.Game.gameObjects.indexOf(this); // Get the position of the collision in the update loop

            if (this.Game.gameObjects[cIndex]) {// Checks If this variable exists
                this.Game.gameObjects.splice(cIndex, 1)
            }
        }
    }

    Draw(ctx) {
        // Draw a simple square
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    Update(deltaTime) {
        if (!deltaTime) return;

        //Do Custom Before Loop Code
        // this.dispatchEvent(new Event("beforeUpdate"))

        if (!this.isStatic) {
            //Update Code
            // Apply acceleration / Gravity
            if (this.vy < this.gravityMax) this.vy += this.Game.Config.g * deltaTime;

            // Move with set velocity
            this.x += this.vx * deltaTime;

            this.y += this.vy * deltaTime;

            //Check If Out of boundaries
            if (this.Game.Config.boundaries.left != undefined) {
                if (this.x <= this.Game.Config.boundaries.left) {
                    this.x = this.Game.Config.boundaries.left
                }
            }
            if (this.Game.Config.boundaries.right != undefined) {
                if (this.x >= this.Game.Config.boundaries.right) {
                    this.x = this.Game.Config.boundaries.right
                }
            }
            if (this.Game.Config.boundaries.top != undefined) {
                if (this.y <= this.Game.Config.boundaries.top) {
                    this.y = this.Game.Config.boundaries.top
                }
            }
            if (this.Game.Config.boundaries.bottom != undefined) {
                if (this.y >= this.Game.Config.boundaries.bottom) {
                    this.y = this.Game.Config.boundaries.bottom
                }
            }
        }

        //Do Custom Before Loop Code
        // this.dispatchEvent(new Event("afterUpdate"))
    }
}

class Player extends Square {
    constructor(Game, isStatic = false, x = 0, y = 0, w = 50, h = 50, mass = 100, speed = 10, jump_strength = -15, id = 0, collisionEnabled = true) {
        super(Game, isStatic, x, y, mass, collisionEnabled)

        this.w = w
        this.h = h

        this.speed = speed

        this.jump_strength = jump_strength

        this.id = id
        this.isLocal = true

        this.isStatic = false
    }


    // rect_is_colliding(object) {
    //     if (this.x < object.x + object.w &&
    //         this.x + this.w > object.x &&
    //         this.y < object.y + object.h &&
    //         this.h + this.y > object.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    //Collision
    collisionDetection(obj) {
        if (this.x + this.w < obj.x ||
            this.x > obj.x + obj.w ||
            this.y + this.h < obj.y ||
            this.y > obj.y + obj.h) {
            if (Game.inputHandler.keys_down.w) this._Move('w');
            if (Game.inputHandler.keys_down.a) this._Move('a');
            if (Game.inputHandler.keys_down.s) this._Move('s');
            if (Game.inputHandler.keys_down.d) this._Move('d');
        }
        else {
            this.narrowPhase(obj);
        }
    }

    // coyote_time() {
    //     if (this.HasDoneCoyote) return
    //     this.HasDoneCoyote = true
    //     this.coyoteTimeout = setTimeout(() => {
    //         this.isOnGround = false
    //         this.HasDoneCoyote = false
    //     }, this.coyoteTime);
    // }

    narrowPhase(obj) {
        let playerTop_ObjBottom = Math.abs(this.y - (obj.y + obj.h));
        let playerRight_ObjLeft = Math.abs((this.x + this.w) - obj.x);
        let playerLeft_ObjRight = Math.abs(this.x - (obj.x + obj.w));
        let playerBottom_ObjTop = Math.abs((this.y + this.h) - obj.y);
        if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
            this.y = obj.y + obj.h;
            // this.vy = 0;
        }
        else if ((this.x <= obj.x + obj.w && this.x + this.w > obj.x + obj.w) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
            this.x = obj.x + obj.w;
        }
        else if ((this.y + this.h >= obj.y && this.y < obj.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
            this.y = obj.y - this.h;
            this.vy = 0;
            this.isOnGround = true
        }
        else if ((this.x + this.w >= obj.x && this.x < obj.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
            this.x = obj.x - this.w;
            this.vx = 0;
        }
    }

    _Move(movement) {
        switch (movement) { // Make a switch statement
            case "w":
                if (this.isOnGround) { // Check if on the ground
                    this.vy = this.jump_strength // set the Vertical velocity to jump
                    this.isOnGround = false
                }
                break;

            case "a":
                this.vx = -this.speed // Make the speed negative to it goes the opposite way (-x)
                break;

            case "d":
                this.vx = this.speed // Make the x velocity positive of the speed so it goes right
                break;
        }
    }

    _stopMoving(movement) {
        switch (movement) {
            case "a":
                if (!this.Game.inputHandler.keys_down.d)
                    this.vx = 0;
                else
                    this._Move("d")
                break;

            case "d":
                if (!this.Game.inputHandler.keys_down.a)
                    this.vx = 0;
                else
                    this._Move("a")
                break;
        }
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

/**
 * Settings
 */
class Setting {
    constructor(name) {
        this.name = name
        this.value = undefined
    }
}

//Level1
let levelData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

class World {
    constructor(data, Game) {
        this.Game = Game
        this.data = data
        this.tiles = [];

        this.init(data)
    }

    init(data) {
        this.tiles = [];

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let tiles = []
            data[i].forEach(element => {
                tiles.push(element)
            });
            this.tiles.push(tiles)
        }

        let x = 0;
        let y = 0;

        for (let i = 0; i < data.length; i++) {
            x = 0;

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let dirt = new Square(Game, true, x, y, 50, 50);
                    this.tiles[i][j] = dirt;
                }
                else if (data[i][j] == 0) {
                    this.tiles[i][j] = undefined
                }
                x += 50;
            }
            y += 50;
        }
    }

    regenerate(data) {
        this.data = data

        for (let i = 0; i < this.tiles.length; i++) {
            const element = this.tiles[i];
            for (let ii = 0; ii < element.length; ii++) {
                const element2 = element[ii];
                if (element2 instanceof gameObject) {
                    element2.Destroy()
                }
            }
        }

        this.init(data)
    }

    /**
     * Set the tile at the specific coordinates
     * @param {*} tileIndex The Coordinates in i, and j
     * @param {*} element The Element to change it too
     */
    setTile(tileIndex/*{i:i, j:j}*/, element) {
        this.deleteTile(tileIndex)

        if (element === undefined || element instanceof gameObject)
            this.tiles[tileIndex.i][tileIndex.j] = element
    }

    deleteTile(tileIndex) {
        if (this.tiles[tileIndex.i][tileIndex.j]) {
            this.tiles[tileIndex.i][tileIndex.j].Destroy()
            this.tiles[tileIndex.i][tileIndex.j] = undefined
        }
    }
}