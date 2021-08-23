class CubeCreator {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;

        this.position = {
            x: x,
            y: y
        }
    }

    bottom() { return this.position.y + this.height }
    left() { return this.position.x }
    right() { return this.position.x + this.width }
    top() { return this.position.y}

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

}
