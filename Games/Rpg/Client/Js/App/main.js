//canvas definition
const canvascontainter = document.getElementById("canvascontainer")
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const uiDOM = document.getElementById("ui")

//getting mouse position
let mousepos = {
	x: 0,
	y: 0,
};

let camX = 0;
let camY = 0;

document.addEventListener("mousemove", (evt) => {
	var rect = canvas.getBoundingClientRect();

	if (canvas.width <= World.Size.x) {
		mousepos = {
			x: evt.clientX - rect.left - camX,
			y: evt.clientY - rect.top - camY,
		};
	}else {
		mousepos = {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top,
		};
	}
});

//Update Function

//Function for clampling the players camera //COPIED
function clamp(value, min, max) {
	if (value < min) return min;
	else if (value > max) return max;
	return value;
}
//--------------
let lastTime = 0;

function update(timeStamp = performance.now()) {
	let deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	
	//Most of the time there is no update because being done on server.

	World.update(deltaTime)
	
	character.update(deltaTime, World.Size);
	character.inventory.forEach(i => {
		i.update()
	});

	for (let i = 0; i < World.Items.length; i++) {
		const e = World.Items[i];
		if (e.iscolliding(character) && !character.additem()) {
			console.log('true', e);

			e.ownedby = character;
			e.ininventory = true;
			e.inventoryindex = character.inventory.length;
			character.additem(e)

			delete e
			World.Items.splice(i, 1);
		}	
	}

	if (issingleplayer == "true") return;
	//Anything multiplayer below here

	socket.emit("updatecharacter", character.x, character.y);
}

//Draw Function
function draw() {
	ctx.globalAlpha = 1.0
	//Collision Detection with character
	for (let index = 0; index < World.StaticObjects.length; index++) {
		character.collisionDetection(World.StaticObjects[index], inputhandler);
	}
	for (let index = 0; index < World.Players.length; index++) {
		character.collisionDetection(World.Players[index], inputhandler);
	}

	//Camera
	ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative //COPIED

	//Clamp the camera position to the world bounds while centering the camera around the player
	camX = clamp(-character.x + canvas.width / 2, -World.Size.x + newwidth - 100, 100); // COPIED
	camY = clamp(-character.y + canvas.height / 2, -World.Size.y + newheight - 100, 100); // COPIED


	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//console.log(camX, camY);

	if (canvas.width <= World.Size.x && canvas.height <= World.Size.y) {
		ctx.translate(camX, camY); //COPIED	
	}

	ctx.scale(1, 1);

	//Draw the world such as other players and objects
	World.draw(ctx);

	//mouse for showing where the bullet is going to go
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(mousepos.x - 10, mousepos.y);
    ctx.lineTo(mousepos.x + 10, mousepos.y);
    ctx.moveTo(mousepos.x, mousepos.y - 10);
    ctx.lineTo(mousepos.x, mousepos.y + 10);
    ctx.stroke();

	ctx.fillRect(mousepos.x, mousepos.y, 3,3)

	//Shows the border of the world
	ctx.fillStyle = "black";
	ctx.strokeRect(0, 0, World.Size.x, World.Size.y);

	//Drawing objects in scene
	//Drawing Character
	character.draw(ctx);

	if (typeof character.inventory[inputhandler.keysdown.inventoryindex] !== 'undefined') character.inventory[inputhandler.keysdown.inventoryindex].draw(ctx)

	World.Items.forEach(element => {
		element.draw(ctx)
	});

	requestAnimationFrame(draw); //Start the loop again.
}
