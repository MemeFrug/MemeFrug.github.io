/**
 * ENUM: For Different Functions a Enum Variable
 */
const Enum = {
    ResizeType: {
        FullScreen: 0, // 0
        AspectRatio: 1 // 1
    },
    Events: {
        Pressed: {
            LeftClick: "0 Pressed",
            MiddleMouse: "1 Pressed",
            RightClick: "2 Pressed",
            BackButton: "3 Pressed",
            ForwardButton: "4 Pressed"
        },
        Released: {
            LeftClick: "0 Released",
            MiddleMouse: "1 Released",
            RightClick: "2 Released",
            BackButton: "3 Released",
            ForwardButton: "4 Released"
        }
    },
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
        Events: [],
        KeysAdded: [],
        EngineRunning: true, // If The GameEngine is updating (Can still Draw)

        oldDeltaTime: undefined,
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
        keys_down: {},

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
            window.localStorage.setItem(ENGINE.NameOfGame + "SaveData", JSON.stringify(ENGINE.SAVE.saveData)) // Set The LocalStorage Of The Current Game to the current Save Data
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
            const saveData = window.localStorage.getItem(ENGINE.NameOfGame + "SaveData") // Gets the save file from localStorage
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
        nativeWidth: 1920,  // The Resolution
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
                console.error("addLoadElement: Element Does Not Exist");
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
            const canvas = ENGINE.canvas.element
            const resizeType = canvas.getAttribute("data-resize-type")
            if (!resizeType) throw new Error("resizeType Not Defined, maybe did'nt call the createCanvas() function")

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

            if (resizeType == Enum.ResizeType.AspectRatio) {
                // Set The Canvas Elements Width And Height To The New Size
                canvas.style.width = nativeWidth * scaleFitNative + "px";
                canvas.style.height = nativeHeight * scaleFitNative + "px";
                canvas.width = nativeWidth * scaleFitNative;
                canvas.height = nativeHeight * scaleFitNative;

                // Change A Variable To The New Size, So Other Parts Of The Script Can Use It
                ENGINE.canvas.SizeOfViewport.w = nativeWidth * scaleFitNative
                ENGINE.canvas.SizeOfViewport.h = nativeHeight * scaleFitNative


                // Set The Scale Of The Viewport (All of the stuff Inside Of It will be scaled)
                ENGINE.canvas.ctx.setTransform(
                    scaleFitNative, 0,
                    0, scaleFitNative,
                    0, 0
                );

            } else if (resizeType == Enum.ResizeType.FullScreen) {
                // Set The Canvas Elements Width And Height To The New Size
                canvas.style.width = deviceWidth + "px";
                canvas.style.height = deviceHeight + "px";
                canvas.width = deviceWidth;
                canvas.height = deviceHeight;

                // Change A Variable To The New Size, So Other Parts Of The Script Can Use It
                ENGINE.canvas.SizeOfViewport.w = deviceWidth
                ENGINE.canvas.SizeOfViewport.h = deviceHeight

                ENGINE.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
            }

            if (scaleFitNative < 0.5 && !ENGINE.canvas.TooSmallEventDispatched) { // Check If The Screen Is Small, and a variable is false (Make Sure It Does'nt Get Spammed)
                canvas.dispatchEvent(new Event("ShowScreenTooSmallElement")) // Send a event Saying to Show the Screen too Small Element
                ENGINE.canvas.TooSmallEventDispatched = true // Change The Variable to True, To Make Sure ENGINE Event Does'nt Get Spammed
            } else if (scaleFitNative >= 0.5 && ENGINE.canvas.TooSmallEventDispatched) { // Check If The Screen Is Big Enough, and a variable is true (Make Sure It Does'nt Get Spammed)
                canvas.dispatchEvent(new Event("HideScreenTooSmallElement")) // Send a event Saying to Hide the Screen too Small Element
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
            const rect = ENGINE.canvas.element.getBoundingClientRect();

            e.preventDefault();
            e.stopPropagation();

            const transform = ENGINE.canvas.ctx.getTransform();

            const screenX = parseInt(e.clientX - rect.left);
            const screenY = parseInt(e.clientY - rect.top);

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

            ENGINE.canvas.element.oncontextmenu = () => false;

            ENGINE.InputHandler.addEvents()
            window.addEventListener('blur', () => { ENGINE.canvas.focused = false; ENGINE.VARIABLES.EngineRunning = false }) // Check If the window goes out of focus and stop updating the engine
            window.addEventListener('focus', () => { ENGINE.canvas.focused = true; ENGINE.VARIABLES.EngineRunning = true }) // Check If the window goes into focus and continue updating the engine
            document.addEventListener("mousemove", ENGINE.canvas.onMouseMove); // Get Mouse Position
            ENGINE.canvas.element.addEventListener("mousedown", (e) => {
                e.preventDefault()
                ENGINE.VARIABLES.Events.forEach(element => {
                    if (element.event == `${e.button} Pressed`) if (element.callback) element.callback()
                });
            });
            ENGINE.canvas.element.addEventListener("mouseup", (e) => {
                e.preventDefault()
                ENGINE.VARIABLES.Events.forEach(element => {
                    if (element.event == `${e.button} Released`) if (element.callback) element.callback()
                });
            });
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
    init: async () => {
        setup()
        if (window.localStorage == undefined) { // If The Browser Does not Support localStorage
            console.error("LocalStorage Does Not Exist On this browser please switch Browser") // Logs an Error
        }
        await ENGINE.Load._()
        loaded()

        // Request an animation frame for the first time
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
            const LocalPlayer = ENGINE.GetLocalPlayer()
            //Clamp the camera position to the world bounds while centering the camera around the player
            if (!LocalPlayer.error) {
                ENGINE.VARIABLES.Cam.x += (-LocalPlayer.x + nativeWidth / ENGINE.Config.sideScrollPlayerPosition - ENGINE.VARIABLES.Cam.x) * 5 * ENGINE.VARIABLES.oldDeltaTime
                ENGINE.VARIABLES.Cam.y += (-LocalPlayer.y + nativeHeight / ENGINE.Config.sideScrollPlayerPosition - ENGINE.VARIABLES.Cam.y) * 5 * ENGINE.VARIABLES.oldDeltaTime
                // ENGINE.VARIABLES.Cam.x = clamp(-LocalPlayer.x + nativeWidth / ENGINE.Config.sideScrollPlayerPosition - LocalPlayer.w / 2, -WORLD.size.w + nativeWidth - ENGINE.Config.sideScrollerSideOffset.right, ENGINE.Config.sideScrollerSideOffset.left);
                // ENGINE.VARIABLES.Cam.y = clamp(-LocalPlayer.y + nativeHeight / ENGINE.Config.sideScrollPlayerPosition - LocalPlayer.h / 2, -WORLD.size.h + nativeHeight - ENGINE.Config.sideScrollerSideOffset.bottom, ENGINE.Config.sideScrollerSideOffset.top);
            } else {
                console.error(LocalPlayer.msg)
            }
        }

        ctx.clearRect(0, 0, nativeWidth, nativeHeight) // Clear The Screen For The Next Frame
        ctx.translate(ENGINE.VARIABLES.Cam.x, ENGINE.VARIABLES.Cam.y);
        ctx.scale(1, 1); // Set Scale to 1:1

        ctx.fillStyle = "black" // Reset fill Style
        ctx.globalAlpha = 1 // Reset transparency of the context

        draw(ctx)

        for (let i = 0; i < ENGINE.drawLoop.length; i++) { // Loop Through All Of The Functions In Draw Loop
            const element = ENGINE.drawLoop[i];
            if (element.Draw != undefined) element.Draw(ctx) // If the Index has a draw function, run it
        }

        afterDraw(ctx)
    },

    /**
    * An Update Function That Get Called Every Frame
    * @param {*} deltaTime The Time Between Each Frame
    */
    Update: (timeStamp) => {
        const deltaTime = (timeStamp - ENGINE.VARIABLES.oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
        ENGINE.VARIABLES.oldDeltaTime = deltaTime; // Update oldDeltaTime to the new one
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
            requestAnimationFrame(ENGINE.Update) // Get New Frame and call Update Function Again
            return // End This function
        }

        update(deltaTime)

        for (let i = 0; i < ENGINE.functionLoop.length; i++) {
            const element = ENGINE.functionLoop[i];
            if (element.Update != undefined) element.Update(deltaTime) // If The Update Function Exists, Call it
        }

        for (let i = 0; i < ENGINE.gameObjects.length; i++) { //For Every Single Item In the FunctionLoop
            const element = ENGINE.gameObjects[i]; // For easier typing
            ENGINE.detectCollisions(element) // Do collisions
        }

        ENGINE.Draw() // Draw Function, Used For Drawing All Elements Onto the canvas

        requestAnimationFrame(ENGINE.Update) //Get New Frame and call ENGINE.Update Again
    }
}

