console.log('Loaded globalVariables.js');

//Sleep Function
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

//MainMenu ------------------------------
const MainMenu = document.getElementById('MainMenu')

//Ui Elements
const ListOfOptions = document.getElementById('ListOfOptions')

//Settings ui
const SettingsDiv = document.getElementById('Settings')

//How to Play ui
const HowToPlayDiv = document.getElementById('HowToPlaydiv')

//Settings Buttons
const SettingsBack = document.getElementById('BackSettings').addEventListener('mouseup', () => {
    ListOfOptions.style.display = 'inherit'
    SettingsDiv.style.display = 'none'
})

const SettingsButton = document.getElementById('SettingsButton').addEventListener('mouseup', () => {
    ListOfOptions.style.display = 'none'
    SettingsDiv.style.display = 'inherit'
})
//--------------

//How to Play Buttons
const HTPBut = document.getElementById('HowToPlay').addEventListener('mouseup', () => {
    ListOfOptions.style.display = 'none'
    HowToPlayDiv.style.display = 'inherit'
})

const HTPBack = document.getElementById('BackHTP').addEventListener('mouseup', () => {
    ListOfOptions.style.display = 'inherit'
    HowToPlayDiv.style.display = 'none'
})
//---------------

//Log Out Button
const LogOut = document.getElementById('LogOut')
LogOut.addEventListener('mouseup', () => {
    if (LogOut.style.opacity == 1){
        localStorage.clear()
        location.reload()
    }
})
//--------------

//PlayButton
const PlayButton = document.getElementById('PlayButton').addEventListener('mouseup', StartGame)
//---------------

//------------------------- End of MainMenu

//GameScreen-------------------------------
const GameScreenDiv = document.getElementById('GameScreen')

//Tutorial-------
const TutorialDiv = document.getElementById('Tutorial')

//Variables
var EndTutorialBut;

//-End of Tutorial

//Infomation Panel------
//ui elements

//divs
const InformationDiv = document.getElementById('Infomationid')

const ShopDiv = document.getElementById('Shop')

//Variables ui
const AmountofMoney = document.getElementById('Amount of Money')

const Popularity = document.getElementById('popularity')

//Buttons
const ShopTo = document.getElementById("ChangeToShop").addEventListener('mouseup', () => {
    InformationDiv.style.display = 'none';
    ShopDiv.style.display = 'inherit';
})
const ShopBack = document.getElementById("ShopBack").addEventListener('mouseup', () => {
    InformationDiv.style.display = 'inherit';
    ShopDiv.style.display = 'none';
})

const AutoSaveui = document.getElementById('Autosaveon')

const AutosaveTo = document.getElementById('SaveSession').addEventListener('mouseup', () => {
    if (isautosaveon == false) {
        isautosaveon = true
        AutoSaveui.textContent = 'On'
    }else {
        isautosaveon = false
        AutoSaveui.textContent = 'Off'
    }
})


//--End Infomation screen

//Logged in as ui
const Loggedinas = document.getElementById('loggedinas')

//Canvas Var
var canvas;
var ctx;
//----------
//Character Vars
let NameofChar;
let character;

//-----------------------End of GameScreen

//Game Variables
let totalmoney = 0;
let popularityamt = 0;
let isautosaveon = false;

//loop
let lastTime = 0;

//Images
var bush = new Bush(1,1,50,50)

//Saves
let SavedName = localStorage.getItem('Name')
console.log('Saved name is', SavedName);
if (SavedName == null){
    console.log('No Save File')
}else {
    LogOut.style.opacity = '100%'
    NameofChar = SavedName
}
