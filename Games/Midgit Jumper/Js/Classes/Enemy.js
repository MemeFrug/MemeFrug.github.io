class Enemy {
    constructor(x, y, w, h, health, type = "enemy") {
        //Variables
        this.x = x;
        this.y = y
        this.w = w
        this.h = h
        this.isOnGround = false

        //Unchangeable
        this.speedmax = 5
        this.gravityMax = 25
        this.gravity = 0.8
        this.jumppower = -15
        this.gravityTweenFloat = 0.1
        this.type = type

        this.damagecooldown = 1000 //Milliseconds
        this.damagecooldownBool = true //When false it cant attack for the peroid of time
        this.startCooldown = false

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
        this.IsMoving = false

        setTimeout(() => {
            this._Move("right")
        }, 500);
    }
    _AttackCooldown() {
        this.startCooldown = false
        this.damagecooldownBool = false
        setTimeout(() => {
            this.damagecooldownBool = true
        }, this.damagecooldown);
    }

    _TakeHealth(amt) {
        if (this.health <= 0) return
        console.log(amt)
        console.log(this.health)
        this.health -= amt
        console.log(amt)
        console.log(this.health)
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
    collisionDetection(obj, AnimateHurt) {
        if (this.x + this.w < obj.x ||
            this.x > obj.x + obj.w ||
            this.y + this.h < obj.y ||
            this.y > obj.y + obj.h) {
                return false
            }
            // this.isOnGround = true
            const istrue = this.narrowPhase(obj, AnimateHurt);
            // console.log(this.isOnGround);
            if (istrue) return true
    }

    narrowPhase(obj, AnimateHurt) {
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
            if (obj.HasDoneCoyote != null && this.damagecooldownBool){
                 obj.health -= 20
                 this.startCooldown = true
                 AnimateHurt()
            }
            this._Move("right")
            // if (this.MovingInt) this._Move("jump")
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
            if (obj.HasDoneCoyote != null && this.damagecooldownBool){
                 obj.health -= 20
                 this.startCooldown = true
                 AnimateHurt()
            }
            this._Move("left")

            // if (this.MovingInt) this._Move("jump")

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

        if (this.startCooldown) {
            this._AttackCooldown();
        }
    }

    _Draw(ctx) {
        //Draws the character into the window frame
        const originalCtxStyle = ctx.fillStyle

        ctx.fillStyle = 'red'

        ctx.fillRect(this.x, this.y, this.w, this.h)

        ctx.fillStyle = originalCtxStyle
    }

    _Moveto(object, _CallBack) {
        // if (this.MovingInt) {
        //     clearInterval(this.MovingInt)
        //     this.MovingInt = null

        //     this.MovingInt = setInterval((object) => {
        //         if (object.x < this.x) {
        //             this._Move("left")
        //         }
        
        //         else if (object.x > this.xkj){
        //             this._Move("right")
        //         } else {

        //             this._stopMoving()
        //             clearInterval(this.MovingInt)
        //             _CallBack()
        //         }
        //     }, 1, object);
        // }else {
        //     this.MovingInt = setInterval((object) => {
        //         this._stopMoving()

        //         if (object.x < this.x) {
        //             this._Move("left")
        //         }
        
        //         else if (object.x > this.x){
        //             this._Move("right")
        //         } else {
        //             // this._stopMoving()
        //             clearInterval(this.MovingInt)
        //             this.MovingInt = null
        //             _CallBack()
        //         }


        //     }, 1, object);
        // }
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

class Boss extends Enemy{
    // _Update(deltaTime) {
    //     // console.log("Boss is working")
    // }
}