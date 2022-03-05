class Pistol extends Gun {
    constructor(owner) {
        super()
        this.name = "Pistol"
        this.MaxAmmo = 30
        this.TotalAmmo = this.MaxAmmo
        this.timeoutshoot = 200
        this.timeTakesToReload = 2000

        this.image = new Image(-500)
        this.image.src = './Images/Guns/Pistol/Black_Pistol.png'

        this.ownedby = owner

        //HitBox
        this.hx = this.ownedby.x;
        this.hy = this.ownedby.y;
        this.hw = 30;
        this.hh = 50;
    }
}