//Base Classes.js

//Base Element:
class Element {
    //Abstract Class for elements
    constructor(i, j, ElementId) {
        this.i = i;
        this.j = j;

        this.Element = ElementId;

        this.flammabilityResistance = 1;
        this.isIgnited = false;
    }

    checkIfIgnited() {
        if (this.flammabilityResistance <= 0) {
            this.isIgnited = true;
        }
    }

    recieveHeat(heat) {
        //Abstract method
        if (this.isIgnited) {
            return false
        }
        this.flammabilityResistance -= Math.random() * heat;
        checkIfIgnited(this);
        return true;
    }

    Update(deltaTime, Change) {
        //Abstract method

        return Change;
    }
}

// Abstract Classes for cells
class Liquid extends Element {
    //Abstract Class for liquids

    Update(deltaTime, Change) {

        if (Points[i][j + 1]) {
            Change.push(() => {
            })
        }
        else if (Points[i - 1][j + 1]) {
            Change.push(() => {
            })
        }
        else if (Points[i + 1][j + 1]) {
            Change.push(() => {
            })
        }
        else if (Points[i - 1][j]) {
            Change.push(() => {
            })
        }
        else if (Points[this.i + 1][j]) {
            Change.push(() => {
            })
        }

        return Change
    }
}

class Solid extends Element {
    //Abstract Class for solids
    checkDiagonally(leftorright, Change) {
        //Left is: 0
        //Right is: 1
        let x = 0;
        let TargetCell;

        if (leftorright == 0) {
            x = this.i - 1;
        }
        else {
            x = this.i + 1;
        }
        
        if (!Points[x]) return false;
        TargetCell = Points[x][this.j + 1];

        if (TargetCell instanceof Void) {
            Change.push(() => {
                //Switch with it
                //Make a function
                //but at the moment just do it
                let CurrentOccupied = Points[this.i][this.j]
                let CurrentOccupied2 = Points[x][this.j + 1]

                Points[this.i][this.j] = CurrentOccupied2
                Points[x][this.j + 1] = CurrentOccupied
                
                this.i = x;
                this.j = this.j + 1;
            })
        }

        else if (TargetCell instanceof Liquid) {
            Change.push(() => {
                let CurrentOccupied = Points[this.i][this.j]
                let CurrentOccupied2 = Points[x][this.j + 1]

                Points[this.i][this.j] = CurrentOccupied2
                Points[x][this.j + 1] = CurrentOccupied
                
                this.i = x;
                this.j = this.j + 1;
            })
        }

        else if (TargetCell instanceof Solid) {
            //Do nothing
        }

        return Change
    }
}

class Gas extends Element {
    //Abstract Class for gases

}

//Solid Extended Classes
class ImmovableSolid extends Solid {
    //Abstract Class for immovable solids
}

class MovableSolid extends Solid {
    //Abstract Class for movable solids
    Update(deltaTime, Change) {
        const TargetCell = Points[this.i][this.j + 1];

        if (TargetCell instanceof Void) {
            Change.push(() => {
                //Switch with it
                //Make a function
                //but at the moment just do it
                let CurrentOccupied = Points[this.i][this.j]
                let CurrentOccupied2 = Points[this.i][this.j + 1]
    
                Points[this.i][this.j] = CurrentOccupied2
                Points[this.i][this.j + 1] = CurrentOccupied
                this.i = this.i;
                this.j = this.j + 1;
            })
        }

        else if (TargetCell instanceof Liquid) {
            Change.push(() => {
                let CurrentOccupied = Points[this.i][this.j]
                let CurrentOccupied2 = Points[this.i][this.j + 1]

                Points[this.i][this.j] = CurrentOccupied2
                Points[this.i][this.j + 1] = CurrentOccupied
                
                this.i = this.i;
                this.j = this.j + 1;
            })
        }
        else if (TargetCell instanceof Solid) {
            Change = this.checkDiagonally(0, Change);
        }
        return Change;
    }
}
