console.log("Loaded Onload");

//Variables
const canvascontainer = document.getElementById("canvascontainer");
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let username = "";

function cleanUsername(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    //Remove Spaces
    
    return output.split(" ").join("");
}

function MainMenuPlay() {
    //Check the input element
    let usernameInputElement = document.getElementById("NameOfPlayer");
    username = usernameInputElement.value;
    //Check if username is valid
    username = cleanUsername(username);
    _Init();
}

async function _Init() {

    windowResize()

    await _GenerateWorld();

    let mainMenuElement = document.getElementById("loginMenuContainer");
    mainMenuElement.style.display = "none";
    document.getElementById("Loading").style.display = "block"

    stopwatch = new Stopwatch(Time, Times);

    //Make the character
    character = new Character()
    await character.LoadAnims()
    //Make sure the player is on the first block with a little offset
    character.y = Worlds[WorldIn].Objects[0].y - character.w - 100

    //Show the window
    document.getElementById("Loading").style.display = "none"
    canvas.style.display = "block";

    //Create the inputs
    inputhandler = new InputHandler()

    _AddEventListeners();
    _Draw();
    stopwatch.start()
}