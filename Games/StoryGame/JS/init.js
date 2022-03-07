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

document.getElementById("Back-Button").addEventListener("mouseup", BackToHub);
document.getElementById("Play-Button").addEventListener("mouseup", Play);
