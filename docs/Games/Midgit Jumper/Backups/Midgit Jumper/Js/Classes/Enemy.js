class Enemy {
    constructor(x, y, w, h, health) {
        //Variables
        this.x = x;
        this.y = y
        this.w = w
        this.h = h
        this.isOnGround = false

        //Unchangeable
        this.speedmax = 9
        this.gravityMax = 25
        this.gravity = 0.8
        this.jumppower = -15
        this.gravityTweenFloat = 0.1

        //Velocities
        this.vleft = 0
        this.vright = 0
        this.vdown = 0
        this.vup = 0

        //Player
        this.health = health;
        this.isDead = false

        //Ai
        this.MovingInt;
    }
    _Die() {
        this.health = 0
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

    //Collision
    collisionDetection(obj) {
        if (this.x + this.w < obj.x ||
            this.x > obj.x + obj.w ||
            this.y + this.h < obj.y ||
            this.y > obj.y + obj.h) {
                return false
            }
            // this.isOnGround = true
            const istrue = this.narrowPhase(obj);
            // console.log(this.isOnGround);
            if (istrue) return true
    }

    narrowPhase(obj) {
        let playerTop_ObjBottom = Math.abs(this.y - (obj.y + obj.h));
        let playerRight_ObjLeft = Math.abs((this.x + this.w) - obj.x);
        let playerLeft_ObjRight = Math.abs(this.x - (obj.x + obj.w));
        let playerBottom_ObjTop = Math.abs((this.y + this.h) - obj.y);     
        // console.log(this.x < obj.x, this.x, obj.x);
        if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
            this.y = obj.y + obj.h;
            // this.vdown = 0;
            // this.vup = 0;
            // console.log("detecting from the top")
            // return false
        }   
        else if ((this.x <= obj.x + obj.w && this.x + this.w > obj.x + obj.w) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
            this.x = obj.x + obj.w;
            this.vright = 0; 
            this.vleft = 0;
            if (this.MovingInt) this._Move("jump")
            // console.log("detecting from the left")
            // return false
        }
        else if ((this.y + this.h >= obj.y && this.y < obj.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
            this.y = obj.y - this.h; 
            this.vdown = 0;
            this.vup = 0;
            // console.log("detecting from the bottom")
            return true
        }
        else if ((this.x + this.w >= obj.x && this.x < obj.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
            this.x = obj.x - this.w;
            this.vright = 0;
            this.vleft = 0;

            if (this.MovingInt) this._Move("jump")

            // return false
        } else {//dont know what i have done but it kinda works (come back and tidie up when smartws)
            if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h)) {
                this.y = obj.y + obj.h;
            }
            else if ((this.x + this.w >= obj.x && this.x < obj.x)) {
                this.x = obj.x - this.w;
            }
            else if ((this.y + this.h >= obj.y && this.y < obj.y)) {
                this.y = obj.y - this.h;
            }
            else if ((this.x <= obj.x + obj.w && this.x + this.w > obj.x + obj.w)) {
                this.x = obj.x + obj.w;
            }
        }
    }
    //-------------

    _Update(deltaTime){
        if (!deltaTime) return

        this.x += this.vleft;
        this.x += this.vright;

        this.y += this.vdown;
        this.y += this.vup;

        if (this.vup < this.gravityMax)
            this.vup += this.gravity

        if (this.health > 100) 
            this.health = 100
        

        if (character.x <= 0) {
            character.x = 0
        }
    }

    _Draw(ctx) {
        //Draws the character into the window frame
        const originalCtxStyle = ctx.fillStyle

        ctx.fillStyle = 'red'

        ctx.fillRect(this.x, this.y, this.w, this.h)

        ctx.fillStyle = originalCtxStyle
    }

    _Moveto(object) {
        if (this.MovingInt) {
            clearInterval(this.MovingInt)
            this.MovingInt = null

            this.MovingInt = setInterval((object) => {
                console.log("In this one");
                if (object.x < this.x) {
                    console.log("trying to move left");
                    this._Move("left")
                }
        
                else if (object.x > this.x){
                    console.log("trying to move right");
                    this._Move("right")
                } else {

                    this._stopMoving()
                    clearInterval(this.MovingInt)
                }
            }, 1, object);
        }else {
            this.MovingInt = setInterval((object) => {
                if (object.x < this.x) {
                    console.log("trying to move left");
                    this._Move("left")
                }
        
                else if (object.x > this.x){
                    console.log("trying to move right");
                    this._Move("right")
                } else {

                    // this._stopMoving()
                    clearInterval(this.MovingInt)
                    this.MovingInt = null
                    console.log("Trying to clear it");
                }


            }, 1, object);
        }
    }

    
    _Move(movement) {
        if (movement == "jump" && this.isOnGround) {
            //Jump
            this.vup = this.jumppower
            // this.gravity = 0
            this.isJumping = true
        }
    
        if (movement == "left") {
            this.vleft = -this.speedmax
        }
    
        if (movement == "right") {
            this.vright = this.speedmax
        }
    }

    _stopMoving(movement) {
        //Does not affect velocity up and down like gravity
        this.vleft = 0;
        this.vdown = 0;
        this.vright = 0;
    }
}