const Game = new _("StoryGame");
const player = new Player(Game, !1, 10, 10, 50, 50, 100, 300, -500);
const world = new World(levelData, Game);
const MainMenuElementDOM = document.getElementById("MainMenu");
const TitleButtonsDOM = document.getElementById("title-buttons");
const TooSmallElement = document.getElementById("Screen-Too-Small-Element")
const TitleDOM = document.getElementById("title");
const ButtonsInContainerDOM = document.getElementsByClassName("button_container");
const SaveData = { Settings: { SkipDialogue: false, BackgroundColour: "#000000", Debug: false } }
const _Levels = [
    { 
        Name: "Tutorial", 
        Data: { Objects: {}, Dialogue: [] } 
    }, 
    { 
        Name: "Level 1",
    }, 
    {
        Name: "Level 2",
    }, 
    { 
        Name: "Level 3",
    }, 
    {
        Name: "Level 4",
    }, 
    {
        Name: "Level 5",
    }
];

player.c = "red" // Set the colour of the player from default: black to red
Game.Config.sideScroller = true // Sets The Camera To Be Moveable
Game.Config.boundaries.left = 0 // Set the Boundaries
Game.Config.boundaries.right = Game.Config.WorldSize.x - player.w 
Game.Config.sideScrollerSideOffset.left = 10 // Set the camera offset on the edges
Game.Config.sideScrollerSideOffset.top = 10
Game.Config.sideScrollerSideOffset.bottom = 10
Game.Config.sideScrollerSideOffset.right = 10
Game.addPlayer(player, true)