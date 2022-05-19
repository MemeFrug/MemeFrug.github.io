class collisionBox extends gameObject {
    constructor(x = 0, y = 0, w = 50, h = 50) {
        super(x, y)

        this.w = w
        this.h = h
        this.collisionEnabled = true
        this.isColliding = false;

        //Loop For Collision
        this.cIndex = ENGINE.gameObjects.length
        ENGINE.gameObjects.push(this)
    }

    EnableCollision() {
        if (!this.collisionEnabled) {
            this.collisionEnabled = true

            this.cIndex = ENGINE.gameObjects.length
            ENGINE.gameObjects.push(this)
        }
    }

    DisableCollision() {
        if (this.collisionEnabled) {
            this.collisionEnabled = false

            const cIndex = ENGINE.gameObjects.indexOf(this); // Get the position of the collision in the update loop

            if (ENGINE.gameObjects[cIndex]) {// Checks If this variable exists
                ENGINE.gameObjects.splice(cIndex, 1)
            }
        }
    }

    collisionDetection(obj) {
        if (this.x + this.w < obj.x || this.x > obj.x + obj.w || this.y + this.h < obj.y || this.y > obj.y + obj.h) return; // Check if the player is colliding

        let playerTop_ObjBottom = Math.abs(this.y - (obj.y + obj.h));
        let playerRight_ObjLeft = Math.abs((this.x + this.w) - obj.x);
        let playerLeft_ObjRight = Math.abs(this.x - (obj.x + obj.w));
        let playerBottom_ObjTop = Math.abs((this.y + this.h) - obj.y);
        if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
            this.y = obj.y + obj.h;
            if (this.vy <= 0) this.vy = 0;
        }
        else if ((this.x <= obj.x + obj.w && this.x + this.w > obj.x + obj.w) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
            this.x = obj.x + obj.w;
        }
        else if ((this.y + this.h >= obj.y && this.y < obj.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
            this.y = obj.y - this.h;
            this.vy = 0;
            this.isOnGround = true
        }
        else if ((this.x + this.w >= obj.x && this.x < obj.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
            this.x = obj.x - this.w;
            this.vx = 0;
        }
    }
}