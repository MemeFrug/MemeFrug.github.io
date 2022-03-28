//From onload.js
let character;
let inputhandler
let stopwatch;
//Width Of Window changes to movement of the window
let newwidth;
let newheight;
let DeathSquare = new blockCreator(0, 0, 0, 0, "black", 0)
let NextWorldSquare = new blockCreator(0, 0, 0, 0, "black", 0)
let NextWorldSquareText = new Text(0, 0, "Next World", "white", 0)
let HurtSquare = new blockCreator(0, 0, 0, 0, "red", 0);
let WinSquare = new blockCreator(0, 0, 0, 0, "black", 0)
let WinSquareText = new Text(0, 0, "You Win With The Time: 00:00:00", "white", 0)

function windowResize() {
	newwidth = window.innerWidth;
	newheight = window.innerHeight;
	DeathSquare.w = newwidth
	DeathSquare.h = newheight
	NextWorldSquare.w = newwidth
	NextWorldSquare.h = newheight
	NextWorldSquareText.x = newwidth / 2
	NextWorldSquareText.y = newheight / 2
	HurtSquare.w = newwidth
	HurtSquare.h = newheight
	WinSquare.w = newwidth
	WinSquare.h = newheight
	WinSquareText.x = newwidth / 2
	WinSquareText.y = newheight / 2
	canvas.width = newwidth;
	canvas.height = newheight;
	canvascontainer.style.width = `${newwidth}px`;
	canvascontainer.style.height = `${newheight}px`;
	ctx = canvas.getContext("2d");
}

const sleep = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time))
}

//What loaded
let WorldIn = 0

//World
const Worlds = [
	{//World 0
		Size: {
			x: 5000,
			y: 10000
		},
		Objects: [
			// new blockCreator(0, 1000, 100,  Worlds[WorldIn].Size.x - 1000), The starting block is in the function _GenerateWorld()
		],
		Enemys: [
			// new Enemy(0, 5000 - 2100, 50, 50, 100)
		],
		WorldDone: false,
		FinishedWorld: false,
		IsLastLevel: false
	}
]

