class BadGuy1 {
	constructor(x = 0, y = 0, w = 25, h = 25, id, color = "red") {

		//Getting a random Id
		this.id = id

		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.color = color;

        this.r = 100

        this.health = 50;
	}

	draw(ctx) {
		ctx.globalAlpha = 0.2;
        
        //Detection Radius
        ctx.fillStyle = 'darkred'
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
		
		ctx.globalAlpha = 1;

        //The Cube
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);

		//Health
		ctx.fillStyle = "green";

		ctx.fillRect(this.x, this.y - 20, this.health, 10);

		ctx.fillStyle = "black";
		ctx.strokeRect(this.x, this.y - 20, 50, 10);

		//NameTag
        ctx.fillStyle = 'red'
		ctx.font = "10px Arial";
		ctx.fillText("BadGuy1", this.x + 5, this.y - 30);
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
}
