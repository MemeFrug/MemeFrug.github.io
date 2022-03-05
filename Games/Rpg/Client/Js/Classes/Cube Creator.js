class CubeCreator{
    constructor(x,y,w,h,color = 'black') {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = color
        
        this.center = {x: this.x + this.w/2,  y: this.y + this.h/2};
        this.topLeft = {x: this.x, y: this.y};
        this.topRight = {x: this.x + this.w, y: this.y};
        this.bottomRight = {x: this.x + this.w, y: this.y + this.h};
        this.bottomLeft = {x: this.x, y: this.y + this.h};
    }

    draw(ctx) {
        ctx.fillStyle = this.c
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
}