function addEngineEvent(event, callback) {
    if (event != undefined) {
        if (callback != undefined) {
            const id = GenerateNewID()
            ENGINE.VARIABLES.Events.push({ event: event, callback: callback, id: id })
            return id
        }
    }
}
function removeEngineEvent(id) {
    for (let i = 0; i < ENGINE.VARIABLES.Events.length; i++) {
        const element = ENGINE.VARIABLES.Events[i];
        if (element.id == id) {
            ENGINE.VARIABLES.Events.splice(i, 1)
        }
    }
}

/**
 * 
 * Game Engine Functions
 * 
 */

function setCanvasBackground(colour = "white") {
    if (!ENGINE.canvas.element) {
        console.error("The Canvas Has Not Been Created Yet, Try createCanvas(true) first");
        return;
    }
    ENGINE.canvas.element.style.backgroundColor = colour
}

/**
 * Create A Canvas
 * @param {*} autoResize If the canvas Should Auto Resize or not
 * @param {*} width The Width Of the Canvas, Do not need a value if auto resize is true
 * @param {*} height The Height of the canvas, Do not need a value if auto resize is true
 */
function createCanvas(autoResize = true, resizeType = Enum.ResizeType.FullScreen, width = 500, height = 500) {
    const canvas = document.createElement("canvas"); // Create the Canvas
    canvas.width = width
    canvas.height = height
    canvas.id = "canvas"
    canvas.style.display = "block"
    canvas.setAttribute("data-resize-type", resizeType) // Set the attribute
    document.body.style.overflow = "hidden"
    document.body.appendChild(canvas) // Add the canvas to the screen
    ENGINE.canvas.element = canvas // Set the canvas
    ENGINE.canvas.element.innerHTML = '<h1>Your Browser Cannot Support HTML5, Please Switch To a Different Browser</h1>' // Used if canvas element does not work, so instead display text saying its not supported
    ENGINE.canvas.addEvents(autoResize) // Add The Necessary Events Onto The Canvas
}

