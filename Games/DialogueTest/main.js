console.log("main.js loaded");

createCanvas(true)
createLoadingScreen(document.getElementById("LoadingElement"), "flex")

function setup() {
    console.log("setup")
}

function update() {
    console.log("Funny Update")
}

ENGINE.Init()