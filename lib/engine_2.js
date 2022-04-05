//DEBUG -------------------------------
// const SettingsButton = document.createElement("div");
// SettingsButton.style.cssText = `
//     background-color: rgba(0, 0, 0, 0.5);
//     margin: 1vw;
//     width: 5vw;
//     height: 5vw;
// `

/**
 * Simpler functions
 */
const listen = document.addEventListener

/**
 * Event Functions
 */
setup = function () {}
beforeUpdate = function (ctx) {}
afterUpdate = function (ctx) {}
draw = function (ctx) {}
onload = function () {}

/**
 * ENUM: For Different Functions a Enum Variable
 */
const Enum = {
    Keys: {
        Backspace: 'Backspace',
        Tab: 'Tab',
        Enter: 'Enter',
        Shift: 'Shift',
        Control: 'Control',
        Alt: 'Alt',
        Pause: 'Pause',
        CapsLock: 'CapsLock',
        Escape: 'Escape',
        Space: '',
        PageUp: 'PageUp',
        PageDown: 'PageDown',
        End: 'End',
        Home: 'Home',
        ArrowLeft: 'ArrowLeft',
        ArrowUp: 'ArrowUp',
        ArrowRight: 'ArrowRight',
        ArrowDown: 'ArrowDown',
        PrintScreen: 'PrintScreen',
        Insert: 'Insert',
        Delete: 'Delete',
        Digit0: '0',
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        F: 'F',
        G: 'G',
        H: 'H',
        I: 'I',
        J: 'J',
        K: 'K',
        L: 'L',
        M: 'M',
        N: 'N',
        O: 'O',
        P: 'P',
        Q: 'Q',
        R: 'R',
        S: 'S',
        T: 'T',
        U: 'U',
        V: 'V',
        W: 'W',
        X: 'X',
        Y: 'Y',
        Z: 'Z',
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j',
        k: 'k',
        l: 'l',
        m: 'm',
        n: 'n',
        o: 'o',
        p: 'p',
        q: 'q',
        r: 'r',
        s: 's',
        t: 't',
        u: 'u',
        v: 'v',
        w: 'w',
        x: 'x',
        y: 'y',
        z: 'z',
        Meta: 'Meta',
        ContextMenu: 'ContextMenu',
        AudioVolumeMute: 'AudioVolumeMute',
        AudioVolumeDown: 'AudioVolumeDown',
        AudioVolumeUp: 'AudioVolumeUp',
        F1: 'F1',
        F2: 'F2',
        F3: 'F3',
        F4: 'F4',
        F5: 'F5',
        F6: 'F6',
        F7: 'F7',
        F8: 'F8',
        F9: 'F9',
        F10: 'F10',
        F11: 'F11',
        F12: 'F12',
        NumLock: 'NumLock',
        ScrollLock: 'ScrollLock',
        Semicolon: ';',
        Equal: '=',
        Comma: ',',
        Minus: '-',
        Period: '.',
        Slash: '/',
        Backquote: '`',
        BracketLeft: '[',
        Backslash: '\\',
        BracketRight: ']',
        Quote: "'",
        Tilde: '~',
        Exclamation: '!',
        At: '@',
        Sharp: '#',
        Dollar: '$',
        Percent: '%',
        Caret: '^',
        Ampersand: '&',
        Asterisk: '*',
        ParenthesisLeft: '(',
        ParenthesisRight: ')',
        Underscore: '_',
        Plus: '+',
        OpenBrace: '{',
        CloseBrace: '}',
        Pipe: '|',
        Colon: ':',
        Quote2: '"',
        AngleBracketLeft: '<',
        AngleBracketRight: '>',
        QuestionMark: '?'
    }
}

/**
 * Main Class Function for The Game
 */
