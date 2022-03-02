/**
 * When the Window Loads
 */
window.onload = async () => {
    new Audio('./Assets/Audio/masterpiece.mp3').play(); // MainMenu Music.play(); // Start The Main Music Audio (DEBUG)
    await animate(_Quad, Animations.title_position, 2000, 0.8)
    await animate(_Quad, Animations.opacity_buttons, 1000, 1)
}

/**
 * When Clicks Play Button Play An Animation to Remove The Buttons with an opacity
 */
async function Play() {
    //Remove the Event Listeners for the buttons
    document.getElementById("Settings-Button").removeEventListener("mouseup", Settings)
    document.getElementById("Back-Button").removeEventListener("mouseup", BackToHub)
    document.getElementById("Play-Button").removeEventListener("mouseup", Play)

    await animate((time) => { return time }, Animations.opacity_buttons_none, 2000, 1) // Play An Animation, but wait till it it resoved by the Promise
    MainMenuElementDOM.style.display = "none" // Remove The Buttons Completely so they dont get into the way

    Game._Init() // Start The Game
}

/**
 * Opens up the settings menu
 */
async function Settings() {

}

/**
 * Changes The Page To The Main Hub Of the Webstie
 */
async function BackToHub() {
    window.location.replace("../../index.html"); // Send The Player Back to The Hub
}

/**
 * Detect When A Button Is Pressed
 */
document.getElementById("Back-Button").addEventListener("mouseup", BackToHub) // When the Back to hub button is clicked
document.getElementById("Settings-Button").addEventListener("mouseup", Settings) // When the settings button is clicked
document.getElementById("Play-Button").addEventListener("mouseup", Play) // Start The Play Function