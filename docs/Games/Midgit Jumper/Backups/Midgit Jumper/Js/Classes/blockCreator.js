class blockCreator {
    constructor(x, y, w ,h, colour = "black", opacity = 1) {
        // a block is 50 by 50
        this.x = x
        this.y = y
        
        this.w = w
        this.h = h

        this.colour = colour

        this.opacity = opacity

        this.enemyhasspawned = false
    }

    _Draw(ctx) {
        ctx.globalAlpha = this.opacity;
        const oldctxStyle = ctx.fillStyle
        ctx.fillStyle = this.colour
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = oldctxStyle
        ctx.globalAlpha = 1
    }
}