let socket;

// if (issingleplayer != "true") {
// 	const socket = io("42.241.255.248:7979");
//     StartGameConnections()
// }

if (issingleplayer != "true") {
	socket = io("localhost:7979");
	StartGameConnections()
}//CHANGE THIS TO PRODUCTION

function startGame(id, index) {
    document.getElementById('serverlist').innerHTML = 'Joining Room..'

	character = new Character(
		getRndInteger(0, World.Size.x),
		getRndInteger(0, World.Size.y),
		color,
		username
	);

	socket.emit("Join Game", {
		x: character.x,
		y: character.y,
		id: id,
		index: index
	})
}


//-------GEtting a simple ping pong statement to show the latency (ping)

let latency = 0; //(ping)

function ping () {
	let startTime;
	startTime = Date.now();

	socket.emit('ping')
	socket.once('pong', (data) => {
		latency = Date.now() - startTime
		document.getElementById('ping').innerHTML = latency

		if (data != undefined) console.log(data);
	})

	setTimeout(ping, 1000)
}

function StartGameConnections() {

socket.on("connect", () => {
	console.log("connected");

	socket.emit("RecieveInfo", {// Sends client info
		username: username,
		color: color,
		password: password,
	});
	requestServerList()
});

socket.on("GetServerInfo", (Data) => {
	UpdateServerList(Data)
})

socket.on("CantJoin", (Data) => {
	document.getElementById('serverlist').innerHTML = Data.Reason

	requestServerListinterval = setInterval(requestServerList, 10000)
	setTimeout(() => {
		requestServerList()
	}, 3000);
})

socket.on("Can Join", () => {
	Init()//Starts the game
	console.log('started game');
})

socket.on("createcharacter", (data) => {//FIXME: Creating extra character for somereason
	World.Players.push(
		new Character(data.x, data.y, data.color, data.username, data.id)
	);
	socket.emit("create character", character, data.id);
});

socket.on("Delete Character", (id) => {
	for (let index = 0; index < World.Players.length; index++) {
		if (id == World.Players[index].id) {
			delete World.Players[index];
			World.Players.splice(index, 1);
			break;
		}
	}
});

socket.on("createself", (data, id) => {//FIXME: Creating extra character for somereason
	World.Players.push(
		new Character(data.x, data.y, data.color, data.username, id)
	);
	World.Players[World.Players.length - 1].health = data.health
	console.log("Last Loop of createself");
});

socket.on("RecieveRoomIndex", (Id, Index) => {
	startGame(Id, Index)
})

socket.on("update character", (data) => {
	for (let index = 0; index < World.Players.length; index++) {
		if (World.Players[index].id == data.id) {
			World.Players[index].x = data.x;
			World.Players[index].y = data.y;
			break;
		}
	}
});

socket.on("update enemy", (data) => {
	for (let index = 0; index < World.Enemys.length; index++) {
		if (data.id == World.Enemys[index].id) {
			World.Enemys[index].x = data.x
			World.Enemys[index].y = data.y
			World.Enemys[index].health = data.health	
		}
    }
});

socket.on("Update World (Static)", (x, y, w, h, c) => {
	World.StaticObjects.push(new CubeCreator(x, y, w, h, c));
	console.log("Created a static object");
});

socket.on("Update World (Delete Enemy)", (id) => {
	for (let index = 0; index < World.Enemys.length; index++) {
		if (World.Enemys[index].id == id) {
			delete World.Enemys[index]
			World.Enemys.splice(index, 1)
		}
	}
})

socket.on("Update World (Enemys)", (x, y, w, h, c, id) => {
	World.Enemys.push(new BadGuy1(x, y, w, h, id, c));
	console.log("Created A bad Guy");
});

socket.on("Update World (Size)", (x,y) => {
	World.Size.x = x
	World.Size.y = y
})

socket.on("Update Character"/*For health ect. */, (data) => {
	if (World.Players.length == 0) {
		character.health = data.health
		if (data.x != undefined) {
			character.x = data.x
			character.y = data.y	
		}	
	}
	for (let index = 0; index < World.Players.length; index++) {
		if (World.Players[index].id == data.id) {
			World.Players[index].health = data.health;
			if (data.x != undefined) {
				World.Players[index].x = data.x
				World.Players[index].y = data.y	
			}
			break;
		}
		if (index == World.Players.length - 1) {
			character.health = data.health
			if (data.x != undefined) {
				character.x = data.x
				character.y = data.y	
			}
		}
	}
})

socket.on('new bullet', (x,y,mousex,mousey,id) => {
	World.Bullets.push(new Bullet(x,y,mousex,mousey, id, false))
})

socket.on('disconnect', () => {
	dev(1)
})

socket.io.on('reconnect_error', () => {
	dev(1)
})

//-----------------Inventory System
// socket.on('pickupgun', (gun, index) => {
// 	delete World.Items[index]
// 	World.Items.splice(index, 1)

// 	character.inventory.push(gun)
// })

// socket.on('Add_Gun', (gun) => {
// 	console.log(gun);
// 	World.Items.push(gun)
// })
}

if (issingleplayer == "true") Init();
else {
	ping()
}