//Generate World
function _GenerateWorld() {
	
    // return new Promise((resolve,reject)=>{
	//Un comment all three below and one above to stop world gen
	// Worlds[WorldIn].Objects.push(new blockCreator(0, 1600, 300,  Worlds[WorldIn].Size.y)) // This is the starting block
	// return
	// }

	
    return new Promise((resolve,reject)=>{

		//SomeValuestochangeworldgen
		const maxWorldSizeX = 9000
		const minWorldSizeX = 5000

		const maxAmtWorlds = 3
		const minAmtWorlds = 2

		//Random the ammount of enemys
		const maxAmountofEnemys = 10
		const minAmountofEnemys = 5

		//Random Boss health
		const maxBossHealth = 1000
		const minBossHealth = 250

		//Get the ammount of worlds to create
		const AmountOfWorlds = Math.floor(Math.random() * (maxAmtWorlds - minAmtWorlds + 1) + minAmtWorlds);
		console.log(AmountOfWorlds, ", The amount of Worlds");
		for (let index = 0; index <= AmountOfWorlds; index++) {
			//World Already Exists
			if (index <= Worlds.length) {
				//If not then create a default world

				Worlds.push({
					Size: {
						x: 5000,
						y: 10000
					},
					Objects: [
						// new blockCreator(0, 1000, 100,  Worlds[WorldIn].Size.x - 1000), The starting block is in the function _GenerateWorld()
					],

					Enemys: [

					],
					WorldDone: false,
					FinishedWorld: false,
					IsLastLevel: false
				})
			}

			if (index == AmountOfWorlds) {
				Worlds[index].IsLastLevel = true
			}

			const islastlevel = Worlds[index].IsLastLevel

			//Get a random numver for world size
			const WorldSizex = Math.floor(Math.random() * (maxWorldSizeX - minWorldSizeX + 1) + minWorldSizeX);
			console.log(WorldSizex);
			//Set New World Size
			Worlds[index].Size.x = WorldSizex
		
			//Create the first block
			Worlds[index].Objects.push(new blockCreator(0, Worlds[index].Size.y - 2000, 300,  Worlds[index].Size.y - 2000)) // This is the starting block
		
			let lastrandomnum = -1

			for (let i = 0; i < Infinity; i++) {
				const element = Worlds[index].Objects;
				const Enemy = Worlds[index].Enemys;
				const lastblock = element[Worlds[index].Objects.length-1]

				// console.log(lastblock);
		
				const upordown = Math.floor(Math.random() * 6);
		
				if (lastblock.x + lastblock.w > Worlds[index].Size.x - 2000) {
					//Get Bosses Health
					let BossHealth;
					if (!islastlevel) {
						BossHealth = Math.floor(Math.random() * (maxBossHealth - minBossHealth + 1) + minBossHealth);
						Enemy.push(new Boss(lastblock.x + lastblock.w + 550, lastblock.y + 100, 100, 150, BossHealth, "boss"))
					}
					else {
						BossHealth = Math.floor(Math.random() * (maxBossHealth + 1000 - minBossHealth +500 + 1) + minBossHealth);
						Enemy.push(new Boss(lastblock.x + lastblock.w + 550, lastblock.y + 100, 100, 200, BossHealth, "boss"))
					}
					console.log("Boss health",BossHealth)
					//Spawn in the boss level
					element.push(new blockCreator(lastblock.x + lastblock.w + 250, lastblock.y + 200, 1000, Worlds[index].Size.y - lastblock.y + 550))
					element.push(new blockCreator(lastblock.x + lastblock.w + 200, lastblock.y + 50, 50, Worlds[index].Size.y - lastblock.y + 550))
					element.push(new blockCreator(lastblock.x + lastblock.w + 1250, lastblock.y + 100, 600, Worlds[index].Size.y - lastblock.y + 550))
					element.push(new blockCreator(lastblock.x + lastblock.w + 1250, lastblock.y + 1000, 100, 2999))
					break
				}else if (upordown == 0) {// 0 is same level
					element[Worlds[index].Objects.length-1].w += 50
					// element.push(new blockCreator(lastblock.x + lastblock.w, lastblock.y, 50, Worlds[index].Size.y - lastblock.y))
				}else if (upordown == 1) {// 1 is same level
					element[Worlds[index].Objects.length-1].w += 50
					// element.push(new blockCreator(lastblock.x + lastblock.w, lastblock.y, 50, Worlds[index].Size.y - lastblock.y))
				}else if (upordown == 2) {// 2 is up
					element.push(new blockCreator(lastblock.x + lastblock.w, lastblock.y + 50, 50, Worlds[index].Size.y - lastblock.y + 550))
				}else if (upordown == 3) {// 3 is down
					element.push(new blockCreator(lastblock.x + lastblock.w, lastblock.y - 50, 50, Worlds[index].Size.y - lastblock.y + 550))
				}else if (upordown == 4) { // Create a jump
					element.push(new blockCreator(lastblock.x + lastblock.w, lastblock.y - 50, 50, Worlds[index].Size.y - lastblock.y + 550))
					element.push(new blockCreator(lastblock.x + lastblock.w + 250, lastblock.y - 100, 50, Worlds[index].Size.y - lastblock.y + 550))
					element.push(new blockCreator(lastblock.x + lastblock.w + 300, lastblock.y - 50, 200, Worlds[index].Size.y - lastblock.y + 550))
				}else if (upordown == 5 && lastrandomnum != 4 && lastrandomnum != -1) {
					element.push(new blockCreator(lastblock.x + lastblock.w * 2, lastblock.y, 50, Worlds[index].Size.y - lastblock.y + 550))
				}else {
					console.log("added nothing");
				}

				lastrandomnum = upordown
			}
			
			const AmountofEnemys = Math.floor(Math.random() * (maxAmountofEnemys - minAmountofEnemys + 1) + minAmountofEnemys);
			for (let i = 0; i < AmountofEnemys; i++) {
				const element = Worlds[index].Objects;


				const RandomElement = element[Math.floor(Math.random() * element.length)]

				// if (!RandomElement.enemyhasspawned) {
					// console.log(RandomElement.x);
					// RandomElement.enemyhasspawned = true
					Worlds[index].Enemys.push(new Enemy(RandomElement.x, RandomElement.y - 150, 50, 100, 50))	
					// Worlds[index].Enemys.push(new Enemy(RandomElement.x, RandomElement.y - 150, 50, 100, 100))	
				// }
				// else {
					// i--;
				// }
			}
		}

		Worlds.length = Worlds.length - 1

		resolve()
	})
}

let _amountofhell = 50

// Funny Gamemode: (WARNING THIS WILL BREAK IT)
function Hell(amountofhell = 50) {
	console.log('Are you sure you want to do this? reply with the text below if you wish to continue.');
	console.log("YesIagree()");

	_amountofhell = amountofhell
}

async function YesIagree() {
	alert("Warning this will lag the computer, Press ok to continue and wait till another popup pops... up i guess")

	let i = 0

	while (i < _amountofhell) {
		await _GenerateWorld()
		i++
	}

	

	alert("Finished Creating Hell, Start the game to see hell :thumbsup:")
}

//Game Functions
function _AddEventListeners() {
    window.addEventListener("resize", windowResize, false);
}

