class character {
    constructor(x, y, gameWidth, gameHeight) {
        this.width = 50;
        this.height = 50;


        //Velocities
        this.vleft = 0
        this.vright = 0
        this.vdown = 0
        this.vup = 0
        this.speedmax = 5

        this.position = {
            x: x,
            y: y,
        }

    }

    //allsides
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

    moveDown() {
        this.vdown = this.speedmax
    }

    moveUp() {
        this.vup = -this.speedmax
    }

    moveLeft() {
        this.vleft = -this.speedmax
    }

    moveRight() {
        this.vright = this.speedmax
    }

    stop() {
        this.vleft = 0;
        this.vup = 0;
        this.vright = 0;
        this.vdown = 0;
    }

    stopLeft() {
        this.vleft = 0;
    }

    stopUp() {
        this.vup = 0;
    }

    stopDown() {
        this.vdown = 0;
    }

    stopRight() {
        this.vright = 0;
    }

    draw(ctx) {
        ctx.fillStyle = '#0000FF'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        if (!deltaTime) return;
        
        this.position.x += this.vleft;
        this.position.x += this.vright;
        this.position.y += this.vdown;
        this.position.y += this.vup;

        if (this.position.y < 0) {
            this.position.y = 0
        }

        if (this.position.y > 800) {
            this.position.y = 800
        }

        if (this.position.x < 0) {
            this.position.x = 0
        }
        if (this.position.x > 1050) {
            this.position.x = 1050
        }
    }
}