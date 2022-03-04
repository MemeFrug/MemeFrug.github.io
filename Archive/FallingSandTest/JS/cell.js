//To Hex Value
function rgb2hex(red, green, blue){
    return "#" + (
        ("0" + Math.floor(red * 255).toString(16)).slice(-2) +
        ("0" + Math.floor(green * 255).toString(16)).slice(-2) +
        ("0" + Math.floor(blue * 255).toString(16)).slice(-2)
    );
}
  

class Cell {
    constructor(Occupied) {
        this.Occupied = Occupied

        this.UpdateCell()
    }

    UpdateCell() {       
        if(!this.Occupied) return; 
        if (this.Occupied.colour)
            this.c = rgb2hex(this.Occupied.colour.r,this.Occupied.colour.g,this.Occupied.colour.b)
        else this.c = undefined
    }
}