const ENGINE = {
    NameOfGame: undefined,
    VARIABLES: {
        KeysAdded: [],
        EngineRunning: true, // If The GameEngine is updating (Can still Draw)
        oldTimeStamp: 0, // Used For DeltaTime

        mousePosition: {
            x: 0,
            y: 0
        },

        Cam: {
            x: 0,
            y: 0
        },
    },
    InputHandler: {
        keys_down: {
            // w: false,
            // a: false,
            // s: false,
            // d: false
        },

        addEvents: () => {
            for (let key in Enum.Keys) {
                ENGINE.InputHandler.keys_down[key] = false
            };
            document.addEventListener('keydown', (event) => {
                ENGINE.InputHandler.keys_down[event.key] = true
            })
            document.addEventListener('keyup', (event) => {
                ENGINE.InputHandler.keys_down[event.key] = false
            })
        }
    },
    functionLoop: [], // The Update Loop, Everything in here gets their .Update() Function Called
    drawLoop: [], // The Draw Loop, Everything In Here Gets their .Draw() Function Called
    gameObjects: [], // All of the Current Objects In the Screen
    SAVE: { // The Save Object
        saveSet: false, // Check If Setting The Save Is Already Done
        saveData: {}, // The Save Data Used For Saving, And Loading The Save
        /**
         * Calling This Saves The saveData variable into Local Storage
         */
        Save: () => {
            console.log("Saving Game");
            window.localStorage.setItem(_nameOfGame + "SaveData", JSON.stringify(ENGINE.SAVE.saveData)) // Set The LocalStorage Of The Current Game to the current Save Data
        },
        /**
         * Used For Setting The SaveFile Manually and Can Only Be Called Once.
         * @param {*} SaveFile The Save File (Should be a object like: {})
         */
        SetSave: (SaveFile) => {
            if (ENGINE.SAVE.saveSet) throw new Error("Save File Has Already Been Set, Cannot Set Again") // If saveSet Variable Has Already Been Set
            // Check if the parameter is a object and not a array, if not then throw a error
            if (typeof SaveFile != "object" || Array.isArray(SaveFile)) throw new Error("Save File Is A '" + typeof SaveFile + "' Expected 'object' (If same one could be an Array)");
            ENGINE.SAVE.saveSet = true // Set The Variable to true so this function cannot be called again
            ENGINE.SAVE.saveData = SaveFile // Set The Save Data To the Parameter
        },
        /**
         * Gets The LocalStorage Data, If It Finds Data, It sets The saveData Variable to it, otherwise it cannot find the data, 
         * it Calls ENGINE.SAVE.Save() and tries to load again
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
                ENGINE.SAVE.saveData = JSON.parse(saveData) // Set the Save Data to it, Parsing It To turn it into a object, not a string
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

                ENGINE.SAVE.saveData[Variable] = Value // If the variable to change is a string, then set the variable in save data to true, regardless if its there or not
                return true // Return True, meaning it was successful
            }
            if (typeof Variable !== "string") { // If the CreateNew parameter is false, check if the Variable is a string
                console.error("Variable Parameter is Not A String");
                return false // return false meaning it failed
            }
            if (ENGINE.SAVE.saveData[Variable] == undefined) { // If the Variable in saveData object Does not exists
                console.error("Variable Parameter Does not exist in saveData");
                return false // return false meaning it failed
            }
            ENGINE.SAVE.saveData[Variable] = Value // Set the Variable in saveData to the value 
            return true // return true as it succeeded
        }
    },
    // Config
    Config: {
        nativeWidth: 1920,  // The Resolution Set
        nativeHeight: 1080,

        TooSmallScreen: undefined, // An Element, if defined would appear if the screen gets too small

        sideScroller: false,
        sideScrollPlayerPosition: 2, // This Variable Gets Divided By the screens space and minus the player by the width and height divided by 2
        sideScrollerSideOffset: { // The Offset Of The Side Scroll (Where the camera reaches the edge)
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        boundaries: { // Get The Boundaries of all objects, Makes no gameObject Go Past This Point
            left: undefined,
            right: undefined,
            top: undefined,
            bottom: undefined
        },

        g: 2000, // (was 1600) The Worlds Gravity  
        WorldSize: { // The Size of The World
            x: 5000,
            y: 1500
        }
    },
    Load: {
        loadElements: [],
        _: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    for (let i = 0; i < ENGINE.Load.loadElements.length; i++) {
                        const element = ENGINE.Load.loadElements[i];
                        await element()
                    }
                    console.log("Finished Loading");
                    resolve()
                } catch (e) {
                    console.error("Error Happened While Loading:", e);
                    reject()
                }
            });
        },

        addLoadElement: (element) => {
            if (element) {
                if (element instanceof Function) {
                    ENGINE.Load.loadElements.push(element)
                }
                else if (element instanceof Array) {
                    for (let object of element) {
                        ENGINE.Load.loadElements.push(object)
                    }
                }
            } else {
                console.error("Element Does Not Exist");
            }
        }
    },
    Settings: {
        Settings: [],
        updateSetting(setting, value) {
            if (setting instanceof Setting) {
                const indexOf = ENGINE.Settings.indexOf(setting.name);
                ENGINE.Settings[indexOf].value = value
            } else if (typeof setting == "string") {
                const indexOf = ENGINE.Settings.indexOf(setting);
                ENGINE.Settings[indexOf].value = value
            } else {
                console.error("Settings is type:", typeof setting, "Should Be 'string' or a class called Setting, try new Setting({name})");
            }
        },
        addSetting(setting, defaultValue) {
            if (setting instanceof Setting) {
                setting.value = defaultValue
                ENGINE.Settings.push(setting)
            } else if (typeof setting == "string") {
                const newSetting = new Setting(setting)
                newSetting.value = defaultValue
                ENGINE.Settings.push(newSetting)
            } else {
                console.error("Settings is type:", typeof setting, "Should Be 'string' or a class called Setting, try new Setting({name})");
            }
        },
        removeSetting(setting) {
            if (setting instanceof Setting) {
                const indexOf = ENGINE.Settings.indexOf(setting.name);
                ENGINE.Settings.splice(indexOf, 1)
            } else if (typeof setting == "string") {
                const indexOf = ENGINE.Settings.indexOf(setting);
                ENGINE.Settings.splice(indexOf, 1)
            } else {
                console.error("Settings is type:", typeof setting, "Should Be 'string' or a class called Setting, try new Setting({name})");
            }
        }
    },
    players: [],

    // window object
    canvas: {
        focused: true, // A Variable That Gets Updated If The Window Is In Focus Or Not
        TooSmallEventDispatched: false, // To Check If A Event Has Been Dispatch, To Make Sure The Event Does Not Get Spammed
        SizeOfViewport: { // A Variable For Other Parts of the code to use to get the size of the 'viewport' or window
            w: undefined,
            h: undefined
        },
        element: document.getElementById("canvas"), // The Canvas Element
        ctx: undefined, // The Context Of The Canvas Current Undefined and gets updated in ENGINE.canvas.resize

        /**
         * Function That Gets Called Whenever The Window Gets Resized, It Updates The Canvas Size and scale
         */
        resize: () => {
            // A Config Variable Assigned to A Local Variable For Easier Typing
            const nativeWidth = ENGINE.Config.nativeWidth;
            const nativeHeight = ENGINE.Config.nativeHeight;

            // The Current Size Of The Window in Width and Height
            const deviceWidth = window.innerWidth;
            const deviceHeight = window.innerHeight;

            // Get The Scale
            const scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

            // Update The Ctx used for drawing to the new ctx (Dunno if this is needed)
            ENGINE.canvas.ctx = ENGINE.canvas.element.getContext("2d");

            // Set The Canvas Elements Width And Height To The New Size
            ENGINE.canvas.element.style.width = nativeWidth * scaleFitNative + "px";
            ENGINE.canvas.element.style.height = nativeHeight * scaleFitNative + "px";
            ENGINE.canvas.element.width = nativeWidth * scaleFitNative;
            ENGINE.canvas.element.height = nativeHeight * scaleFitNative;

            // Change A Variable To The New Size, So Other Parts Of The Script Can Use It
            ENGINE.canvas.SizeOfViewport.w = nativeWidth * scaleFitNative
            ENGINE.canvas.SizeOfViewport.h = nativeHeight * scaleFitNative

            // Set The Scale Of The Viewport (All of the stuff Inside Of It will be scaled)
            ENGINE.canvas.ctx.setTransform(
                scaleFitNative, 0,
                0, scaleFitNative,
                0, 0
            );

            if (scaleFitNative < 0.5 && !ENGINE.canvas.TooSmallEventDispatched) { // Check If The Screen Is Small, and a variable is false (Make Sure It Does'nt Get Spammed)
                ENGINE.canvas.element.dispatchEvent(new Event("ShowScreenTooSmallElement")) // Send a event Saying to Show the Screen too Small Element
                ENGINE.canvas.TooSmallEventDispatched = true // Change The Variable to True, To Make Sure ENGINE Event Does'nt Get Spammed
            } else if (scaleFitNative >= 0.5 && ENGINE.canvas.TooSmallEventDispatched) { // Check If The Screen Is Big Enough, and a variable is true (Make Sure It Does'nt Get Spammed)
                ENGINE.canvas.element.dispatchEvent(new Event("HideScreenTooSmallElement")) // Send a event Saying to Hide the Screen too Small Element
                ENGINE.canvas.TooSmallEventDispatched = false // Change The Variable to False, To Make Sure ENGINE Event Does'nt Get Spammed
            }

            if (scaleFitNative < 1) {
                ENGINE.canvas.ctx.imageSmoothingEnabled = true; // turn it on for low res screens
            } else {
                ENGINE.canvas.ctx.imageSmoothingEnabled = false; // turn it off for high res screens.
            }
        },

        /**
         * On Mouse Move
         */
        onMouseMove: (e) => {
            var rect = ENGINE.canvas.element.getBoundingClientRect();

            e.preventDefault();
            e.stopPropagation();

            var transform = ENGINE.canvas.ctx.getTransform();

            var screenX = parseInt(e.clientX - rect.left);
            var screenY = parseInt(e.clientY - rect.top);

            const invMat = transform.invertSelf();

            ENGINE.VARIABLES.mousePosition = {
                x: Math.round(screenX * invMat.a + screenY * invMat.c + invMat.e),
                y: Math.round(screenX * invMat.b + screenY * invMat.d + invMat.f)
            };
        },

        /**
         * Adds The Necessary Events, To The Canvas and window and change some variables
         */
        addEvents: (resize = false) => {
            if (!ENGINE.canvas.element) throw new Error("Canvas Is Not Reachable, Try adding a canvas tag with an id of 'canvas'") // If the Canvas element does not exist throw an error

            if (resize) {
                ENGINE.canvas.resize() // Resize the Canvas Now,
                window.addEventListener("resize", ENGINE.canvas.resize) // Add A window.resize event to update the canvas respectfully
            }

            ENGINE.InputHandler.addEvents()
            window.addEventListener('blur', () => { ENGINE.canvas.focused = false }) // Check If the window goes out of focus and stop updating the engine
            window.addEventListener('focus', () => { ENGINE.canvas.focused = true }) // Check If the window goes into focus and continue updating the engine
            document.addEventListener("mousemove", ENGINE.canvas.onMouseMove); // Get Mouse Position
            if (ENGINE.Config.TooSmallScreen) { // If The Variable Exists, then
                //Throw A Error If The Variable Is Not A Element
                if (!(ENGINE.Config.TooSmallScreen instanceof Element)) throw new Error("Config.TooSmallScreen Variable is Not A Element. Please do ENGINE.Config.TooSmallScreen = document.getElementById()")
                ENGINE.canvas.element.addEventListener("ShowScreenTooSmallElement", (e) => {// Check If The Event Is Called
                    ENGINE.canvas.element.style.display = "none" // Make the canvas invisible
                    ENGINE.Config.TooSmallScreen.style.display = "block"
                }) // Make The 'TooSmallScreen' Appear
                ENGINE.canvas.element.addEventListener("HideScreenTooSmallElement", (e) => { // Check If The Event Is Called
                    ENGINE.canvas.element.style.display = "block" // Make the canvas visible
                    ENGINE.Config.TooSmallScreen.style.display = "none"
                }) // Make The 'TooSmallScreen' disappear
            }
        }
    },

    /**
    * Returns The Mouse Position
    */
    getMousePosition: () => {
        return ENGINE.VARIABLES.mousePosition;
    },

    /**
    * Add A New Player To The World
    */
    addPlayer: (_player, isLocal = false) => {
        ENGINE.players.forEach(player => {
            if (_player.id == player.id) { // Check If the Player Already Exists
                return { error: true, msg: "Player Already Exists" }
            }
        });

        _player.isLocal = isLocal // Set The isLocal State
        ENGINE.players.push(_player) // Push The New Player Into The Array
        return { error: false, msg: "Added New Player" }
    },

    /**
    * To Get The Current Local Player
    */
    GetLocalPlayer: () => {
        for (let i = 0; i < ENGINE.players.length; i++) {
            const element = ENGINE.players[i];
            if (element.isLocal) {
                return element // Return The Player
            }
        }

        return { error: true, msg: "Found No Local Player, Try .addPlayer(player, true) first", package: undefined } // Return An Error Msg Because if failed
    },

    /**
    * Get the player with a player ID
    * @returns returns callBack.error: false or true, callBack.msg if there is a error, callBack.package if successful
    */
    GetPlayerFromID: (id) => {
        for (let i = 0; i < ENGINE.players.length; i++) {
            const element = ENGINE.players[i];
            if (element.id == id) {
                return { error: false, msg: "Successfully Found Player", package: player } // Return The Player
            }
        }

        return { error: true, msg: "Found No Player with the ID, Try adding the player first", package: undefined } // Return An Error Msg Because if failed
    },

    /**
    * Call This Function To Start The Game, It calls the Update Loop, adds the canvas events, checks for browser support, and shows the canvas.
    */
    Init: async () => {
        setup()
        if (window.localStorage == undefined) { // If The Browser Does not Support localStorage
            console.error("LocalStorage Does Not Exist On this browser please switch Browser") // Throw An Error (Also Stops The Current Code From Playing)
        }
        await ENGINE.Load._()
        onload()

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => { ENGINE.Update(timeStamp) });
    },

    detectCollisions: (obj1) => {
        let obj2;

        const gameObjects = ENGINE.gameObjects

        // Reset collision state of all objects
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].isColliding = false;
        }

        // Start checking for collisions
        for (let j = obj1.cIndex + 1; j < gameObjects.length; j++) {
            obj2 = gameObjects[j];

            if (obj1 instanceof Player && obj2 instanceof Square) obj1.collisionDetection(obj2);

            if (obj2 instanceof Player && obj1 instanceof Square) obj2.collisionDetection(obj1);

            if (obj1 instanceof Square && obj2 instanceof Square) obj1.collisionDetection(obj2);
        }
    },

    /**
    * Function To Draw Each Frame, Should Get Called In The Update Loop
    */
    Draw: () => {
        const ctx = ENGINE.canvas.ctx // Get the context to draw on (easier to type now)

        // A Config Variable Assigned to A Local Variable For Easier Typing
        const nativeWidth = ENGINE.Config.nativeWidth;
        const nativeHeight = ENGINE.Config.nativeHeight;

        // Get The Scale
        const scaleFitNative = Math.min(window.innerWidth / nativeWidth, window.innerHeight / nativeHeight);

        //Camera
        ctx.setTransform(scaleFitNative, 0, 0, scaleFitNative, 0, 0); //reset the transform matrix as it is cumulative

        if (ENGINE.Config.sideScroller) {
            //Clamp the camera position to the world bounds while centering the camera around the player
            if (!ENGINE.GetLocalPlayer().error) {
                const LocalPlayer = ENGINE.GetLocalPlayer()
                ENGINE.VARIABLES.Cam.x = clamp(-LocalPlayer.x + nativeWidth / ENGINE.Config.sideScrollPlayerPosition - LocalPlayer.w / 2, -WORLD.size.w + nativeWidth - ENGINE.Config.sideScrollerSideOffset.right, ENGINE.Config.sideScrollerSideOffset.left);
                ENGINE.VARIABLES.Cam.y = clamp(-LocalPlayer.y + nativeHeight / ENGINE.Config.sideScrollPlayerPosition - LocalPlayer.h / 2, -WORLD.size.h + nativeHeight - ENGINE.Config.sideScrollerSideOffset.bottom, ENGINE.Config.sideScrollerSideOffset.top);
            } else {
                console.error(ENGINE.GetLocalPlayer().msg)
            }
        }

        ctx.clearRect(0, 0, nativeWidth, nativeHeight) // Clear The Screen For The Next Frame
        // if (nativeWidth <= WORLD.size.w && nativeHeight <= WORLD.size.h) {
        ctx.translate(ENGINE.VARIABLES.Cam.x, ENGINE.VARIABLES.Cam.y);
        // }
        ctx.scale(1, 1); // Set Scale to 1:1
        ctx.fillStyle = "black" // Reset fill Style
        ctx.globalAlpha = 1 // Reset transparency of the context
        for (let i = 0; i < ENGINE.drawLoop.length; i++) { // Loop Through All Of The Functions In Draw Loop
            const element = ENGINE.drawLoop[i];
            if (element.Draw != undefined) element.Draw(ctx) // If the Index has a draw function, run it
        }
        draw(ctx)
    },

    /**
    * An Update Function That Get Called Every Frame
    * @param {*} deltaTime The Time Between Each Frame
    */
    Update: (timeStamp) => {
        const deltaTime = (timeStamp - ENGINE.VARIABLES.oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
        ENGINE.VARIABLES.oldTimeStamp = timeStamp; // Update oldTimeStamp To the new one

        if (!deltaTime || deltaTime == NaN || deltaTime > 0.7) { // If Lagging is too great
            console.warn("deltaTime is NaN Or Time Between Frames Is Too Great, Skipping Frame, if continued please refresh browser, deltaTime: ", JSON.stringify(deltaTime));
            requestAnimationFrame(ENGINE.Update); // Call The Update Function
            return; // end ENGINE instance of runtime or smt
        }

        //Check If The Game Is Playing
        if (!ENGINE.VARIABLES.EngineRunning && ENGINE.canvas.element) { // If Not Playing Then Dont Update, But Still Draw
            ENGINE.Draw() // Draw Function, Used For Drawing All Elements Onto the canvas
            requestAnimationFrame(ENGINE.Update) //Get New Frame and call ENGINE.Update Again
            return // End ENGINE instance (like stop. and dont continue)
        } else if (!ENGINE.canvas.element) {
            beforeUpdate() // Calling Custom Before Update Function, If they still want to update, even if there is no canvas
            requestAnimationFrame(ENGINE.Update) // Get New Frame and call Update Function Again
            return // End This function
        }

        beforeUpdate(deltaTime) // Calling Custom Update Function

        for (let i = 0; i < ENGINE.functionLoop.length; i++) {
            const element = ENGINE.functionLoop[i];
            if (element.Update != undefined) element.Update(deltaTime) // If The Update Function Exists, Call it
        }

        for (let i = 0; i < ENGINE.gameObjects.length; i++) { //For Every Single Item In the FunctionLoop
            const element = ENGINE.gameObjects[i]; // For easier typing
            ENGINE.detectCollisions(element) // Do collisions
        }

        afterUpdate(deltaTime) // Calling Custom After Update Function

        ENGINE.Draw() // Draw Function, Used For Drawing All Elements Onto the canvas

        requestAnimationFrame(ENGINE.Update) //Get New Frame and call ENGINE.Update Again
    }
}

