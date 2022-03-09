async function BackToHub() {window.location.replace("../../index.html");}
async function Play() {
    document.getElementById("Back-Button").removeEventListener("mouseup", BackToHub);
    document.getElementById("Play-Button").removeEventListener("mouseup", Play);
    MainMenuElementDOM.style.display = "none";
    Game._Init();
}

window.onload = async () => {
    const t = new Audio("./Assets/Audio/masterpiece.mp3");
    t.autoplay = true
    t.loop = true 
}

window.addEventListener("Game:AfterDrawLoop", () => {
    const MousePosition = Game.canvas.getMousePosition()
    const ctx = Game.canvas.ctx
    ctx.fillStyle = "black"
    ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})

document.getElementById("Back-Button").addEventListener("mouseup", BackToHub);
document.getElementById("Play-Button").addEventListener("mouseup", Play);
