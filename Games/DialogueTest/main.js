const loadingScreen = createLoadingScreenFromDOM(document.getElementById("LoadingElement"), "flex")
const SideLaugh = document.createElement("img")
const Default = document.createElement("img")
let PageInteracted = false

function setup() {
    createCanvas(true)
    SideLaugh.src = "./Assets/side_laugh.png"
    Default.src = "./Assets/default.png"
    ImageShowing = Default
    Dialogue = [
        {
            Dialogue: [
                {text: "Okay, That was pretty Impressive.", sleep: 500, image: SideLaugh},
                {text: "Now try this!", sleep: 500},
                {text: "Wait, NO!", sleep: 200, image: SideLaugh},
                {text: "What Are you doing!", sleep: 700},
                {text: "That is incredibly sussy moment.", sleep: 1000, image: SideLaugh},
                {text: "", sleep: 1500},
                {text: "Okay Now your just being weird...", sleep: 100},
            ]
        }
    ]
}

async function loaded() {
    loadingScreen.destroy()
}

listen("click", async () => {
    if (PageInteracted == false) {
        PageInteracted = true
        await ReadDialogue(Dialogue[0])
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
    fillText(ctx, "*", 720, 800)
    fillText(ctx, TextShowing, 760, 800, 650, 40)
}