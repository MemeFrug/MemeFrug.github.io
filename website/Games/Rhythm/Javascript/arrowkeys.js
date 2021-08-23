class arrowkeys {
    constructor() {
        this.pressingkeyleft = false
        this.pressingkeyright = false
        this.pressingkeydown = false

        this.y = 121
        this.leftx = 70

        this.rightx = 180

        this.downx = 125
    }
    draw(ctx) {
        if (this.pressingkeydown == false) {
            ctx.fillStyle = 'white' //down
            ctx.fillRect(125,121,50,10)
        }
        if (this.pressingkeyright == false) {
            ctx.fillStyle = 'white' //right
            ctx.fillRect(180,121,50,10)
        }
        if (this.pressingkeyleft == false){
            ctx.fillStyle = 'white' //left
            ctx.fillRect(70,121,50,10)
        }
    }

    iscolliding(object, pos) {
        try {
            if (pos == 1) {
                if (this.leftx < object.x + object.width &&
                    this.leftx + 50 > object.x &&
                    this.y < object.y + object.height &&
                    10 + this.y > object.y) {
                    return true;
                } else {
                    return false;
                }      
            }
            if (pos == 2) {
                if (this.rightx < object.x + object.width &&
                    this.rightx + 50 > object.x &&
                    this.y < object.y + object.height &&
                    10 + this.y > object.y) {
                    return true;
                } else {
                    return false;
                }      
            }
            if (pos == 0) {
                if (this.downx < object.x + object.width &&
                    this.downx + 50 > object.x &&
                    this.y < object.y + object.height &&
                    10 + this.y > object.y) {
                    return true;
                } else {
                    return false;
                }      
            }
        } catch (error) { }
    }

    pressleft() {
        this.pressingkeyleft = true
        console.log('pressed left arrow');
    }
    pressright() {
        this.pressingkeyright = true
        console.log('pressed right arrow');
    }
    pressdown() {
        this.pressingkeydown = true
        console.log('pressed down arrow');
    }
}