class Bush{
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.bush = new Image()
        this.bush.src = 'Pictures/Bush.png'
    }

    draw(ctx){
        ctx.drawImage(this.bush, this.x, this.y, this.width, this.height)
    }
}