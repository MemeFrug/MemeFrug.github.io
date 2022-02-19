class AssaultRifle extends Gun {
    constructor(owner){
        super()
        this.name = "Assault Rifle"
        this.MaxAmmo = 60;
        this.TotalAmmo = this.MaxAmmo
        this.timeoutshoot = 50
        this.timeTakesToReload = 3000

        this.image = new Image(-500)
        this.image.src = './Images/Guns/Assault_Rifle/Assault_Rifle.png'

        this.ownedby = owner
    }
}