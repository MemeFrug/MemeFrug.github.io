console.log('loaded main.js');

//Variables

addEventListener('mousemove', (pos) => {
    //console.log('X:', pos.clientX, 'Y:', pos.clientY); DEBUG
})

//UI
const MainMenuDiv = document.getElementById('MainMenu');
const MainMenuDiv2 = document.getElementById('Butttons');
const HowToPlay = document.getElementById('Howtoplay');
const LevelSelectorDiv = document.getElementById('LevelSelector');
const GameScreen = document.getElementById('GameScreen');
console.log(HowToPlay);

//Buttons
const PlayBut = document.getElementById('Play').addEventListener('mouseup', () => {
    MainMenuDiv.style.display = 'none';
    LevelSelectorDiv.style.display = 'inherit'
    StartGame()
})

const HTPBut = document.getElementById('HTP').addEventListener('mouseup', () => {
    console.log('Going to How to PLya page');
    MainMenuDiv2.style.display = 'none';
    HowToPlay.style.display = 'inherit';
})

const BackToMain = document.getElementById('BackToMain').addEventListener('mouseup', () => {
    MainMenuDiv2.style.display = 'inherit';
    HowToPlay.style.display = 'none';
})

//Canvas
const canvas = document.getElementById('Canvas')
const ctx = canvas.getContext('2d');

//Functions
new inputhandler
var character = new arrowkeys

function StartGame() {
    console.log('Starting Game')
}