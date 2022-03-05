class Gun {
    constructor() {
        this.reloading = false
        this.type = "Gun"
        this.canshoot = true;
        this.inventoryindex = character.inventory.length;

        //-------Other References---------
        //this.MaxAmmo = 30
        //this.TotalAmmo = this.MaxAmmo
        //this.timeoutshoot = 100 //Default
        //this.timeTakesToReload = 3000//milliseconds

        this.isshooting = false;

        //owner
        this.ownedby = undefined;

        //shootpos
        this.shootpos = {
            x: 0,
            y: 0
        }

        //Droped on ground
        this.ininventory = true;

        this.x = null;
        this.y = null;

        //HitBox
        this.hw = 50;
        this.hh = 50;
    }

    iscolliding(object) {
        if (this.x < object.x + object.w &&
            this.x + this.hw > object.x &&
            this.y < object.y + object.h &&
            this.hh + this.y > object.y) {
            return true;
        } else {
            return false;
        }
    }

    draw(ctx) {
        let centercharacterh = this.ownedby.h / 2
        let centercharacterw = this.ownedby.w / 2
        let angle = (Math.atan2(mousepos.y - this.ownedby.y - centercharacterh, mousepos.x - this.ownedby.x - centercharacterw) - Math.PI / 2) + Math.PI / 2 

        this.shootpos = {
            x: this.ownedby.x, 
            y: this.ownedby.y
        }

        if (this.ininventory) {
            //Continue Drawing
            if (this.image.complete && angle <= 1.5 && angle >= -1.5) {
                ctx.setTransform(1, 0, 0, 1, this.ownedby.x + camX + centercharacterw, this.ownedby.y + camY + centercharacterh);
                ctx.rotate(angle);
                ctx.scale(0.15,0.15)
                ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            }
            else {
                ctx.setTransform(1, 0, 0, 1, this.ownedby.x + camX + centercharacterw, this.ownedby.y + camY + centercharacterh);
                ctx.rotate(angle);
                ctx.scale(0.15,-0.15)
                ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            }
            return;
        }
        
        ctx.fillRect(this.x, this.y, this.hw, this.hh)
        ctx.setTransform(1, 0, 0, 1, this.x + camX + 30, this.y + camY);
        ctx.rotate(90);
        ctx.scale(0.15,0.15)
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    }

    use() {
        if (this.TotalAmmo <= 0) this.reload(this.inventoryindex) 
        if (this.reloading) return;
        if (!this.canshoot) return;
        World.Bullets.push(new Bullet(this.shootpos.x, this.shootpos.y, mousepos.x, mousepos.y, undefined, true));
        if (issingleplayer == "false") socket.emit('New Bullet', {x: character.x, y: character.y, Mouse: {x: mousepos.x, y: mousepos.y}})
        this.TotalAmmo -= 1
        document.getElementById("ammoamount").innerHTML = this.TotalAmmo
        this.canshoot = false;
        setTimeout(() => {
            this.canshoot = true;
        }, this.timeoutshoot);
    }

    reload() {
        if (!this.reloading && this.TotalAmmo != this.MaxAmmo) {
            this.reloading = true;
            document.getElementById("ammocounter").innerHTML = 'Reloading...'
            setTimeout(() => {
                this.TotalAmmo = this.MaxAmmo
                this.reloading = false;
                FinishReloading(this.inventoryindex)
            }, this.timeTakesToReload);
        }
    }


    update() {
        if (this.isshooting) {
            this.use()
        }
    }
}