const Canvas = document.getElementById("canvas")
let ctx = Canvas.getContext("2d")

const MainMenuElement = document.getElementById("MainMenu")
var isonfocus = true;

function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

const Animations = {
    title_position: (progress) => {
        console.log(progress * 100);
        document.getElementById("title-buttons").style.height = progress * 100 + "%"
    },
    
    opacity_buttons: (progress) => {
        var TextElements = document.getElementsByClassName("button_container");
    
        for (var i = 0, max = TextElements.length; i < max; i++) {
            TextElements[i].style.opacity = progress;
        }
    },
    
    opacity_buttons_none: (progress) => {
        var TextElements = document.getElementsByClassName("button_container");
    
        for (var i = 0, max = TextElements.length; i < max; i++) {
            TextElements[i].style.opacity = progress - 1;
            console.log(progress - 1);
        }
    },

    people: (progress) => {
        ctx.globalAlpha = progress
    }
}

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

async function _Init() {
    console.log("_Init()");
    if (isonfocus) {
        await animate(quad, Animations.title_position, 2000, 0.8)
        await animate(quad, Animations.opacity_buttons, 1000, 1)

        console.log("Animation Finished");
    } else {
        console.log("window not in focus");
        setTimeout(() => {
            _Init()
        }, 1000);
        return;
    }
}

async function Play() {
    await animate(quad, Animations.opacity_buttons_none, 2000, 1)
    MainMenuElement.style.display = "none"
    await animate(quad, Animations.opacity_buttons, 2000, 0.8)
}

window.onload = _Init

window.onblur = function () {
    isonfocus = false;
}
window.onfocus = function () {
    isonfocus = true;
}

document.getElementById("Back-Button").addEventListener("mouseup", () => {
    window.location.replace("../../index.html");
})

document.getElementById("Settings-Button").addEventListener("mouseup", () => {
    
})

document.getElementById("Play-Button").addEventListener("mouseup", Play)