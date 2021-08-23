class theBombCreator {
    constructor(x, y = 0,speed, appear) {
        this.width = 50;
        this.height = 10;
        this.speed = speed
        this.maxspeed = speed
        this.whenappear = appear

        this.isBomb = true;

        this.first = false

        this.x = x;
        this.y = y - 10;
    }

    draw(ctx) {
        if (this.first == false) {
            setTimeout(() => {
                this.first = true
                ctx.fillStyle = 'black';
                ctx.fillRect(this.x, this.y, this.width, this.height)
            },this.whenappear)            
        }else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    position() {
        //125 //down
        //180 //right
        //70 //left
        if (this.x == 125) {
            return 0;            
        }
        if (this.x == 180) {
            return 2;            
        }
        if (this.x == 70) {
            return 1;            
        }

    }

    update(deltaTime) {
        if (!deltaTime) return;

        if (this.first == true) {
            this.y += this.speed;   
        }
    }
}
