class Character {
    constructor(x = 0,y = 0){
        //Variables
        this.x = x;
        this.y = y
        this.w = 50
        this.h = 90
        this.isOnGround = false

        //Unchangeable
        this.speedmax = 480
        this.gravityMax = 2000
        this.gravity = 50
        this.jumppower = -950
        this.gravityTweenFloat = 0.1

        this.coyoteTime = 400 //Milliseconds

        //Velocities
        this.vleft = 0
        this.vright = 0
        this.vdown = 0
        this.vup = 0

        //Player
        this.health = 100;
        this.isDead = false

        this.coyoteTimeout = null
        this.HasDoneCoyote = false

        //Animations
        this.Idlegif;
        
        this.animationsgif = [
            {//Idle
                gif: GIF(),
                gifLink: "./Assets/sprites/steve idle.gif",
                Name: "Idle",
            },
            {//Idle reverted
                gif: GIF(),
                gifLink: "./Assets/sprites/steve idle reverted.gif",
                Name: "IdleLeft",
            },
            {//Run
                gif: GIF(),
                gifLink: "./Assets/sprites/steve run.gif",
                Name: "Run",
            },
            {//Run Left
                gif: GIF(),
                gifLink: "./Assets/sprites/steve run reverted.gif",
                Name: "RunLeft",
            },
            {//Jump
                gif: GIF(),
                gifLink: "./Assets/sprites/steve jump.gif",
                Name: "Jump",
            },
            {//Jump reverted
                gif: GIF(),
                gifLink: "./Assets/sprites/steve jump reverted.gif",
                Name: "JumpLeft",
            },
            {//Falling
                gif: GIF(),
                gifLink: "./Assets/sprites/steve falling.gif",
                Name: "Falling",
            },
            {//Falling reverted
                gif: GIF(),
                gifLink: "./Assets/sprites/steve falling reverted.gif",
                Name: "FallingLeft",
            }
        ]
        this.animations = {

        }

        this.amount = this.animationsgif.length
        this.count = 0

        this.leftkeydown = false
        
    }
    //Some Spare Funcs

    LoadAnims() {
        return new Promise((resolve,reject)=>{

            for (let i = 0; i < this.animationsgif.length; i++) {
                const element = this.animationsgif[i];

                element.gif.playOnLoad = false;
                element.gif.onerror = function(e){
                    console.log("Gif loading error " + e.type);
                }
                element.gif.load(element.gifLink)

                this.waittilltrue(resolve, element)
            }
        })
    }

    waittilltrue(resolve, element) {
        if (!element.gif.loading) {
            this.animations[element.Name] = element.gif
            this.count++
        }else {
            setTimeout(()=>{
                this.waittilltrue(resolve, element)
            },200)
        }

        if (this.count == this.amount) {
            resolve()
        }
    }
    
