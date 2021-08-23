class CircleConstructor {
    constructor(x, y, radius, colour) {
        this.y = y
        this.x = x
        this.radius = radius
        this.colour = colour
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.colour;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }
}