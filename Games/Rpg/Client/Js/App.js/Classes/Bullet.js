class Bullet {
	constructor(x, y, mouseX, mouseY, id, isown/*means is it yourself*/) {

		this.isown = isown

		this.speed = 8;

		this.dx = 0;
		this.dy = 0;

		this.id = id

		// The mouse pos - the player pos gives a vector
		// that points from the player toward the mouse
		this.vx = mouseX - x;
		this.vy = mouseY - y;

		// Using pythagoras' theorm to find the distance (the length of the vector)
		this.l = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

		// Dividing by the distance gives a normalized vector whose length is 1
		this.vx = this.vx / this.l;
		this.vy = this.vy / this.l;

		this.x = x;
		this.y = y;

		// Get the bullet to travel towards the mouse pos
		this.dx = this.vx * this.speed;
		this.dy = this.vy * this.speed;

		this.w = 7
		this.h = 7
		
		this.size = 4; //Radius
	}

	iscolliding(object) {
        if (this.x < object.x + object.w &&
            this.x + this.w > object.x &&
            this.y < object.y + object.h &&
            this.h + this.y > object.y) {
            return true;
        } else {
            return false;
        }
    }
	
	draw(ctx) {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.lineWidth = 0.5;
		ctx.stroke();
	}

	update(deltaTime) {
		if (!deltaTime) return;
		this.x += this.dx;
		this.y += this.dy;
	}
}