    _Respawn(object) {
        this.y = object.y - 50
        this.x = object.x + 5
        
        this.health = 100
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
    collisionDetection(obj, inputhandler) {
        if (this.x + this.w < obj.x ||
            this.x > obj.x + obj.w ||
            this.y + this.h < obj.y ||
            this.y > obj.y + obj.h) {
                if (inputhandler.keysdown.w) this._Move('w')
                if (inputhandler.keysdown.a) this._Move('a')
                if (inputhandler.keysdown.s) this._Move('s')
                if (inputhandler.keysdown.d) this._Move('d')
                // else {
                    // this.isOnGround = false
                // }
                return false
            }
            // this.isOnGround = true
            const istrue = this.narrowPhase(obj);
            // console.log(this.isOnGround);
            if (istrue) return true
    }

    coyotetime() {
        if (this.HasDoneCoyote) return
        this.HasDoneCoyote = true
        this.coyoteTimeout = setTimeout(() => {
            this.isOnGround = false
            this.HasDoneCoyote = false
        }, this.coyoteTime);
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
            // this.vright = 0; 
            // this.vleft = 0;
            // console.log("detecting from the left")
            // return false
        }
        else if ((this.y + this.h >= obj.y && this.y < obj.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
            this.y = obj.y - this.h; 
            this.vdown = 0;
            this.vup = 0;
            this.isJumping = false
            // console.log("detecting from the bottom")
            return true
        }
        else if ((this.x + this.w >= obj.x && this.x < obj.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
            this.x = obj.x - this.w;
            this.vright = 0;
            this.vleft = 0;
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
            // console.log("In else in collision")
        }
    }
    //-------------

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };



    //Functions
    _Draw(ctx/* Gets context to reference the screen and draw on it */) {
        // //Draws the character into the window frame
        // const originalCtxStyle = ctx.fillStyle

        // ctx.fillStyle = 'black'

        // ctx.fillRect(this.x, this.y, this.w, this.h)
        // ctx.fillStyle = originalCtxStyle

        
        //Test
        if (this.vup < 0) {
            if (this.leftkeydown) {
                if (this.animations.JumpLeft) {
                    this.animations.JumpLeft.play()
                    ctx.drawImage(this.animations.JumpLeft.image, this.x - 46, this.y - 24, 140, 140);

                }
            }else {
                if (this.animations.Jump) {
                    this.animations.Jump.play()
                    ctx.drawImage(this.animations.Jump.image, this.x - 46, this.y - 24, 140, 140);

                }
            }
        }
        else if (this.vup > 0) {
            if (this.leftkeydown) {
                this.animations.FallingLeft.play()
                ctx.drawImage(this.animations.FallingLeft.image, this.x - 46, this.y - 24, 140, 140);    
            }else {
                this.animations.Falling.play()
                ctx.drawImage(this.animations.Falling.image, this.x - 46, this.y - 24, 140, 140);  
            }


        }
        else if (this.vright > 0 && this.vleft == 0) {
            if (this.leftkeydown) {
                this.animations.RunLeft.play()
                ctx.drawImage(this.animations.RunLeft.image, this.x - 46, this.y - 24, 140, 140);
            }else {
                this.animations.Run.play()
                ctx.drawImage(this.animations.Run.image, this.x - 46, this.y - 24, 140, 140);
            }
        }
        else if (this.vleft < 0 && this.vright == 0) {
            if (this.leftkeydown) {
                this.animations.RunLeft.play()
                ctx.drawImage(this.animations.RunLeft.image, this.x - 46, this.y - 24, 140, 140);
            }else {
                this.animations.RunLeft.play()
                ctx.drawImage(this.animations.RunLeft.image, this.x - 46, this.y - 24, 140, 140);
            }
        }
        else if (this.animations.Idle) { // If gif object defined
            if (this.leftkeydown) {
                this.animations.IdleLeft.play()
                ctx.drawImage(this.animations.IdleLeft.image, this.x - 46, this.y - 28, 140, 140);
            }else {
                // draw random access to gif frames
                this.animations.Idle.play()
                ctx.drawImage(this.animations.Idle.image, this.x - 46, this.y - 28, 140, 140);
            }
        }
    }

    _DrawUI(ctx) {
        const originalCtxStyle = ctx.fillStyle
        //Health / UI
        ctx.fillStyle = 'green'

        ctx.fillRect(10, 20, this.health, 10)

        ctx.fillStyle = 'black'
        ctx.strokeRect(10, 20, 100, 10);

        ctx.fillStyle = originalCtxStyle
    }

    _Update(deltaTime, inputhandler) {
        if (!deltaTime) return;

        this.x += this.vleft * deltaTime;
        this.x += this.vright * deltaTime;

        this.y += this.vdown * deltaTime;
        this.y += this.vup * deltaTime;

        // console.log(this.isOnGround);

        // if (this.gravity == this.gravitySet && this.isOnGround) {
        //     this.gravity = 0
        // }

        // console.log(this.gravity == this.gravitySet,  this.isOnGround);

        // if (this.vup < 0) {
        //     this.vup += this.gravityTweenFloat
        // }else if (this.gravity < this.gravitySet) {
        //     this.gravity += this.gravityTweenFloat
        //     this.vup = this.gravity
        // }else {
        //     this.vup = this.gravity
        // }

        // console.log(this.gravity)
        if (this.vup < this.gravityMax)
            this.vup += this.gravity
            console.log(this.vup);

        if (this.health > 100) 
            this.health = 100
        
        if (character.x <= 0) {
            character.x = 0
        }

        //Get lastinput
        if (inputhandler.keysdown.a) 
            this.leftkeydown = true;
        else if (inputhandler.keysdown.d) 
            this.leftkeydown = false;
    }

    _Move(movement) {
        if (movement == "s") {
            this.vdown = this.speedmax
        }
    
        else if (movement == "w" && this.isOnGround) {
            //Jump
            this.vup = this.jumppower
            this.animations.Jump.seekFrame(0)
            this.animations.JumpLeft.seekFrame(0)
            // this.gravity = 0
            this.isJumping = true
        }
    
        if (movement == "a") {
            this.vleft = -this.speedmax
        }
    
        if (movement == "d") {
            this.vright = this.speedmax
        }
    }

    _stopMoving(movement) {
        if (movement == "a") {
            this.vleft = 0;
        }
        
        else if (movement == "w") {
        }
        
        else if (movement == "s") {
            this.vdown = 0;
        }
        
        else if (movement == "d") {
            this.vright = 0;
        }
    }
}