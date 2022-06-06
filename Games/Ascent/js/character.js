
class Player extends Square {
    constructor(isStatic = false, x = 0, y = 0, w = 50, h = 50, mass = 100, speed = 10, jump_strength = -15, collisionEnabled = true) {
        super(isStatic, x, y, mass, collisionEnabled)

        this.w = w
        this.h = h

        this.speed = speed

        this.jump_strength = jump_strength

        this.id = GenerateNewID()
        this.isLocal = true

        this.isStatic = false

        this.jumpCooldown = 1000
        this.jumpCooldownId = undefined        
        
        
        //Animations
        this.Idlegif;
        
        this.animationsgif = [
            {//Idle
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveIdle.gif",
                Name: "Idle",
            },
            {//Idle reverted
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveIdleRev.gif",
                Name: "IdleLeft",
            },
            {//Run
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveRun.gif",
                Name: "Run",
            },
            {//Run Left
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveRunRev.gif",
                Name: "RunLeft",
            },
            {//Jump
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveJump.gif",
                Name: "Jump",
            },
            {//Jump reverted
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveJumpRev.gif",
                Name: "JumpLeft",
            },
            {//Falling
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveFalling.gif",
                Name: "Falling",
            },
            {//Falling reverted
                gif: GIF(),
                gifLink: "./Assets/characterSprites/steveFallingRev.gif",
                Name: "FallingLeft",
            }
        ]
        this.animations = {

        }

        this.amount = this.animationsgif.length
        this.count = 0

        this.leftkeywasdown = false
        
        this.LoadAnims()
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
                element.gif.onload = () => {
                    console.log(element.Name + " loaded");
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
    /**
     * @returns ID of the player
     */
    getID() {
        return this.id;
    }

    move(movement) {
        switch (movement) { // Make a switch statement
            case "w":
                if (this.isOnGround) { // Check if on the ground
                    this.vy = this.jump_strength // set the Vertical velocity to jump
                    this.isOnGround = false
                }
                break;

            case "a":
                this.leftkeywasdown = true
                this.vx = -this.speed // Make the speed negative to it goes the opposite way (-x)
                break;

            case "d":
                this.leftkeywasdown = false;
                this.vx = this.speed // Make the x velocity positive of the speed so it goes right
                break;
        }
    }

    stopMove(movement) {
        switch (movement) {
            case "a":
                if (!ENGINE.InputHandler.keys_down.d){
                    this.vx = 0;
                }else
                    this.move("d")
                break;

            case "d":
                if (!ENGINE.InputHandler.keys_down.a)
                    this.vx = 0;
                else
                    this.move("a")
                break;
        }
    }

    Draw(ctx) { // Draw the player
        let gifSize = 260
        let gifOffsetX = 90 // These are minused btw
        let gifOffsetY = 30

        let runOffsetX = gifOffsetX
        let runOffsetY = 21

        //Testing
        ctx.globalAlpha = 0.3
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.globalAlpha = 1

        //Draw The Gifs
        if (this.vy < 0) {
            if (ENGINE.InputHandler.keys_down.a) {
                if (this.animations.JumpLeft) {
                    this.animations.JumpLeft.play()
                    ctx.drawImage(this.animations.JumpLeft.image, this.x - gifOffsetX, this.y - gifOffsetY, gifSize, gifSize);

                }
            }else {
                if (this.animations.Jump) {
                    this.animations.Jump.play()
                    ctx.drawImage(this.animations.Jump.image, this.x - gifOffsetX, this.y - gifOffsetY, gifSize, gifSize);

                }
            }
        }
        else if (this.vy > 0) {
            if (this.leftkeywasdown) {
                this.animations.FallingLeft.play()
                ctx.drawImage(this.animations.FallingLeft.image, this.x - gifOffsetX, this.y - gifOffsetY, gifSize, gifSize);    
            }else {
                this.animations.Falling.play()
                ctx.drawImage(this.animations.Falling.image, this.x - gifOffsetX, this.y - gifOffsetY, gifSize, gifSize);  
            }
        }
        else if (this.vx > 0) {
            if (this.leftkeywasdown) {
                this.animations.RunLeft.play()
                ctx.drawImage(this.animations.RunLeft.image, this.x - runOffsetX, this.y - runOffsetY, gifSize, gifSize);
            }else {
                this.animations.Run.play()
                ctx.drawImage(this.animations.Run.image, this.x - runOffsetX, this.y - runOffsetY, gifSize, gifSize);
            }
        }
        else if (this.vx < 0) {
            if (this.leftkeywasdown) {
                this.animations.RunLeft.play()
                ctx.drawImage(this.animations.RunLeft.image, this.x - runOffsetX, this.y - runOffsetY, gifSize, gifSize);
            }else {
                this.animations.RunLeft.play()
                ctx.drawImage(this.animations.RunLeft.image, this.x - runOffsetX, this.y - runOffsetY, gifSize, gifSize);
            }
        }
        else if (this.animations.Idle) { // If gif object defined
            if (this.leftkeywasdown) {
                this.animations.IdleLeft.play()
                ctx.drawImage(this.animations.IdleLeft.image, this.x - gifOffsetX, this.y - gifOffsetY, gifSize, gifSize);
            }else {
                // draw random access to gif frames
                this.animations.Idle.play()
                ctx.drawImage(this.animations.Idle.image, this.x - gifOffsetX, this.y - gifOffsetY, gifSize, gifSize);
            }
        }
    }
}