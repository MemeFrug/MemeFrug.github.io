
/**
 * 
 * Used in the Animate Function For Returning a timeFraction to the power of 2
 * 
 */
function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

/**
 * @param {*} timing The Time Fraction Used For 
 * @param {*} draw The Function Used For Drawing Each Frame
 * @param {*} duration The Duration Of The Animation
 * @param {*} max The Max Number It Can Reach 0 - 1
 * @returns A Promise used for await only returns a resolve()
 */
function animate(timing, draw, duration, max) {

    return new Promise((resolve, reject) => {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > max) timeFraction = max;

            // calculate the current animation state
            let progress = timing(timeFraction);

            draw(progress); // draw it

            if (timeFraction < max) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }

        });
    })
}

/**
 * When the Window Loads
 */
window.onload = async () => {
    await animate(quad, Animations.title_position, 2000, 0.8)
    await animate(quad, Animations.opacity_buttons, 1000, 1)
    console.log("Animation Finished");
}

/**
 * When Clicks Play Button Play An Animation to Remove The Buttons with an opacity
 */
async function Play() {
    await animate((time) => { return time }, Animations.opacity_buttons_none, 2000, 1) // Play An Animation, but wait till it it resoved by the Promise
    MainMenuElementDOM.style.display = "none" // Remove The Buttons Completely so they dont get into the way
    document.getElementById("Settings-Button").removeEventListener("mouseup", Settings)
    document.getElementById("Back-Button").removeEventListener("mouseup", BackToHub)
    document.getElementById("Play-Button").removeEventListener("mouseup", Play)
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
 * Check When The Window is being focussed and not, and change a variable depending on that
 */
window.onblur = () => {
    _IsFocused = false;
}
window.onfocus = () => {
    _IsFocused = true;
}

/**
 * Detect When A Button Is Pressed
 */
document.getElementById("Back-Button").addEventListener("mouseup", BackToHub) // When the Back to hub button is clicked
document.getElementById("Settings-Button").addEventListener("mouseup", Settings) // When the settings button is clicked
document.getElementById("Play-Button").addEventListener("mouseup", Play) // Start The Play Function