const Game = new _("StoryGame");
const player = new Player(Game, !1, 0, 10, 50, 50, 100, 500, -650);
const MainMenuElementDOM = document.getElementById("MainMenu");
const TitleButtonsDOM = document.getElementById("title-buttons");
const TooSmallElement = document.getElementById("Screen-Too-Small-Element")
const TitleDOM = document.getElementById("title");
const ButtonsInContainerDOM = document.getElementsByClassName("button_container");
const SaveData = { Settings: { SkipDialogue: false, BackgroundColour: "#000000", Debug: false } }
const rays = []
let drawDebugLines = true
let walls = []
player.c = "red" // Set the colour of the player from default: black to red
Game.Config.TooSmallScreen = document.getElementById("Screen-Too-Small-Element")
Game.Config.sideScroller = true // Sets The Camera To Be Moveable
Game.Config.boundaries.left = 0 // Set the Boundaries
Game.Config.boundaries.right = Game.Config.WorldSize.x - player.w
Game.Config.sideScrollerSideOffset.left = 10 // Set the camera offset on the edges
Game.Config.sideScrollerSideOffset.top = 10000
Game.Config.sideScrollerSideOffset.bottom = 10000
Game.Config.sideScrollerSideOffset.right = 10000
Game.addPlayer(player, true)
World.init() // Start World