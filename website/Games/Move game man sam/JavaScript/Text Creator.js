class TextCreator {
    constructor(x, y, sizeoftext, font, colour) {
        this.font = font
        this.size = sizeoftext
        this.x = x
        this.y = y
        this.colour = colour    
    }
    draw(ctx, text) {
        ctx.font = this.size + " " + this.font;
        ctx.fillStyle = this.colour
        ctx.fillText(text, this.x, this.y);
    }
}
