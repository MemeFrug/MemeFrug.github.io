class Character {
    constructor(x = 0,y = 0){
        //Variables
        this.x = x;
        this.y = y
        this.w = 65
        this.h = 90
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
        this.health = 100;
        this.isDead = false

        //Animations
        this.Idlegif;
        
        this.gifIdle = "../../Assets/sprites/steve idle.gif"; 
        this.gifRun = "../../Assets/sprites/mc run.gif"
        this.gifRunleft = "../../Assets/sprites/steve run reverted.gif"
        this.gifJump = "../../Assets/sprites/steve jump.gif"
        this.gifFalling = "../../Assets/sprites/falling.gif"

        //Make anims
        
        this.Idlegif = GIF();

        this.Rungif = GIF();

        this.Rungifleft = GIF()

        this.Jumpgif = GIF();

        this.Fallinggif = GIF();
    }
    //Some Spare Funcs

    LoadAnims() {
        return new Promise((resolve,reject)=>{
            //Make anims    
            this.Idlegif.onerror = function(e){
                console.log("Gif loading error " + e.type);
            }
            this.Idlegif.load(this.gifIdle); 

            this.Rungif.onerror = function(e) {
                console.log("Gif loading error " + e.type)
            }
            this.Rungif.load(this.gifRun);

            this.Rungifleft.onerror = function(e) {
                console.log("Gif loading error " + e.type)
            }
            this.Rungifleft.load(this.gifRunleft);

            this.Jumpgif.playOnLoad = false;
            this.Jumpgif.onerror = function(e) {
                console.log("Gif loading error " + e.type)
            }
            this.Jumpgif.load(this.gifJump);

            this.Fallinggif.playOnLoad = false;
            this.Fallinggif.onerror = function(e) {
                console.log("Gif loading error " + e.type)
            }
            this.Fallinggif.load(this.gifFalling);

            function waittilltrue(Idlegif, Rungif, Rungifleft, Jumpgif, Fallinggif, resolve) {
                if (!Idlegif.loading && !Rungif.loading && !Rungifleft.loading && !Jumpgif.loading && !Fallinggif.loading) {
                    resolve()
                }else {
                    setTimeout(() => {
                        waittilltrue(Idlegif, Rungif, Rungifleft, Jumpgif, Fallinggif, resolve)
                    }, 500);
                }
            }
            waittilltrue(this.Idlegif, this.Rungif, this.Rungifleft, this.Jumpgif, this.Fallinggif, resolve)
        })
    }
    
    _Respawn(object, deathsquare) {
        this.y = object.y - 50
        this.x = object.x + 5
        
        this.health = 100

        deathsquare.opacity = 0
        
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
            if (this.Jumpgif) {
                if (!this.Jumpgif.loading) {
                    this.Jumpgif.play()
                    ctx.drawImage(this.Jumpgif.image, this.x - 46, this.y - 24, 140, 140);
                }
            }
        }
        else if (this.vup > 0) {
            if (this.Fallinggif) {
                if (!this.Fallinggif.loading) {
                    this.Fallinggif.play()
                    ctx.drawImage(this.Fallinggif.image, this.x - 46, this.y - 24, 140, 140);
                }
            }
        }
        else if(this.vright > 0 && this.vleft == 0) {
            if (this.Rungif) {
                if (!this.Rungif.loading) {
                    ctx.drawImage(this.Rungif.image, this.x - 46, this.y - 24, 170, 140);
                }
            }
        }
        else if(this.vleft < 0 && this.vright == 0) {
            if (this.Rungifleft) {
                if (!this.Rungifleft.loading) {
                    ctx.drawImage(this.Rungifleft.image, this.x - 46, this.y - 24, 140, 140);     
                }
            }
        }
        else if (this.Idlegif) { // If gif object defined
            if (!this.Idlegif.loading) {  // if loaded
                // draw random access to gif frames
                ctx.drawImage(this.Idlegif.image, this.x - 46, this.y - 24, 140, 140);
                this.Jumpgif.pause()
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

    _Update(deltaTime) {
        if (!deltaTime) return;

        this.x += this.vleft;
        this.x += this.vright;

        this.y += this.vdown;
        this.y += this.vup;

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

        if (this.health > 100) 
            this.health = 100
        
        if (character.x <= 0) {
            character.x = 0
        }
    }

    _Move(movement) {
        if (movement == "s") {
            this.vdown = this.speedmax
        }
    
        else if (movement == "w" && this.isOnGround) {
            //Jump
            this.vup = this.jumppower
            this.Jumpgif.seekFrame(0)
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