/**
 * 
 * Game Engine Functions
 * 
 */

/**
 * Create A Canvas
 * @param {*} autoResize If the canvas Should Auto Resize or not
 * @param {*} width The Width Of the Canvas, Do not need a value if auto resize is true
 * @param {*} height The Height of the canvas, Do not need a value if auto resize is true
 */
function createCanvas(autoResize, width = 500, height = 500) {
    const canvas = document.createElement("canvas", { width: width, height: height, display: "block" }); // Create the Canvas
    document.body.appendChild(canvas) // Add the canvas to the screen
    ENGINE.canvas.element = canvas // Set the canvas
    ENGINE.canvas.element.innerHTML = "<h1>Your Browser Cannot Handle HTML5, Please Switch To a Different Browser</h1>" // Used if canvas element does not work, so instead display text saying its not supported
    ENGINE.canvas.addEvents(autoResize) // Add The Necessary Events Onto The Canvas
}

function createTooSmallScreenElement(element) {

}

function createLoadingScreenFromDOM(element, displayType = "none") {
    if (!element) throw new Error("Element Is Undefined");
    const LoadingElement = document.createElement('div') // Create a new div element that we can change
    LoadingElement.style.cssText = element.style.cssText // Sets the css
    LoadingElement.style.display = displayType // Set the display
    LoadingElement.innerHTML = element.innerHTML // Set the text
    document.body.appendChild(LoadingElement)
    return {
        changeDisplay(display) {
            LoadingElement.style.display = display;
        },
        destroy() {
            document.body.removeChild(LoadingElement);
        }
    }
}

