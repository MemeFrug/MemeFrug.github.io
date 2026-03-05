class TrapCreator {
    constructor(x, y, width, height, coloractivated, colordeactivated, activated) {
        this.position = {
            x: x,
            y: y
        }
        this.width = width
        this.height = height
        this.coloractivated = coloractivated
        this.colordeactivated = colordeactivated
        this.activated = activated
    }

    draw(ctx) {
        if (!this.activated) {
            ctx.globalAlpha = 0.5
            ctx.fillStyle = this.coloractivated
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
            ctx.globalAlpha = 1
        }
        else if (this.isactivated) {
            ctx.fillStyle = this.coloractivated
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
    }

    isactivated(ctx) {
        if (!this.activated) {
            return false;
        }
        else {
            return true;
        }
    }
}
