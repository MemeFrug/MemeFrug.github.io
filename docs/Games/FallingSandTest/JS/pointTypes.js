const elements = {
    void: {
        density: 0, gravity: 0, slip: 0, slide: 0, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    wall: {
        colour: {r: 0.5, g: 0.5, b: 0.5},
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    sand: {
        colour: {r: 1.0, g: 0.8, b: 0.2},
        density: 0.7, gravity: 0.8, slip: 0, slide: 0.8, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    salt: {
        colour: {r: 0.8, g: 0.8, b: 0.8},
        density: 0.6, gravity: 0.75, slip: 0.05, slide: 0.7, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    water: {
        colour: {r: 0, g: 0.4, b: 1},
        density: 0.5, gravity: 0.8, slip: 0.95, slide: 0, scatter: 0.35,
        reactions: [],
        selfReactions: [],
    },
    plant: {
        colour: {r: 0.2, g: 0.8, b: 0},
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    fire: {
        colour: {r: 0.9, g: 0.2, b: 0.1},
        red: 0.9, green: 0.2, blue: 0.1,
        density: -0.5, gravity: -0.2, slip: 0, slide: 0, scatter: 0.8,
        reactions: [],
        selfReactions: [],
    },
    oil: {
        colour: {r: 0.6, g: 0.4, b: 0.15},
        density: 0.4, gravity: 0.75, slip: 0.75, slide: 0, scatter: 0.2,
        reactions: [],
        selfReactions: [],
    },
};

let elementId = 0;
for(const elementName in elements){
    elements[elementName].id = elementId++;
}