function createTooSmallScreenElement(element) { // No Point in adding this xD

}

function createLoadingScreenFromDOM(element, displayType = "none") { // Prob should remove this and make the user make it manually
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

const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })  
;

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
    const element = document.createElement('a'); // Create a new element
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput)); // Set the elements attribute to the files contents
    element.setAttribute('download', filename); // Set another attribute to tell the browser to download this
    document.body.appendChild(element); // Add the download tag to the document
    element.click(); // Click on the tag (To download it)
    document.body.removeChild(element); // Remove the tag from the document
}

/**
 * A function for filling Text Onto the canvas, can also wrap text
 * @param {*} text The Text That Wil Be Displayed
 * @param {*} x The Position Of The Text Horizontally
 * @param {*} y The Position Of The Text Vertically
 * @param {*} maxWidth Maximum WIdth Of The Text (Will Wrap The Words)
 * @param {*} lineHeight The Line Height Of The Words (For Different Fonts)
 */
function fillText(text, x, y, maxWidth = undefined, lineHeight = undefined) {
    const context = ENGINE.canvas.ctx
    if (!context) throw new Error("The context is not defined, please create the canvas first")
    if (!maxWidth) {
        context.fillText(text, x, y)
        return
    }
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
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

        this.img = ""

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

    setImg(src, isImage = false) {
        return new Promise((resolve, reject) => {
            if (isImage) {
                this.img = src
                resolve()
            }
            else {
                const image = new Image()
                image.onload = () => {
                    resolve()
                }
                image.src = src
                this.img = image
            }
        });
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
        if (this.img) ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        else {
            // Draw a simple square
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
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

    move(movement) {
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
                    this.move("d")
                break;

            case "d":
                if (!ENGINE.InputHandler.keys_down.a)
                    this.vx = 0;
                else
                    this.move("a")
                break;
        }
    }

    Draw(ctx) { 
        if (this.img) ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        else {
            // Draw a simple square
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.w, this.h);
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
    data: [ // This is the data, but with numbers
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
     * Change the size of the world in pixels
     * @param {*} w Width Of The World (Will be divided by the tile size)
     * @param {*} h Height Of The World (Will be divided by the tile size)
     */
    ChangeWorldSize(w, h) {
        return new Promise((resolve, reject) => {
            let W = w / WORLD.blockSize
            let H = h / WORLD.blockSize
            W = Math.round(W)
            H = Math.round(H)

            this.data = []
            for (let i = 0; i <= W; i++) {
                let iData = []
                for (let j = 0; j <= H; j++) {
                    iData.push(0)
                }
                this.data.push(iData)
            }

            this.regenerate(this.data)
            resolve()
        });
    },

    /**
     * Check the tile at the specific coordinates
     * @param {*} tileIndex The Coordinates in i, and j (being y and x)
     * @returns false if tile does not exist, or the tile if it exists
     */
    checkTile(tileIndex /*{i:i, j:j}*/) {
        if (WORLD.tiles[tileIndex.i]) {
            if (WORLD.tiles[tileIndex.i][tileIndex.j] == undefined || WORLD.tiles[tileIndex.i][tileIndex.j]) {
                return WORLD.tiles[tileIndex.i][tileIndex.j]
            }
        }
        return false
    },

    /**
     * Set the tile at the specific coordinates
     * @param {*} tileIndex The Coordinates in i, and j
     * @param {*} element The Element to change it too
     * @returns Tile Added
     */
    setTile(tileIndex /*{i:i, j:j}*/, element) {
        WORLD.deleteTile(tileIndex)
        if (element === undefined || element instanceof gameObject)
            WORLD.tiles[tileIndex.i][tileIndex.j] = element

        return WORLD.tiles[tileIndex.i][tileIndex.j]
    },

    deleteTile(tileIndex /*{i:i, j:j}*/) {
        if (WORLD.tiles[tileIndex.i][tileIndex.j]) {
            WORLD.tiles[tileIndex.i][tileIndex.j].Destroy()
            WORLD.tiles[tileIndex.i][tileIndex.j] = undefined
        }
    }
}

/**
 * A Stat Function For Getting Stats
 * @returns An Object With Lots Of Abilities
 * @author Modified From mrdoob / http://mrdoob.com/
 */
const STATS = {
    new() {

        var latestFPS = undefined
        var latestMS = undefined
        var latestPing = undefined
        var mode = 0
        var container = document.createElement('div')

        container.style.cssText = 'position:fixed;top:0;left:0;opacity:0.9;z-index:10000'
        container.addEventListener('click', function (event) {
            event.preventDefault()
            showPanel(++mode % container.children.length)
        }, false)

        function addPanel(panel) {
            container.appendChild(panel.dom)
            return panel
        }
        function showPanel(id) {
            for (var i = 0; i < container.children.length; i++) {
                container.children[i].style.display = i === id ? 'block' : 'none'
            }
            mode = id
        }

        var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0
        const fpsPanel = addPanel(new this.Panel('FPS', '#b0b0b0', '#001'))
        const msPanel = addPanel(new this.Panel('MS', '#b0b0b0', '#001'))
        // const pingPanel = addPanel(new this.Panel('Ping', '#0ff', '#001'))
        showPanel(0)

        return {
            REVISION: 16,
            dom: container,

            getFPSPanel: () => {
                return fpsPanel
            },
            getMSPanel: () => {
                return msPanel
            },
            addPanel: addPanel,
            showPanel: showPanel,
            getFPS: function () {
                return latestFPS;
            },
            getMS: function () {
                return latestMS;
            },
            getPing: function () {
                return latestPing;
            },
            begin: function () {

                beginTime = (performance || Date).now()

            },
            end: function () {

                frames++

                var time = (performance || Date).now()

                msPanel.update(time - beginTime, 200)
                latestMS = time - beginTime

                if (time >= prevTime + 35) { // Should be 1000 for accurate representation

                    fpsPanel.update((frames * 1000) / (time - prevTime), 100)
                    latestFPS = (frames * 1000) / (time - prevTime)

                    prevTime = time
                    frames = 0
                }

                // Need to get ping

                return time
            },
            update: function () {
                beginTime = this.end()
            },
            autoLoad: function () {
                /*
                    // Before Hand
                    document.body.appendChild(stats.dom);
                    requestAnimationFrame(function loop() {
                        stats.update();
                        requestAnimationFrame(loop)
                    });
                */
                const update = this.end
                document.body.appendChild(container);
                requestAnimationFrame(function loop() {
                    beginTime = update()
                    requestAnimationFrame(loop)
                });
            }
        }
    },
    Panel: class {
        constructor(name, fg, bg) {
            var min = Infinity
            var max = 0
            var graph = true

            const PR = round(window.devicePixelRatio || 1)
            const WIDTH = 80 * PR
            const HEIGHT = 48 * PR
            const TEXT_X = 3 * PR
            const TEXT_Y = 2 * PR
            const GRAPH_X = 3 * PR
            const GRAPH_Y = 15 * PR
            const GRAPH_WIDTH = 74 * PR
            const GRAPH_HEIGHT = 30 * PR

            const canvas = document.createElement('canvas')
            canvas.width = WIDTH
            canvas.height = HEIGHT
            canvas.style.cssText = 'width:80px;height:48px'

            const ctx = canvas.getContext('2d')
            ctx.globalAlpha = 0.6;
            ctx.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
            ctx.textBaseline = 'top';

            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            // ctx.fillStyle = fg;
            // ctx.fillText( name, TEXT_X, TEXT_Y );
            // ctx.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

            // ctx.fillStyle = bg;
            // ctx.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

            return {
                dom: canvas,
                textBackgroundShow: true,

                showGraph: () => {
                    graph = true
                    ctx.fillStyle = bg;
                    ctx.globalAlpha = 0.6
                    ctx.clearRect(0, 0, WIDTH, HEIGHT)
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);
                },

                hideGraph: () => {
                    graph = false

                    ctx.clearRect(0, 0, WIDTH, HEIGHT);
                },

                update: function (value, maxValue) {
                    min = Math.min(min, value);
                    max = Math.max(max, value);

                    ctx.fillStyle = bg;
                    ctx.globalAlpha = 0.6;
                    ctx.clearRect(0, 0, WIDTH, GRAPH_Y)
                    if (this.textBackgroundShow) ctx.fillRect(0, 0, WIDTH, GRAPH_Y);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = fg;
                    ctx.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

                    if (graph) {
                        ctx.fillStyle = fg;
                        ctx.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

                        ctx.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

                        ctx.fillStyle = bg;
                        ctx.globalAlpha = 0.5;
                        ctx.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));
                    }

                }
            }

        }
    }
}


