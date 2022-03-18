const Game = new _("StoryGame");
const player = new Player(Game, !1, 0, 10, 50, 50, 100, 500, -650);
const world = new World(levelData, Game);
const MainMenuElementDOM = document.getElementById("MainMenu");
const TitleButtonsDOM = document.getElementById("title-buttons");
const TooSmallElement = document.getElementById("Screen-Too-Small-Element")
const TitleDOM = document.getElementById("title");
const ButtonsInContainerDOM = document.getElementsByClassName("button_container");
const SaveData = { Settings: { SkipDialogue: false, BackgroundColour: "#000000", Debug: false } }
const walls = []
const rays = []
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


// Custom Move Code the incorporate the 's' key
// player._Move = (movement) => {
//     switch (movement) { // Make a switch statement
//         case "w":
//             player.vy = -player.speed // set the vertical velocity to jump
//             break;

//         case "a":
//             player.vx = -player.speed // Make the speed negative to it goes the opposite way (-x)
//             break;

//         case "d":
//             player.vx = player.speed // Make the x velocity positive of the speed so it goes right
//             break;

//         case "s":
//             player.vy = player.speed
//     }
// }
// // Custom Stop Moving Code, to incorporate the 's' key and to make the 'w' key incorporate the 's' key aswell
// player._stopMoving = (movement) => {
//     switch (movement) {
//         case "w":
//             if (!Game.inputHandler.keys_down.s)
//                 player.vy = 0
//             else
//                 player._Move("s")
//             break;
//         case "a":
//             if (!Game.inputHandler.keys_down.d)
//                 player.vx = 0;
//             else
//                 player._Move("d")
//             break;

//         case "d":
//             if (!Game.inputHandler.keys_down.a)
//                 player.vx = 0;
//             else
//                 player._Move("a")
//             break;

//         case "s":
//             if (!Game.inputHandler.keys_down.w)
//                 player.vy = 0
//             else
//                 player._Move("w")
//             break
//     }
// }
player.c = "red" // Set the colour of the player from default: black to red
// player.gravityMax = -300 // Set the gravity max, so gravity is'nt applied, is -300 because when jumping the velocity y gets set to -300, so make sure gravityMax is -300 so it does'nt affect the jumping
Game.Config.sideScroller = true // Sets The Camera To Be Moveable
Game.Config.boundaries.left = 0 // Set the Boundaries
Game.Config.boundaries.right = Game.Config.WorldSize.x - player.w
Game.Config.sideScrollerSideOffset.left = 10 // Set the camera offset on the edges
Game.Config.sideScrollerSideOffset.top = 10000
Game.Config.sideScrollerSideOffset.bottom = 10000
Game.Config.sideScrollerSideOffset.right = 10000
Game.addPlayer(player, true)
const secondPlayer = new Player(Game)
Game.addPlayer(secondPlayer)