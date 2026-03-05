console.log("loaded onload.js");
document.getElementById('user').innerText = `${username}`;

//Canvas Definition is at main.js

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOverflown(element) {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

let percentage = 100;

//Width Of Window
let newwidth;
let newheight;

function windowResize() {

	newwidth = window.innerWidth;
	newheight = window.innerHeight;
	
	canvas.width = newwidth;
	canvas.height = newheight;
	canvascontainter.style.width = `${newwidth}px`;
	canvascontainter.style.height = `${newheight}px`;
	uiDOM.style.width = `${newwidth}px`;
	uiDOM.style.height = `${newheight}px`;
	ctx = canvas.getContext("2d");
}

window.addEventListener("resize", windowResize);

//Intervals
var UpdateInterval;

//global Variables
var World = {
	Items: [//Droped items on ground ect

	],

	StaticObjects: [
		//With Collision
	],

	Bullets: [],

	Players: [],

	Enemys: [],

	draw(ctx) {
		for (let index = 0; index < World.Enemys.length; index++) {
				World.Enemys[index].draw(ctx);	
		}
		for (let index = 0; index < World.StaticObjects.length; index++) {
				World.StaticObjects[index].draw(ctx);
		}
		for (let index = 0; index < World.Players.length; index++) {
				World.Players[index].draw(ctx);	
			
		}
		for (let index = 0; index < World.Bullets.length; index++) {
				World.Bullets[index].draw(ctx);
			
		}
	},

	update(deltaTime) {
		for (let i = 0; i < World.Bullets.length; i++) {
			World.Bullets[i].update(deltaTime);
			let deleted = false;

			if (World.Bullets[i].x > World.Size.x) {
				delete World.Bullets[i]
				World.Bullets.splice(i,1)
				continue;
			}                    
			else if (World.Bullets[i].x < 0) {
				delete World.Bullets[i]
				World.Bullets.splice(i,1)
				continue;
			}                    
			if (World.Bullets[i].y > World.Size.y) {
				delete World.Bullets[i]
				World.Bullets.splice(i,1)
				continue;
			}
			else if (World.Bullets[i].y < 0) {
				delete World.Bullets[i]
				World.Bullets.splice(i,1)
				continue;
			}        

			for (let index = 0; index < World.StaticObjects.length; index++) {
				if (World.Bullets[i].iscolliding(World.StaticObjects[index])){

					delete World.Bullets[i]
					World.Bullets.splice(i,1)
					deleted = true;
					break;
				}   
			}
			if (deleted) continue;

			for (let index = 0; index < World.Enemys.length; index++) {
				if (World.Enemys[index].iscolliding(World.Bullets[i])){
					delete World.Bullets[i]
					World.Bullets.splice(i,1)
					deleted = true
					break;
				}
			}

			if (deleted) continue;

			for (let index = 0; index < World.Players.length; index++) {
				if (World.Players[index].iscolliding(World.Bullets[i]) && World.Players[index].id != World.Bullets[i].id){
					delete World.Bullets[i]
					World.Bullets.splice(i,1)
					deleted = true
					break;
				}
			}
			if (deleted) continue;

			if (character.iscolliding(World.Bullets[i]) && World.Bullets[i].isown == false) {
				delete World.Bullets[i]
				World.Bullets.splice(i,1)
				continue;
			}
		}
	},

	Size: {
		//Default Settings if not connected to server (should be never unless i inplement singleplayer)
		x: 1800, //width
		y: 800, //height
	},
};

let character;

let inputhandler;

//Starts the game
function Init() {
	windowResize();
	if (issingleplayer != "true") clearInterval(requestServerListinterval)
	else {
		character = new Character(
			getRndInteger(0, World.Size.x),
			getRndInteger(0, World.Size.y),
			color,
			username
		);
	}
	UpdateInventory()
	document.getElementById('canvascontainer').style.display = 'inherit';
	document.getElementById('mainmenu').style.display = 'none';

	UpdateInterval = setInterval(update, 16.7);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Character is defined where you start the game

	inputhandler = new Inputhandler();

	character.additem(new Pistol(character))
	character.additem(new AssaultRifle(character))
	character.additem(new Shotgun(character))

	draw();
};
