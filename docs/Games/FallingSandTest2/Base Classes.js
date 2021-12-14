//Base Classes.js

//Base Element:
class Element {
    //Abstract Class for elements
    constructor(i, j, ElementId) {
        this.i = i;
        this.j = j;

        this.c = "red";

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
    constructor(i, j, ElementId) {
        super(i, j, ElementId);

        this.dispersionRate = 5
    }

    //Abstract Class for liquids

    Update(deltaTime, Change, params = { i: this.i, j: this.j }) {
        let TargetCell = Points[this.i][this.j + 1];

        this.i = params.i;
        this.j = params.j;

        if (TargetCell instanceof Void) {
            Change.push(() => {
                //Switch with it
                //Make a function
                //but at the moment just do it
                let CurrentOccupied = Points[this.i][this.j]
                let CurrentOccupied2 = Points[this.i][this.j + 1]

                Points[this.i][this.j] = CurrentOccupied2
                Points[this.i][this.j + 1] = CurrentOccupied

                Points[this.i][this.j].j = this.j;

                this.j = this.j + 1;
            })
        }
        else if (TargetCell instanceof Solid || TargetCell instanceof Liquid) {
            const RandomLeftRight = Math.floor(Math.random() * 2)
            // 0 == Left
            // 1 == Right
            if (RandomLeftRight == 0) {
                let FoundEnd = false
                for (let i = 1; i <= this.dispersionRate; i++) {
                    if (Points[this.i - i] && Points[this.i + i]) {
                        TargetCell = Points[this.i - i][this.j];
                        if (TargetCell instanceof Solid || TargetCell instanceof Liquid){
                            FoundEnd = true
                            i -= 2;
                            continue;
                        }
                        else if (FoundEnd) {
                            Change.push(() => {
                                let CurrentOccupied = Points[this.i][this.j]
                                let CurrentOccupied2 = Points[this.i - i][this.j]
                
                                Points[this.i][this.j] = CurrentOccupied2
                                Points[this.i - i][this.j] = CurrentOccupied
                
                                Points[this.i][this.j].i = this.i;
                
                                this.i = this.i - i;
                            })
                            break;
                        }else if (i == this.dispersionRate){
                            Change.push(() => {
                                let CurrentOccupied = Points[this.i][this.j]
                                let CurrentOccupied2 = Points[this.i - i][this.j]
                
                                Points[this.i][this.j] = CurrentOccupied2
                                Points[this.i - i][this.j] = CurrentOccupied
                
                                Points[this.i][this.j].i = this.i;
                
                                this.i = this.i - i;
                            })
                        }
                    }else {
                        break;
                    }
                }

            }
            else if (RandomLeftRight == 1) {
                let FoundEnd = false
                for (let i = 1; i <= this.dispersionRate; i++) {
                    if (Points[this.i - i] && Points[this.i + i]) {
                        TargetCell = Points[this.i + i][this.j];
                        if (TargetCell instanceof Solid || TargetCell instanceof Liquid){
                            FoundEnd = true
                            i -= 2;
                            continue;
                        }else if (FoundEnd) {
                            Change.push(() => {
                                let CurrentOccupied = Points[this.i][this.j]
                                let CurrentOccupied2 = Points[this.i + i][this.j]
                
                                Points[this.i][this.j] = CurrentOccupied2
                                Points[this.i + i][this.j] = CurrentOccupied
                
                                Points[this.i][this.j].i = this.i;
                
                                this.i = this.i + i;
                            })
                            break;
                        }else if (i == this.dispersionRate){
                            Change.push(() => {
                                let CurrentOccupied = Points[this.i][this.j]
                                let CurrentOccupied2 = Points[this.i + i][this.j]
                
                                Points[this.i][this.j] = CurrentOccupied2
                                Points[this.i + i][this.j] = CurrentOccupied
                
                                Points[this.i][this.j].i = this.i;
                
                                this.i = this.i + i;
                            })
                        }
                    }else {
                        break;
                    }
                }
            }
        }
        return Change;
    }
}



class Solid extends Element {
    //Abstract Class for solids
    // checkDiagonally(Change) {
    //     let TargetCell;

    //     if (Points[this.i - 1]) {
    //         TargetCell = Points[this.i + 1][this.j + 1];

    //         if (TargetCell instanceof Void) {
    //             Change.push(() => {
    //                 //Switch with it
    //                 //Make a function
    //                 //but at the moment just do it
    //                 let CurrentOccupied = Points[this.i][this.j]
    //                 let CurrentOccupied2 = Points[this.i + 1][this.j + 1]

