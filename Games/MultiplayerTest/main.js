let socket = {connected: false}

function setupGame() {
    createCanvas(true)
    setCanvasBackground("white")
}

function connectTo(ip) {
    document.getElementById("ConnectingScreen").style.display = "flex"
    document.getElementById("ConnectingToIpElement").innerHTML = ip
    socket = io(ip);
    socket.once("connect_error", (error) => {
        console.log("Failed To Connect:", error);
        document.getElementById("ConnectingScreen").innerHTML = "Connection Failed: " + error
        socket.off("connect")
        socket.disconnect()
    })
    socket.once("connect", async () => {
        console.log("Connect To Server");
        socket.off("connect_error")
        document.getElementById("ConnectingScreen").innerHTML = "Connected Successfully"
        await sleep(1000)
        document.getElementById("ConnectingScreen").innerHTML = "Loading World..."
        await sleep(500)
        document.getElementById("ConnectingScreen").innerHTML = "Spawning Players and Objects..."
        await sleep(500)
        document.getElementById("ConnectingScreen").style.display = "none"
        await sleep(600)
        setupGame()
    })
}

document.getElementById("ChangeToIpSelectElement").addEventListener("mouseup", () => { // TODO: Add Animations to These elements
    document.getElementById("MainMenu").style.display = "none"
    document.getElementById("IpChooser").style.display = "flex"
    document.getElementById("IpInputElement").value = "localhost:7777"
})

document.getElementById("ConnectToServerElement").addEventListener("mouseup", () => {
    const inputtedIp = document.getElementById("IpInputElement").value
    const ErrorText = document.getElementById("ErrorTextIpChooser")
    if (inputtedIp == "" || !inputtedIp) {
        ErrorText.innerText = "Error: Inputted IP Is Formatted Incorrectly"
        return
    }
    document.getElementById("IpChooser").style.display = "none"
    connectTo(inputtedIp)
})