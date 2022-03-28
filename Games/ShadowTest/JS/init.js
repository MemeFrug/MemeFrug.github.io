function GenerateWalls() {
	walls = []
	walls.push(new Wall(0, 0, Game.Config.WorldSize.x, 0))
	walls.push(new Wall(0, 0, 0, Game.Config.WorldSize.y))
	walls.push(new Wall(0, Game.Config.WorldSize.y, Game.Config.WorldSize.x, Game.Config.WorldSize.y))
	walls.push(new Wall(Game.Config.WorldSize.x, 0, Game.Config.WorldSize.x, Game.Config.WorldSize.y))

	//test
	for (let i = 0; i < World.tiles.length; i++) {
		const Tile = World.tiles[i];
		for (let j = 0; j < Tile.length; j++) {
			const element = Tile[j];
			if (element instanceof Square) {
				walls.push(new Wall(element.x, element.y, element.x, element.y + element.h))
				walls.push(new Wall(element.x, element.y, element.x + element.w, element.y))
				walls.push(new Wall(element.x + element.w, element.y, element.x + element.w, element.y + element.h))
				walls.push(new Wall(element.x + element.w, element.y + element.h, element.x, element.y + element.h))
			}
		}
	}
}

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

window.addEventListener("Game:BeforeDrawLoop", () => {
    const ctx = Game.canvas.ctx
	const LocalPlayer = Game.GetLocalPlayer().package
	const RayPosition = {x: LocalPlayer.x + LocalPlayer.w / 2, y: LocalPlayer.y + LocalPlayer.h / 2}
	// const RayPosition = {x: Mouse.x, y: Mouse.y}

	if (Game.inputHandler.keys_down.w) LocalPlayer._Move('w'); // Move the player
	else LocalPlayer._stopMoving("w")
	if (Game.inputHandler.keys_down.a) LocalPlayer._Move('a');
	else LocalPlayer._stopMoving("a")
	if (Game.inputHandler.keys_down.s) LocalPlayer._Move('s');
	else LocalPlayer._stopMoving("s")
	if (Game.inputHandler.keys_down.d) LocalPlayer._Move('d');
	else LocalPlayer._stopMoving("d")

	// Get all unique points
	var points = (function(walls){
		var a = [];
		walls.forEach(function(seg){
			a.push(seg.pos1,seg.pos2);

            walls.forEach(function(wall){ // Check if there is an intersection then put a point there too
                const intersect = lineIntersects(seg.pos1, seg.pos2, wall.pos1, wall.pos2)
                if (intersect ) {
                    a.push(intersect)
                }
            })
		});
		return a;
	})(walls);
	var uniquePoints = (function(points){
		var set = {};
		return points.filter(function(p){
			var key = p.x+","+p.y;
			if(key in set){
				return false;
			}else{
				set[key]=true;
				return true;
			}
		});
	})(points);

	// Get all angles
	var uniqueAngles = [];
	for(var j=0;j<uniquePoints.length;j++){
		var uniquePoint = uniquePoints[j];
		var angle = Math.atan2(uniquePoint.y-RayPosition.y,uniquePoint.x-RayPosition.x);
		uniquePoint.angle = angle;
		uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
	}

	// RAYS IN ALL DIRECTIONS
	var intersects = [];
	for(var j=0;j<uniqueAngles.length;j++){
		var angle = uniqueAngles[j];

		// Ray from center of screen to mouse
        var ray = new Ray(RayPosition.x, RayPosition.y, angleToVector(angle))

		// Find CLOSEST intersection
        let closestIntersect = null;
        let record = Infinity;
		for(var i=0;i<walls.length;i++){
			var pt = ray.cast(walls[i]);
            if (pt.result) {
                const d = pt.dist
                if (d < record) {
                    record = d;
                    closestIntersect = pt.result;
                }
            } 
        };

		// Intersect angle
		if(!closestIntersect) continue;
		closestIntersect.angle = angle;

		// Add to list of intersects
		intersects.push(closestIntersect);

	}

	// Sort intersects by angle
	intersects = intersects.sort(function(a,b){
		return a.angle-b.angle;
	});

	// DRAW AS A GIANT POLYGON
    ctx.globalAlpha = 0.9	
	ctx.fillStyle = "gray";
	ctx.beginPath();
	ctx.moveTo(intersects[0].x,intersects[0].y);
	for(var i=1;i<intersects.length;i++){
		var intersect = intersects[i];
		ctx.lineTo(intersect.x,intersect.y);
	}
	ctx.fill();
    ctx.globalAlpha = 1


	if (drawDebugLines) {
		// DRAW DEBUG LINES
		ctx.strokeStyle = "white";
		ctx.globalAlpha = 0.5	
		for(var i=0;i<intersects.length;i++){
			var intersect = intersects[i];
			ctx.beginPath();
			ctx.moveTo(RayPosition.x, RayPosition.y,);
			ctx.lineTo(intersect.x,intersect.y);
			ctx.stroke();
		}
		ctx.globalAlpha = 1
	}
})

window.addEventListener("Game:AfterDrawLoop", () => {
    const MousePosition = Game.canvas.getMousePosition()
    const ctx = Game.canvas.ctx
    ctx.fillStyle = "black"
    ctx.fillRect(MousePosition.x - 15 / 2, MousePosition.y - 15 / 2, 15, 15)
})

document.getElementById("Back-Button").addEventListener("mouseup", BackToHub);
document.getElementById("Play-Button").addEventListener("mouseup", Play);

startup = GenerateWalls