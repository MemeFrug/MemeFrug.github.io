const loadingScreen = createLoadingScreenFromDOM(document.getElementById("LoadingElement"), "flex")
const SideLaugh = document.createElement("img")
const Default = document.createElement("img")
const TextToSay = "Woah, whatcha doing there son???"
let ImageShowing = Default
let TextShowing = "* "

function setup() {
    createCanvas(true)
    SideLaugh.src = "./Assets/side_laugh.png"
    Default.src = "./Assets/default.png"
}

async function onload() {
    loadingScreen.destroy()
    
    for (let i = 0; i < TextToSay.length; i++) {
        const element = TextToSay[i];
        TextShowing += element
        if (element == ",") {
            await sleep(500)
            ImageShowing = SideLaugh
        } else if (element == "?") {
            await sleep(700)
        }else {
            await sleep(50)
        }
    }
}

function draw(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.6, ENGINE.Config.nativeWidth / 2, 300)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 9
    ctx.strokeRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.6, ENGINE.Config.nativeWidth / 2, 300)
    ctx.fillStyle = "rgb(216, 216, 216)"
    ctx.font = "40px DTM-Sans"
    ctx.fillText(TextShowing, 750, 800)
    ctx.drawImage(ImageShowing, 500, 700, 250, 250)
}