/**
 * 
 * Global Variables
 * Helpful functions
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
    return new Promise(resolve => { setTimeout(resolve, ms); });
}

function angleToVector(angle) {
    return new Vector(Math.cos(angle), Math.sin(angle))
}

/**
 * A Function that determines if line 1 and line 2 intersect
 * @returns intersection point if lines intersect or false the two lines dont intersect
 */
function lineIntersects(p1, p2, p3, p4) {
    const x1 = p1.x
    const x2 = p2.x
    const x3 = p3.x
    const x4 = p4.x
    const y1 = p1.y
    const y2 = p2.y
    const y3 = p3.y
    const y4 = p4.y

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
};

function GenerateNewID() {
    return Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1);
}

/**
 * Downloads a file that has the file name and has the data inside
 * @param {*} filename The name of the file
 * @param {*} textInput The Data to put inside
 */
function download(filename, textInput) { // A Function For Downloading Files
    var element = document.createElement('a'); // Create a new element
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput)); // Set the elements attribute to the files contents
    element.setAttribute('download', filename); // Set another attribute to tell the browser to download this
    document.body.appendChild(element); // Add the download tag to the document
    element.click(); // Click on the tag (To download it)
    document.body.removeChild(element); // Remove the tag from the document
}









class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    negative() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    add(v) {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    }
    subtract(v) {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }
    multiply(v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    divide(v) {
        if (v instanceof Vector) {
            if (v.x != 0) this.x /= v.x;
            if (v.y != 0) this.y /= v.y;
        } else {
            if (v != 0) {
                this.x /= v;
                this.y /= v;
            }
        }
        return this;
    }
    equals(v) {
        return this.x == v.x && this.y == v.y;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x
    }
    length() {
        return Math.sqrt(this.dot(this));
    }
    normalize() {
        return this.divide(this.length());
    }
    min() {
        return Math.min(this.x, this.y);
    }
    max() {
        return Math.max(this.x, this.y);
    }
    toAngles() {
        return -Math.atan2(-this.y, this.x);
    }
    angleTo(a) {
        return Math.acos(this.dot(a) / (this.length() * a.length()));
    }
    toArray(n) {
        return [this.x, this.y].slice(0, n || 2);
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    set(x, y) {
        this.x = x; this.y = y;
        return this;
    }
}

class Ray {
    constructor(x, y, direction) {
        if (!(direction instanceof Vector)) {
            throw new Error("direction is not type vector")
        }
        this.pos = new Vector(x, y); // Starting Position
        this.dir = direction // {x: 1, y: 0}; // Currently Hardcoded as right
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x; // Get the actual x position
        this.dir.y = y - this.pos.y; // Get the actual y position
        this.dir = this.dir.normalize() // Normalize the direction
    }

    draw(ctx) {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(this.pos.x, this.pos.y); // Move the pen to (30, 50)
        ctx.lineTo(this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
    }

    cast(obj, max_dist = 10) {
        const x1 = obj.pos1.x;
        const y1 = obj.pos1.y;
        const x2 = obj.pos2.x;
        const y2 = obj.pos2.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return { result: undefined };
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            const pt = new Vector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return { result: pt, dist: u };
        } else {
            return { result: undefined };
        }
    }
}



/**
 * Object Class For Objects, note should be extended upon
 */
class gameObject {
    constructor(isStatic = false, x = 0, y = 0, mass = 0) {
        this.x = x
        this.y = y
        this.vy = 0
        this.vx = 0
        this.mass = mass
        this.isStatic = isStatic
        this.isColliding = false;

        //functions
        this.beforeDestroy = () => { }
        this.afterDestroy = () => { }
    }

    Destroy() {
        if (this.beforeDestroy) this.beforeDestroy() // Calls the Before Destroy Custom Code

        const fIndex = ENGINE.functionLoop.indexOf(this);
        const dIndex = ENGINE.drawLoop.indexOf(this);
        const cIndex = ENGINE.gameObjects.indexOf(this);

        //Then Remove any instances to destroy
        if (ENGINE.functionLoop[fIndex]) {// Checks If this variable exists
            ENGINE.functionLoop.splice(fIndex, 1)
        }
        if (ENGINE.drawLoop[dIndex]) {// Checks If this variable exists
            ENGINE.drawLoop.splice(dIndex, 1)
        }
        if (ENGINE.gameObjects[cIndex]) {// Checks If this variable exists
            ENGINE.gameObjects.splice(cIndex, 1)
        }

        if (this.afterDestroy) this.afterDestroy() // Calls The After Destroy Custom Code

        delete this // Delete The Object
    }
}

class Square extends gameObject {
    constructor(isStatic = false, x = 0, y = 0, w = 50, h = 50, mass = 0) {
        super(isStatic, x, y, mass)
        this.w = w
        this.h = h
        this.c = "black"
        this.gravityMax = 10000
        this.isOnGround = false

        this.collisionEnabled = true

        this.isColliding = false;

        if (!this.isStatic) { // Check if the cube should be updated
            //Loop for Update
            ENGINE.functionLoop.push(this)
        }

        //Loop for Draw
        ENGINE.drawLoop.push(this)

        //Loop For Collision
        this.cIndex = ENGINE.gameObjects.length
        ENGINE.gameObjects.push(this)
    }

    EnableCollision() {
        if (!this.collisionEnabled) {
            this.collisionEnabled = true

            this.cIndex = ENGINE.gameObjects.length
            ENGINE.gameObjects.push(this)
        }
    }

    DisableCollision() {
        if (this.collisionEnabled) {
            this.collisionEnabled = false

            const cIndex = ENGINE.gameObjects.indexOf(this); // Get the position of the collision in the update loop

            if (ENGINE.gameObjects[cIndex]) {// Checks If this variable exists
                ENGINE.gameObjects.splice(cIndex, 1)
            }
        }
    }

    collisionDetection(obj) {
        if (this.x + this.w < obj.x || this.x > obj.x + obj.w || this.y + this.h < obj.y || this.y > obj.y + obj.h) return; // Check if the player is colliding

        let playerTop_ObjBottom = Math.abs(this.y - (obj.y + obj.h));
        let playerRight_ObjLeft = Math.abs((this.x + this.w) - obj.x);
        let playerLeft_ObjRight = Math.abs(this.x - (obj.x + obj.w));
        let playerBottom_ObjTop = Math.abs((this.y + this.h) - obj.y);
        if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
            this.y = obj.y + obj.h;
            if (this.vy <= 0) this.vy = 0;
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

    Draw(ctx) {
        // Draw a simple square
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    Update(deltaTime) {
        if (!deltaTime) return;
        if (!this.isStatic) {
            //Update Code
            // Apply acceleration / Gravity
            if (this.vy < this.gravityMax) this.vy += ENGINE.Config.g * deltaTime;

            // Move with set velocity
            this.x += this.vx * deltaTime;

            this.y += this.vy * deltaTime;

            //Check If Out of boundaries
            if (ENGINE.Config.boundaries.left != undefined) {
                if (this.x <= ENGINE.Config.boundaries.left) {
                    this.x = ENGINE.Config.boundaries.left
                }
            }
            if (ENGINE.Config.boundaries.right != undefined) {
                if (this.x >= ENGINE.Config.boundaries.right) {
                    this.x = ENGINE.Config.boundaries.right
                }
            }
            if (ENGINE.Config.boundaries.top != undefined) {
                if (this.y <= ENGINE.Config.boundaries.top) {
                    this.y = ENGINE.Config.boundaries.top
                }
            }
            if (ENGINE.Config.boundaries.bottom != undefined) {
                if (this.y >= ENGINE.Config.boundaries.bottom) {
                    this.y = ENGINE.Config.boundaries.bottom
                }
            }
        }
    }
}

class Wall extends gameObject {
    constructor(x1, y1, x2, y2) {
        super()
        this.pos1 = new Vector(x1, y1);
        this.pos2 = new Vector(x2, y2);

        //Loop for Draw
        Game.drawLoop.push(this)
    }

    Draw(ctx) {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(this.pos1.x, this.pos1.y); // Move the pen to (30, 50)
        ctx.lineTo(this.pos2.x, this.pos2.y); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
    }
}

class Player extends Square {
    constructor(isStatic = false, x = 0, y = 0, w = 50, h = 50, mass = 100, speed = 10, jump_strength = -15, collisionEnabled = true) {
        super(isStatic, x, y, mass, collisionEnabled)

        this.w = w
        this.h = h

        this.speed = speed

        this.jump_strength = jump_strength

        this.id = GenerateNewID()
        this.isLocal = true

        this.isStatic = false
    }

    /**
     * @returns ID of the player
     */
    getID() {
        return this.id;
    }

    Move(movement) {
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

    stopMove(movement) {
        switch (movement) {
            case "a":
                if (!ENGINE.InputHandler.keys_down.d)
                    this.vx = 0;
                else
                    this.Move("d")
                break;

            case "d":
                if (!ENGINE.InputHandler.keys_down.a)
                    this.vx = 0;
                else
                    this.Move("a")
                break;
        }
    }
}

/**
 * Settings
 */
class Setting {
    constructor(name) {
        this.name = name
        this.value = undefined
    }
}

/**
 * World
 */
const WORLD = {
    data: [
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    tiles: [], // This is the data, but instead with all the classes
    blockSize: 50, // Need to make this not hard coded, Is the size of the blocks
    size: { // The Size of the level, by default
        w: 5000,
        h: 1500
    },

    init(data = WORLD.data) {
        WORLD.data = data
        WORLD.tiles = [];

        for (let i = 0; i < data.length; i++) {
            let tiles = []
            data[i].forEach(element => {
                tiles.push(element)
            });
            WORLD.tiles.push(tiles)
        }

        console.log(WORLD.tiles);

        let x = 0;
        let y = 0;
        for (let i = 0; i < data.length; i++) {
            x = 0;

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let dirt = new Square(Game, true, x, y, 50, 50);
                    WORLD.tiles[i][j] = dirt;
                }
                else if (data[i][j] == 0) {
                    WORLD.tiles[i][j] = undefined
                }
                x += 50;
            }
            y += 50;
        }

        WORLD.size.w = WORLD.data[0].length * WORLD.blockSize // Set the worlds width size, by getting the amount of blocks wide times by the blocks size
        WORLD.size.h = WORLD.data.length * WORLD.blockSize // Set the worlds height size, by getting the amount of blocks stacked times by the blocks size
    },

    regenerate(data = WORLD.data) {
        WORLD.data = data

        for (let i = 0; i < WORLD.tiles.length; i++) {
            const element = WORLD.tiles[i];
            for (let ii = 0; ii < element.length; ii++) {
                const element2 = element[ii];
                if (element2 instanceof gameObject) {
                    element2.Destroy()
                }
            }
        }

        WORLD.size.w = WORLD.data[0].length * WORLD.blockSize // Set the worlds width size, by getting the amount of blocks wide times by the blocks size
        WORLD.size.h = WORLD.data.length * WORLD.blockSize // Set the worlds height size, by getting the amount of blocks stacked times by the blocks size

        WORLD.init(data)
    },

    /**
     * Set the tile at the specific coordinates
     * @param {*} tileIndex The Coordinates in i, and j
     * @param {*} element The Element to change it too
     */
    setTile(tileIndex /*{i:i, j:j}*/, element) {
        WORLD.deleteTile(tileIndex)

        if (element === undefined || element instanceof gameObject)
            WORLD.tiles[tileIndex.i][tileIndex.j] = element
    },

    deleteTile(tileIndex /*{i:i, j:j}*/) {
        if (WORLD.tiles[tileIndex.i][tileIndex.j]) {
            WORLD.tiles[tileIndex.i][tileIndex.j].Destroy()
            WORLD.tiles[tileIndex.i][tileIndex.j] = undefined
        }
    }
}








window.onload = () => {
    ENGINE.Init()
}