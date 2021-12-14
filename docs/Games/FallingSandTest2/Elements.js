
const elementType = {
    // Constants For Element Types
    VOID: 0,
    WATER: 1,
    SAND: 2,
    STONE: 3,
    STEAM: 4,
};

class Water extends Liquid {
    // Class For Water Extends Liquid Class
    constructor(i, j) {
        super(i, j);

        this.c = "blue";

        this.i = i; 
        this.j = j;
        
        this.dispersionRate = 3

        this.Element = elementType.WATER;

        this.flammabilityResistance = 1;
        this.isIgnited = false;   
    }

    recieveHeat(heat) {
        dieAndReplace({i: this.i, j:this.j}, Steam);
        return true;
    }
}

class Sand extends MovableSolid {
    // Class For Sand Extends MovableSolid Class
    constructor(i, j) {
        super(i, j);

        this.i = i;
        this.j = j;
        
        this.c = "yellow";

        this.Element = elementType.SAND;

        this.flammabilityResistance = 1;
        this.isIgnited = false;   
    }
}

class Stone extends ImmovableSolid {
    // Class For Stone Extends ImmovableSolid Class
    constructor(i, j) {
        super(i, j);

        this.i = i; 
        this.j = j;

        this.c = "grey"

        this.Element = elementType.STONE;

        this.flammabilityResistance = 1;
        this.isIgnited = false;   
    }

    recieveHeat(heat) {
        return false;
    }
}

class Steam extends Gas {
    // Class For Smoke Extends Gas Class
    constructor(i, j) {
        this.i = i; 
        this.j = j;

        this.Element = elementType.STEAM;

        this.flammabilityResistance = 1;
        this.isIgnited = false;   
    }
}

class Void extends Element {
    // Class For Void Extends Element Class
    constructor(i, j) {
        super(i, j);

        this.i = i; 
        this.j = j;

        this.Element = elementType.VOID;

        this.flammabilityResistance = 1;
        this.isIgnited = false;   
    }
}