console.log("Loaded Onload");

//AUDIO
const background1 = new Audio('./Assets/Audio/background1.wav');
background1.loop = true

//Variables
const canvascontainer = document.getElementById("canvascontainer");
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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
    //Check if username is valid
    username = cleanUsername(usernameInputElement.value);
    console.log(username);
    _Init();
}

async function _Init() {

    windowResize()
    
    let mainMenuElement = document.getElementById("loginMenuContainer");
    mainMenuElement.style.display = "none";
    document.getElementById("Loading").style.display = "block"

    await _GenerateWorld();

    stopwatch = new Stopwatch(Time, Times);

    //Make the character
    character = new Character()
    const originalSpeed = character.speedmax //Get original Speed
    character.speedmax = 0
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

    //Play Sound
    background1.play()
    
    //Set original Speed
    character.speedmax = originalSpeed
}

function Onload() {
    const LeaderBoard = document.getElementById("LeaderBoard_Content");
    const Data = JSON.parse(LoadData());
    if (Data == null) LeaderBoard.innerHTML = ""
    else { 
        Data.sort(function(a, b){
            let aAfter = a.time.replaceAll(":", "")
            let bAfter = b.time.replaceAll(":", "")
            return aAfter-bAfter
        })
        for (let i = 0; i < Data.length; i++) {
            const element = Data[i];
            const li = document.createElement('li')
            const text = document.createTextNode(`${element.username} ${element.time}`)
            li.appendChild(text)
            LeaderBoard.appendChild(li)
        }
    }
}

window.onload = Onload;