    //                 Points[this.i][this.j] = CurrentOccupied2
    //                 Points[this.i + 1][this.j + 1] = CurrentOccupied

    //                 this.i = this.i + 1;
    //                 this.j = this.j + 1;
    //             })
    //         }

    //         else if (TargetCell instanceof Liquid) {
    //             Change.push(() => {
    //                 let CurrentOccupied = Points[this.i][this.j]
    //                 let CurrentOccupied2 = Points[this.i + 1][this.j + 1]

    //                 Points[this.i][this.j] = CurrentOccupied2
    //                 Points[this.i + 1][this.j + 1] = CurrentOccupied

    //                 this.i = this.i + 1;
    //                 this.j = this.j + 1;
    //             })
    //         }

    //         else if (TargetCell instanceof Solid) {
    //             if (Points[this.i + 1]) {
    //                 TargetCell = Points[this.i - 1][this.j + 1];

    //                 if (TargetCell instanceof Void) {
    //                     Change.push(() => {
    //                         //Switch with it
    //                         //Make a function
    //                         //but at the moment just do it
    //                         let CurrentOccupied = Points[this.i][this.j]
    //                         let CurrentOccupied2 = Points[this.i - 1][this.j + 1]

    //                         Points[this.i][this.j] = CurrentOccupied2
    //                         Points[this.i - 1][this.j + 1] = CurrentOccupied

    //                         this.i = this.i - 1;
    //                         this.j = this.j + 1;
    //                     })
    //                 }

    //                 else if (TargetCell instanceof Liquid) {
    //                     Change.push(() => {
    //                         let CurrentOccupied = Points[this.i][this.j]
    //                         let CurrentOccupied2 = Points[this.i - 1][this.j + 1]

    //                         Points[this.i][this.j] = CurrentOccupied2
    //                         Points[this.i - 1][this.j + 1] = CurrentOccupied

    //                         this.i = this.i - 1;
    //                         this.j = this.j + 1;
    //                     })
    //                 }
    //             }
    //         }
    //     }

    //     return Change
    // }
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
    Update(deltaTime, Change, params = { i: this.i, j: this.j }) {
        const TargetCell = Points[this.i][this.j + 1];

        this.i = params.i;
        this.j = params.j;

        if (TargetCell instanceof Void || TargetCell instanceof Liquid) {
            Change.push(() => {
                //Switch with it
                //Make a function
                //but at the moment just do it
                let CurrentOccupied = Points[this.i][this.j]
                let CurrentOccupied2 = Points[this.i][this.j + 1]

                Points[this.i][this.j] = CurrentOccupied2
                Points[this.i][this.j + 1] = CurrentOccupied

                Points[this.i][this.j].j = this.j;

                this.j = this.j + 1;
            })
        }
        else if (TargetCell instanceof Solid) {

            // Change = this.checkDiagonally(Change);

            let TargetCell;

            if (Points[this.i - 1]) {
                // console.log("went into here 2");
                TargetCell = Points[this.i - 1][this.j + 1];

                if (TargetCell instanceof Void || TargetCell instanceof Liquid) {
                    Change.push(() => {
                        //Switch with it
                        //Make a function
                        //but at the moment just do it
                        let CurrentOccupied = Points[this.i][this.j]
                        let CurrentOccupied2 = Points[this.i - 1][this.j + 1]

                        Points[this.i][this.j] = CurrentOccupied2
                        Points[this.i - 1][this.j + 1] = CurrentOccupied

                        Points[this.i][this.j].i = this.i;
                        Points[this.i][this.j].j = this.j;

                        this.i = this.i - 1;
                        this.j = this.j + 1;
                    })
                }

                else if (TargetCell instanceof Solid) {
                    if (Points[this.i + 1]) {
                        TargetCell = Points[this.i + 1][this.j + 1];

                        // console.log(TargetCell.constructor);

                        if (TargetCell instanceof Void || TargetCell instanceof Liquid) {
                            Change.push(() => {
                                //Switch with it
                                //Make a function
                                //but at the moment just do it
                                let CurrentOccupied = Points[this.i][this.j]
                                let CurrentOccupied2 = Points[this.i + 1][this.j + 1]

                                Points[this.i][this.j] = CurrentOccupied2
                                Points[this.i + 1][this.j + 1] = CurrentOccupied


                                Points[this.i][this.j].i = this.i;
                                Points[this.i][this.j].j = this.j;

                                this.i = this.i + 1;
                                this.j = this.j + 1;
                            })
                        }
                    }
                }
            }
        }
        return Change;
    }
}
