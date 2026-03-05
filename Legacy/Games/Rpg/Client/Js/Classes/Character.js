class Character {
    constructor(x = 0,y = 0,color = 'blue',username = '', id=undefined, type = 'swordsman', speed = 4) {
        this.x = x
        this.y = y
        this.w = 25
        this.h= 25

        //Velocities
        this.vleft = 0
        this.vright = 0
        this.vdown = 0
        this.vup = 0

        this.speedmax = speed

        this.health = 100;

        // //TODO: when colliding I havent completely removed cuz i dunno if this would do smt 
        // this.lastx = x
        // this.lasty = y

        //Personal
        this.color = color
        this.type = type
        this.username = username
        this.id = id

        //Inventory
        this.maxitems = 3
        this.inventory = []
    }

    dropitem(index) {
        this.inventory[index].x = character.x + 70
        this.inventory[index].y = character.y + 70
        this.inventory[index].ininventory = false;
        World.Items.push(this.inventory[index])

        delete this.inventory[index]
        this.inventory.splice(index, 1)

        UpdateInventory()
    }

    additem(item) {
        if (this.inventory.length >= 3 && typeof item === 'undefined') return true;//If Inventory is full you can return true
        else if (typeof item === "undefined") return false;

        console.log('did', item);

        this.inventory.push(item)
        UpdateInventory()
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.fillRect(this.x,this.y,this.w,this.h)

        //Health
        ctx.fillStyle = 'green'

        ctx.fillRect(this.x - this.w - 10, this.y -20,this.health,10)

        ctx.fillStyle = 'black'
        ctx.strokeRect(this.x - this.w - 10, this.y - 20, 100, 10);

        //NameTag
        ctx.font = "10px Arial";
        ctx.fillText(this.username, this.x + 5 - this.w /2, this.y - 30);
    }

    moveDown() {
        this.vdown = this.speedmax
    }

    moveUp() {
        this.vup = -this.speedmax
    }

    moveLeft() {
        this.vleft = -this.speedmax
    }

    moveRight() {
        this.vright = this.speedmax
    }

    stopLeft() {
        this.vleft = 0;
    }
    
    stopUp(){
        this.vup = 0;
    }
    
    stopDown(){
        this.vdown = 0;
    }
    
    stopRight(){
        this.vright = 0;
    }
    
    iscolliding(object) {
        if (this.x < object.x + object.w &&
            this.x + this.w > object.x &&
            this.y < object.y + object.h &&
            this.h + this.y > object.y) {
            return true;
        } else {
            return false;
        }
    }

    //Collision
    collisionDetection(obj, inputhandler) {
        if (this.x + this.w < obj.x ||
            this.x > obj.x + obj.w ||
            this.y + this.h < obj.y ||
            this.y > obj.y + obj.h) {
                if (inputhandler.keysdown.w) this.moveUp()
                if (inputhandler.keysdown.a) this.moveLeft()
                if (inputhandler.keysdown.s) this.moveDown()
                if (inputhandler.keysdown.d) this.moveRight()
                return
            }
            this.narrowPhase(obj);
    }

    narrowPhase(obj) {//COpied AND HAS A BUG WHERE YOU CAN GO THROUGH THE CORNERS and i have noidea what any of this does but it works
        let playerTop_ObjBottom = Math.abs(this.y - (obj.y + obj.h));
        let playerRight_ObjLeft = Math.abs((this.x + this.w) - obj.x);
        let playerLeft_ObjRight = Math.abs(this.x - (obj.x + obj.w));
        let playerBottom_ObjTop = Math.abs((this.y + this.h) - obj.y);
    
        if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
            this.y = obj.y + obj.h;
            this.vdown = 0;
            this.vup = 0;
        }        
        else if ((this.x + this.w >= obj.x && this.x < obj.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
            this.x = obj.x - this.w;
            this.vright = 0; 
            this.vleft = 0; 
        }
        else if ((this.y + this.h >= obj.y && this.y < obj.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
            this.y = obj.y - this.h; 
            this.vdown = 0;
            this.vup = 0;
        }
        else if ((this.x <= obj.x + obj.w && this.x + this.w > obj.x + obj.w) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
            this.x = obj.x + obj.w;
            this.vright = 0; 
            this.vleft = 0;
        }else {//dont know what i have done but it kinda works (come back and tidie up when smartws)
            if ((this.y <= obj.y + obj.h && this.y + this.h > obj.y + obj.h)) {
                this.y = obj.y + obj.h;
            }        
            else if ((this.x + this.w >= obj.x && this.x < obj.x)) {
                this.x = obj.x - this.w;
            }
            else if ((this.y + this.h >= obj.y && this.y < obj.y)) {
                this.y = obj.y - this.h; 
            }
            else if ((this.x <= obj.x + obj.w && this.x + this.w > obj.x + obj.w)) {
                this.x = obj.x + obj.w;
            }
        }
    }
    //-------------

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    update(deltaTime, WorldSize) {
        if (!deltaTime) return;

        this.x += this.vleft;
        this.x += this.vright;
        this.y += this.vdown;
        this.y += this.vup;

        if (this.health > 100) {
            this.health = 100
        }

        if (this.health <= 0) {
            this.health = 100
            this.x = this.getRndInteger(0,WorldSize.x)
            this.y = this.getRndInteger(0,WorldSize.y);
        }

        if (this.x <= 0) {
            this.x = 0
        }
        if (this.x >= WorldSize.x - this.w) {
            this.x = WorldSize.x - this.w
        }
        if (this.y <= 0) {
            this.y = 0
        }
        if (this.y >= WorldSize.y - this.h) {
            this.y = WorldSize.y - this.h
        }
    }
}