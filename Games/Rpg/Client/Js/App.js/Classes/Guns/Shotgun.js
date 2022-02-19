class Shotgun extends Gun {
    constructor(owner) {
        super()
        this.name = "Shotgun"
        this.MaxAmmo = 8
        this.TotalAmmo = this.MaxAmmo
        this.timeoutshoot = 800
        this.timeTakesToReload = 3500

        this.image = new Image(-500)
        this.image.src = './Images/Guns/Shotgun/Shotgun.png'

        this.ownedby = owner

        //HitBox
        this.hx = this.ownedby.x;
        this.hy = this.ownedby.y;
        this.hw = 50;
        this.hh = 80;
    }

    use() {
        if (this.TotalAmmo <= 0) this.reload(this.inventoryindex) 
        if (this.reloading) return;
        if (!this.canshoot) return;
        World.Bullets.push(new Bullet(this.shootpos.x, this.shootpos.y, mousepos.x, mousepos.y, undefined, true));
        if (issingleplayer == "false") socket.emit('New Bullet', {x: character.x, y: character.y, Mouse: {x: mousepos.x, y: mousepos.y}})
        
        World.Bullets.push(new Bullet(this.shootpos.x, this.shootpos.y, mousepos.x + 15, mousepos.y + 15, undefined, true));
        if (issingleplayer == "false") socket.emit('New Bullet', {x: character.x, y: character.y, Mouse: {x: mousepos.x + 15, y: mousepos.y + 15}})
        
        World.Bullets.push(new Bullet(this.shootpos.x, this.shootpos.y,mousepos.x - 15, mousepos.y - 15, undefined, true));
        if (issingleplayer == "false") socket.emit('New Bullet', {x: character.x, y: character.y, Mouse: {x: mousepos.x - 15, y: mousepos.y - 15}})

        this.TotalAmmo -= 1
        document.getElementById("ammoamount").innerHTML = this.TotalAmmo
        this.canshoot = false;
        setTimeout(() => {
            this.canshoot = true;
        }, this.timeoutshoot);
    }

}