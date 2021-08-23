class AIConstructor {
    constructor(x, y, width, height, speed = 10) {
        this.speed = 10
        this.speedup = 10
        this.width = width;
        this.height = height;

        this.maxspeed = speed
        this.vx = 0;
        this.vy = 0;//Used For Velocity

        this.speedmax = 17

        this.position = {
            x: x,
            y: y,
        }
    }

    bottom() { return this.position.y + this.height }
    left() { return this.position.x }
    right() { return this.position.x + this.width }
    top() { return this.position.y }

    iscolliding(object) {
        if (this.position.x < object.position.x + object.width &&
            this.position.x + this.width > object.position.x &&
            this.position.y < object.position.y + object.height &&
            this.height + this.position.y > object.position.y) {
            return true;
        } else {
            return false;
        }
    }

    

    collisionDetection(obj) {
        if (this.position.x + this.width < obj.position.x ||
            this.position.x > obj.position.x + obj.width ||
            this.position.y + this.height < obj.position.y ||
            this.position.y > obj.position.y + obj.height) {
                return
            }
            this.narrowPhase(obj);
    }

    narrowPhase(obj) {
        let playerTop_ObjBottom = Math.abs(this.position.y - (obj.position.y + obj.height));
        let playerRight_ObjLeft = Math.abs((this.position.x + this.width) - obj.position.x);
        let playerLeft_ObjRight = Math.abs(this.position.x - (obj.position.x + obj.width));
        let playerBottom_ObjTop = Math.abs((this.position.y + this.height) - obj.position.y);
    
        if ((this.position.y <= obj.position.y + obj.height && this.position.y + this.height > obj.position.y + obj.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
            this.position.y = obj.position.y + obj.height;
            //this.vup = 0;
        }        
        else if ((this.position.x + this.width >= obj.position.x && this.position.x < obj.position.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
            this.position.x = obj.position.x - this.width;
            //this.vright = 0; 
        }
        else if ((this.position.y + this.height >= obj.position.y && this.position.y < obj.position.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
            this.position.y = obj.position.y - this.height; 
            //this.vdown = 0;
        }
        else if ((this.position.x <= obj.position.x + obj.width && this.position.x + this.width > obj.position.x + obj.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
            this.position.x = obj.position.x + obj.width;
            //this.vleft = 0; Add velocities back if clipping through (looks bad but works)
        }
    }
    //-------------

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    stop() {
        this.speed = 0;
        this.speedup = 0;
    }

    update(playersx, playersy) {

        // if (this.position.y < playersy) { //down
        //     this.speedup = this.maxspeedup
        // }
        // else if (this.position.y > playersy) {
        //     this.speedup = -this.maxspeedup
        // }
        // if (this.position.x > playersx) {
        //     this.speed = -this.maxspeed
        // }
        // else if (this.position.x < playersx) {
        //     this.speed = this.maxspeed
        // }
        
        this.dx = playersx - this.position.x;
		this.dy = playersy - this.position.y;

		// Using pythagoras' theorm to find the distance (the length of the vector)
		this.l = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

		// Dividing by the distance gives a normalized vector whose length is 1
		this.dx = this.dx / this.l;
		this.dy = this.dy / this.l;

		// Get the enemy to travel towards the player with a new speed of this.speedmax
		this.vx = this.dx * this.speedmax;
		this.vy = this.dy * this.speedmax;

        this.position.x += this.vx
        this.position.y += this.vy

        if (this.position.y < 0) {
            this.position.y = 0
        }

        if (this.position.y > 800) {
            this.position.y = 750
        }

        if (this.position.x < 0) {
            this.position.x = 0
        }
        if (this.position.x > 1050) {
            this.position.x = 1050
        }
    }
}