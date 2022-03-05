let toggled = false;

let toggled3 = false;
function Settings() {
    const element = document.getElementById('settingscontainer')
    document.getElementById('Settings').classList.toggle("buttonfocused");
    if (!toggled3) {
        toggled3 = true
        element.style.right = '10%';
    } else {
        toggled3 = false
        element.style.right = '110%'
    }
}

function RoomList() {
    const element = document.getElementById('serverlistcontainer')
    document.getElementById('RoomList').classList.toggle("buttonfocused");
    if (!toggled) {
        toggled = true
        element.style.right = '10%';
    } else {
        toggled = false
        element.style.right = '110%'
    }
}

let requestServerListinterval;

if (!issingleplayer) {requestServerListinterval = setInterval(requestServerList, 10000)}

let toggled2 = false;

function ShowCreateRoom() {
    if (!toggled2) {
        toggled2 = true
        document.getElementById('createroom').style.display = 'inherit'
        document.getElementById('serverbrowser').style.display = 'none'
        document.getElementById('serverlisttitle').innerHTML = 'Create Room'
    }else {
        toggled2 = false;
        document.getElementById('createroom').style.display = 'none'
        document.getElementById('serverbrowser').style.display = 'inherit'
        document.getElementById('serverlisttitle').innerHTML = 'Room List'
    }
}

function CreateRoom() {
    document.getElementById('SubmitCreateRoom').disabled = "true"

    let Id = document.getElementById('IdofRoom').value;
    let Name = document.getElementById('NameofRoom').value;
    let MaxPlayer = document.getElementById('MaxofRoom').value

    socket.emit("CreateNewRoom", {id: Id, name: Name, max: MaxPlayer})
    ShowCreateRoom()
    document.getElementById('serverlist').innerHTML = 'Joining Room..'
    clearInterval(requestServerListinterval)
}

//-------------

function requestServerList() {
    socket.emit('UpdateServerList')
    document.getElementById('serverlist').innerHTML = 'Reloading...'
    serverlist = []
}

let serverlist = []

function UpdateServerList(Data) {
    if (!Data.isserver) {
        document.getElementById('serverlist').innerHTML = 'No Rooms Available'
        return;
    }
    serverlist.push(`
    <div class="server-column" id="${Data.id}" onclick="startGame('${Data.id}', ${Data.index})">
        Name of Room: ${Data.name}

        <span style="padding-left: 100px; text-align:right;">
            Amount Of Players: ${Data.players.in}/${Data.players.max}
        </span>
    </div>
    `)

    let data = serverlist.join('<br>')
    document.getElementById('serverlist').innerHTML = data
}