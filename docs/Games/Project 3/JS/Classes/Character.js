console.log('loaded character file')
class Character {
    constructor(x,y,width,height,name){
        this.speedx = 5
        this.maxspeedx = this.speedx
        this.speedy = 5
        this.speedmaxy = this.speedy
        this.name = name
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    moveDown() {
        this.speedy = this.speedmaxy
    }

    moveUp() {
        this.speedy = -this.speedmaxy
    }

    moveLeft() {
        this.speedx = -this.maxspeedx
    }

    moveRight() {
        this.speedx = this.maxspeedx
    }

    stopx() {
        this.speedx = 0;
    }
    
    stopy(){
        this.speedy = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    update(deltaTime) {
        if (!deltaTime) return;
        this.x += this.speedx;
        this.y += this.speedy;

        if (this.y <= 0){
            this.y = 0
        }
        else if (this.x > 950){
            this.x = 950
        }
        if (this.x < 0){
            this.x = 0
        }
        else if (this.y > 950){
            this.y = 950
        }
    }
}