let oldTimeStamp = 0;

function _Update(timeStamp) {
	const deltaTime = (timeStamp - oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
	oldTimeStamp = timeStamp; // Update oldTimeStamp To the new one
	character._Update(deltaTime, inputhandler)

	const WorldInRn = Worlds[WorldIn]
	// let IsStandingOnSomething = false
	for (let i = 0; i < WorldInRn.Objects.length; i++) {
		const element = WorldInRn.Objects[i];
		const istrue = character.collisionDetection(element, inputhandler)

		if (istrue) {
			IsStandingOnSomething = true
			character.isOnGround = true
			// break;
		}else if (i == WorldInRn.Objects.length - 1) {
			// console.log(character.coyoteTimeout)

			if (character.isJumping) character.isOnGround = false
			else {
				if (!character.HasDoneCoyote) character.coyotetime()
			}
			// console.log("True");
		}
	}

	for (let i = 0; i < WorldInRn.Enemys.length; i++) {
		const element = WorldInRn.Enemys[i];
		element._Update(deltaTime)
		
		//checkforcollisions with player
		element.collisionDetection(character, AnimateHurt)

		const istrue = character.collisionDetection(element, inputhandler)
		if (istrue) {
			IsStandingOnSomething = true
			character.isOnGround = true
			element._TakeHealth(50);
			character._Move("w")

			if (element.health <= 0) {
				if (element.type == "boss") {
					WorldInRn.WorldDone = true
				}
				WorldInRn.Enemys.splice(i, 1)
			}
			break;
		}
		//check for collisions with other enemys
		WorldInRn.Enemys.forEach(element2 => {
			element.collisionDetection(element2, AnimateHurt)
		});

		WorldInRn.Objects.forEach(element2 => {
			const istrue = element.collisionDetection(element2, AnimateHurt)
	
			if (istrue) {
				IsStandingOnSomething = true
				element.isOnGround = true
			}else if (i == WorldInRn.Objects.length - 1) {
				element.isOnGround = false
			}
		});

		if (element.y > WorldInRn.Size.y) {
			WorldInRn.Enemys.splice(i, 1)
		}
	}

	if (character.y + character.h > WorldInRn.Size.y) {
		character.health = 0
	}

	if (character.health <= 0) {
		
		if (DeathSquare.opacity == 0) {
			AnimateDeath()
		}
	}

	if (WorldInRn.WorldDone && !WorldInRn.FinishedWorld) {
		WorldInRn.FinishedWorld = true
		console.log("Completed The World");
		AnimateNextWorld()
	}
}

function Drawtimer(ctx) {
	ctx.font = "40px Arial"

	ctx.fillText(Time, 80, 90)
}

function NextWorld() {
	if (Worlds[WorldIn].FinishedWorld && Worlds[WorldIn].IsLastLevel) {
		AnimateWin()
	}
	else if (!Worlds[WorldIn].FinishedWorld && Worlds[WorldIn].IsLastLevel) {
		while (true) {
			console.log("YOU CHEATER Haha poopie (btw quickly refresh or ur browser might crash)");
		}
	}
	else {
		WorldIn++
		character.x = 0
		character.y = Worlds[WorldIn].Objects[0].y - character.w - 100
		character.health = 100
	}
}

async function AnimateDeath() {
	stopwatch.stop()

	const incrementby = 0.02
	const timetoincrementby = 1 //Milliseconds
	let linger = 0
	const lingertime = 150
	for (let index = 0; index < Infinity; index++) {
		DeathSquare.opacity += incrementby
		if (DeathSquare.opacity >= 1) {
			linger += 1
			if (linger > lingertime) {
				character._Respawn(Worlds[WorldIn].Objects[0])
				DeathSquare.opacity = 0
				
				stopwatch.start()
				break;
			}
		}
		await sleep(timetoincrementby)
	}
}

async function AnimateNextWorld(){
	if (Worlds[WorldIn].FinishedWorld && Worlds[WorldIn].IsLastLevel) {
		NextWorld()
		return;
	}
	stopwatch.stop()
	const incrementby = 0.02
	const timetoincrementby = 1 //Milliseconds
	let linger = 0
	const lingertime = 200
	for (let index = 0; index < Infinity; index++) {
		NextWorldSquare.opacity += incrementby
		NextWorldSquareText.opacity += incrementby
		if (NextWorldSquare.opacity >= 1) {
			linger += 1
			if (linger > lingertime) {
				NextWorld()
				
				AnimateAfterNextWorld()
				break;
			}
		}
		await sleep(timetoincrementby)
	}
}

async function AnimateAfterNextWorld(){
	const incrementby = 0.02
	const timetoincrementby = 1 //Milliseconds
	for (let index = 0; index < Infinity; index++) {
		NextWorldSquare.opacity -= incrementby
		NextWorldSquareText.opacity -= incrementby
		if (NextWorldSquare.opacity <= 0) {
			NextWorldSquare.opacity = 0
			NextWorldSquareText.opacity = 0
			
			stopwatch.start()
			break;
		}
		await sleep(timetoincrementby)
	}
}

//Animate Death
async function AnimateHurt() {
	console.log("In animate hurt");
	const incrementby = 0.02	
	const timetoincrementby = 1 //Milliseconds
	const HighestPoint = 0.5

	let HasReachedPoint = false
	for (let index = 0; index < Infinity; index++) {
		if (HasReachedPoint) HurtSquare.opacity -= incrementby
		else HurtSquare.opacity += incrementby
		if (HurtSquare.opacity >= HighestPoint) {
			HasReachedPoint = true
		}
		if (HurtSquare.opacity <= 0) {
			HurtSquare.opacity = 0
			break;
		}

		await sleep(timetoincrementby)
	}
}

async function AnimateWin() {
	stopwatch.stop()
	console.log("Won with the time: ", stopwatch.print());
	const incrementby = 0.02
	const timetoincrementby = 1 //Milliseconds
	let linger = 0
	const lingertime = 400

	//Set Winning Time To stopwatch result
	WinSquareText.text = `You Win With The Time: ${stopwatch.print()}`
	Save(stopwatch.print())
	for (let index = 0; index < Infinity; index++) {
		WinSquare.opacity += incrementby
		WinSquareText.opacity += incrementby
		if (WinSquare.opacity >= 1) {
			linger += 1
			if (linger > lingertime) {
				location.reload();
				break;
			}
		}
		await sleep(timetoincrementby)
	}
}

//Function for clampling the players camera
function clamp(value, min, max) {
	if (value < min) return min;
	else if (value > max) return max;
	return value;
}
//--------------

//Map Background
// const BackgroundImage1 = new Image()
// BackgroundImage1.src = "./Assets/Background/map.png"

function _Draw(deltaTime) {
	//Some Vars
	const WorldInRn = Worlds[WorldIn]

	//Camera
	ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative

	//Clamp the camera position to the world bounds while centering the camera around the player
	camX = clamp(-character.x + canvas.width / 3, -Worlds[WorldIn].Size.x + newwidth, 0);
	camY = clamp(-character.y + canvas.height / 2, -Worlds[WorldIn].Size.y + newheight - 500, 10);

	ctx.clearRect(0,0, newwidth, newheight)

	//Draw the ui so it dosent get moved
	character._DrawUI(ctx)
	
	//Draw the death animation square
	DeathSquare._Draw(ctx)
	
	//Draw the next world animation square
	NextWorldSquare._Draw(ctx)
	NextWorldSquareText._Draw(ctx)

	//Draw the timer
	Drawtimer(ctx)

	if (canvas.width <= Worlds[WorldIn].Size.x && canvas.height <= Worlds[WorldIn].Size.y) {
		ctx.translate(camX, camY); //COPIED	
	}

	// console.log(canvas.height)
	// console.log(Worlds[WorldIn].Size.y)

	let ratio = Math.min(
		canvas.clientWidth / newwidth,
		canvas.clientHeight / newheight
	);
	
	ctx.scale(ratio, ratio);

	//Update World
    requestAnimationFrame(_Update)

	if (NextWorldSquare.opacity > 0 || DeathSquare.opacity > 0.7 /* Change the value for how much till everything on screen disapears*/) { //If the next world animation is playing
		requestAnimationFrame(_Draw);
		return;
	}

	//Draw the background
	// const BackgroundImage1 = new blockCreator(0, 0, WorldInRn.Size.x, WorldInRn.Size.y, "#87CEEB", 1)
	// BackgroundImage1._Draw(ctx)
	// ctx.drawImage(BackgroundImage1, 0, 7000, 5000, 2000);

	//Draw World
	character._Draw(ctx)

	for (let i = 0; i < WorldInRn.Objects.length; i++) {
		const element = WorldInRn.Objects[i];
		element._Draw(ctx)
	}
	for (let i = 0; i < WorldInRn.Enemys.length; i++) {
		const element = WorldInRn.Enemys[i];
		element._Draw(ctx)
	}

	//THIS IS ALWAYS AT END
	ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
	//Draw the hurt animation square
	HurtSquare._Draw(ctx)

	//Draw Win animation square and text
	WinSquare._Draw(ctx)
	WinSquareText._Draw(ctx)

    requestAnimationFrame(_Draw)
}