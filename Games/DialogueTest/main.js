const loadingScreen = createLoadingScreenFromDOM(document.getElementById("LoadingElement"), "flex")
const SideLaugh = document.createElement("img")
const Default = document.createElement("img")
const TextToSay = "Are You Ready???"
let ImageShowing = Default
let TextShowing = ""
let PageInteracted = false

async function ReadText(Text = TextToSay) {
    return new Promise(async (resolve, reject) => {
        TextShowing = ""
        ImageShowing = Default
        for (let i = 0; i < Text.length; i++) {
            const element = Text[i];
            const SansAudio = new Audio("./Assets/snd_txtsans.wav")
            SansAudio.volume = 0.3
            SansAudio.play()
            TextShowing += element
            if (element == ",") {
                await sleep(500)
                ImageShowing = SideLaugh
            } else if (element == "?") {
                await sleep(700)
            }else {
                await sleep(80)
            }
        }
        await sleep(500)
        ImageShowing = Default
        resolve()
    });
}

function setup() {
    createCanvas(true)
    SideLaugh.src = "./Assets/side_laugh.png"
    Default.src = "./Assets/default.png"
}

async function onload() {
    loadingScreen.destroy()
}

listen("click", async () => {
    if (PageInteracted == false) {
        PageInteracted = true
        for (let i = 0; i < Dialogue[0].Dialogue.length; i++) {
            const element = Dialogue[0].Dialogue[i];
            await ReadText(element.text)
            await sleep(element.sleep)
        }
        console.log("Finished");
    }
})

function draw(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.6, ENGINE.Config.nativeWidth / 2, 300)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 9
    ctx.strokeRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.6, ENGINE.Config.nativeWidth / 2, 300)
    ctx.drawImage(ImageShowing, 500, 700, 250, 250)
    ctx.fillStyle = "rgb(216, 216, 216)"
    ctx.font = "40px DTM-Sans"
    ctx.fillText("*", 720, 800)
    wrapText(ctx, TextShowing, 760, 800, 650, 40)
}