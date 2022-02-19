class Text{    
    constructor(x, y, text, colour = "black", opacity = 1, font = "30px Comic Sans MS") {
    // a block is 50 by 50
    this.x = x
    this.y = y
    this.text = text
    this.colour = colour

    this.opacity = opacity

    this.font = font

    this.enemyhasspawned = false
    }

    _Draw(ctx) {
        ctx.globalAlpha = this.opacity;
        const oldctxStyle = ctx.fillStyle
        ctx.font = this.font;
        ctx.fillStyle = this.colour;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
        ctx.fillStyle = oldctxStyle
        ctx.globalAlpha = 1
    }
}