let Dialogue = []

let ImageShowing = undefined
let TextShowing = ""

async function ReadText(Text) {
    return new Promise(async (resolve, reject) => {
        TextShowing = ""
        for (let i = 0; i < Text.length; i++) {
            const element = Text[i];
            const SansAudio = new Audio("./Assets/snd_txtsans.wav")
            SansAudio.volume = 0.3
            SansAudio.play()
            TextShowing += element
            if (element == ",") {
                await sleep(500)
            } else if (element == "?") {
                await sleep(700)
            } else if (element == "!") {
                await sleep(300)
            } else if (element == ".") {
                await sleep(700)
            }else {
                await sleep(70)
            }
        }
        resolve()
    });
}

async function ReadDialogue(Scene) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < Scene.Dialogue.length; i++) {
            const element = Scene.Dialogue[i];
            if (element.image) ImageShowing = element.image
            if (element.text) await ReadText(element.text)
            if (element.sleep) await sleep(element.sleep)
        }
        resolve() 
    });
}