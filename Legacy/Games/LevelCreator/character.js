
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
    }
    
    /**
     * Jump Cooldown
     */
    // jump() {
    //     this.isOnGround = false
    //     if (this.jumpCooldownId) clearTimeout(this.jumpCooldownId);
    //     this.jumpCooldownId = setTimeout(() => {
    //         this.isOnGround = true
    //     }, this.jumpCooldown);
    // }

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
                    // this.jump()
                    this.isOnGround = false
                }
                break;

            case "a":
                this.vx = -this.speed // Make the speed negative to it goes the opposite way (-x)
                break;

            case "d":
                this.vx = this.speed // Make the x velocity positive of the speed so it goes right
                break;
        }
    }

    stopMove(movement) {
        switch (movement) {
            case "a":
                if (!ENGINE.InputHandler.keys_down.d)
                    this.vx = 0;
                else
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

    Draw(ctx) { 
        if (this.img) ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        else {
            // Draw a simple square
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}