const PERLIN = {
    data: undefined,
    Config: {
        PERLIN_YWRAPB: 4,
        PERLIN_YWRAP: 1 << 4, // The 4 Should Be PERLIN_YWRAPB
        PERLIN_ZWRAPB: 8,
        PERLIN_ZWRAP: 1 << 8, // The 8 Should Be PERLIN_ZWRAPB
        PERLIN_SIZE: 4095,
        perlin_octaves: 4, // default to medium smooth
        perlin_amp_falloff: 0.5 // 50% reduction/octave
    },
    /**
    * Used to create a seed for perlin noise
    * @param {*} seed Could be any number or letters
    */
    noiseSeed: (seed) => {
        // Set Some Variable Names For Easier Use In Code
        let PERLIN_SIZE = PERLIN.Config.PERLIN_SIZE;

        // Linear Congruential Generator
        // Variant of a Lehman Generator
        const lcg = (() => {
            // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
            // m is basically chosen to be large (as it is the max period)
            // and for its relationships to a and c
            const m = 4294967296;
            // a - 1 should be divisible by m's prime factors
            const a = 1664525;
            // c and m should be co-prime
            const c = 1013904223;
            let seed, z;
            return {
                setSeed(val) {
                    // pick a random seed if val is undefined or null
                    // the >>> 0 casts the seed to an unsigned 32-bit integer
                    z = seed = (val == null ? Math.random() * m : val) >>> 0;
                },
                getSeed() {
                    return seed;
                },
                rand() {
                    // define the recurrence relationship
                    z = (a * z + c) % m;
                    // return a float in [0, 1)
                    // if z = m then z / m = 0 therefore (z % m) / m < 1 always
                    return z / m;
                }
            };
        })();

        lcg.setSeed(seed);
        PERLIN.data = new Array(PERLIN_SIZE + 1);
        for (let i = 0; i < PERLIN_SIZE + 1; i++) {
            PERLIN.data[i] = lcg.rand();
        }
    },
    /**
    * Used to return a point in perlin noise
    * @param {*} x Can be used to get the position of 1D perlin noise
    * @param {*} y Can be used to get the position of 2D perlin Noise
    * @param {*} z Can be used to get the position of 3D perlin Noise
    * @returns Returns the point in the perlin noise
    */
    noise: (x, y = 0, z = 0) => {
        // Set Some Variable Names For Easier Use In Code
        let PERLIN_YWRAPB = PERLIN.Config.PERLIN_YWRAPB;
        let PERLIN_YWRAP = PERLIN.Config.PERLIN_YWRAP << PERLIN_YWRAPB;
        let PERLIN_ZWRAPB = PERLIN.Config.PERLIN_ZWRAPB;
        let PERLIN_ZWRAP = PERLIN.Config.PERLIN_ZWRAP << PERLIN_ZWRAPB;
        let PERLIN_SIZE = PERLIN.Config.PERLIN_SIZE;
        let perlin_octaves = PERLIN.Config.perlin_octaves; // default to medium smooth
        let perlin_amp_falloff = PERLIN.Config.perlin_amp_falloff; // 50% reduction/octave

        if (PERLIN.data == null) {
            PERLIN.data = new Array(PERLIN_SIZE + 1);
            for (let i = 0; i < PERLIN_SIZE + 1; i++) {
                PERLIN.data[i] = Math.random();
            }
        }

        if (x < 0)
            x = -x;
        if (y < 0)
            y = -y;
        if (z < 0)
            z = -z;

        let xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
        let xf = x - xi;
        let yf = y - yi;
        let zf = z - zi;
        let rxf, ryf;

        let r = 0;
        let ampl = 0.5;

        let n1, n2, n3;

        for (let o = 0; o < perlin_octaves; o++) {
            let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

            rxf = scaled_cosine(xf);
            ryf = scaled_cosine(yf);

            n1 = PERLIN.data[of & PERLIN_SIZE];
            n1 += rxf * (PERLIN.data[(of + 1) & PERLIN_SIZE] - n1);
            n2 = PERLIN.data[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n2 += rxf * (PERLIN.data[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);

            of += PERLIN_ZWRAP;
            n2 = PERLIN.data[of & PERLIN_SIZE];
            n2 += rxf * (PERLIN.data[(of + 1) & PERLIN_SIZE] - n2);
            n3 = PERLIN.data[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n3 += rxf * (PERLIN.data[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);

            n1 += scaled_cosine(zf) * (n2 - n1);

            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;

            if (xf >= 1.0) {
                xi++;
                xf--;
            }
            if (yf >= 1.0) {
                yi++;
                yf--;
            }
            if (zf >= 1.0) {
                zi++;
                zf--;
            }
        }
        return r;
    }
}








/**
 * Simpler functions
 */
const round = Math.round
const floor = Math.floor
const getElementById = (elementId) => { return document.getElementById(elementId) }
const createElement = (elementName) => { return document.createElement(elementName) }
const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));
const noise = PERLIN.noise
const noiseSeed = PERLIN.noiseSeed

/**
 * Drawing Functions
 */
const fillRect = (x, y, w, h, c = undefined) => {
    const ctx = ENGINE.canvas.ctx
    if (!ctx) throw new Error("The context is not defined, please create the canvas first")
    if (c) ctx.fillStyle = c
    ctx.fillRect(x, y, w, h)
}
const strokeRect = (x, y, w, h, c = undefined, lineWidth = 1) => {
    const ctx = ENGINE.canvas.ctx
    if (!ctx) throw new Error("The context is not defined, please create the canvas first")
    if (c) ctx.fillStyle = c
    if (lineWidth) ctx.lineWidth = lineWidth
    ctx.strokeRect(x, y, w, h)
}

/**
 * Event Functions
 */
setup = () => { return };
update = (deltaTime) => { return };
draw = (ctx) => { return };
afterDraw = (ctx) => { return };
loaded = () => { return };
inputUp = (e) => { return };
inputDown = (e) => { return };





window.onload = () => {
    ENGINE.init()
}