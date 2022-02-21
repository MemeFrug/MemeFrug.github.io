/**
 * When the Window Loads
 */
window.onload = async () => {
    await animate(_Quad, Animations.title_position, 2000, 0.8)
    await animate(_Quad, Animations.opacity_buttons, 1000, 1)
}

/**
 * When Clicks Play Button Play An Animation to Remove The Buttons with an opacity
 */
async function Play() {
    //Remove the Event Listeners for the buttons
    document.getElementById("Settings-Button").removeEventListener("mouseup", Settings)
    document.getElementById("Back-Button").removeEventListener("mouseup", BackToHub)
    document.getElementById("Play-Button").removeEventListener("mouseup", Play)

    await animate((time) => { return time }, Animations.opacity_buttons_none, 2000, 1) // Play An Animation, but wait till it it resoved by the Promise
    MainMenuElementDOM.style.display = "none" // Remove The Buttons Completely so they dont get into the way

    Game._Init() // Start The Game
}

/**
 * Opens up the settings menu
 */
async function Settings() {

}

/**
 * Changes The Page To The Main Hub Of the Webstie
 */
async function BackToHub() {
    window.location.replace("../../index.html"); // Send The Player Back to The Hub
}

/**
 * Detect When A Button Is Pressed
 */
document.getElementById("Back-Button").addEventListener("mouseup", BackToHub) // When the Back to hub button is clicked
document.getElementById("Settings-Button").addEventListener("mouseup", Settings) // When the settings button is clicked
document.getElementById("Play-Button").addEventListener("mouseup", Play) // Start The Play Function




















/* 

*/
// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Composites = Matter.Composites,
  Common = Matter.Common,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Constraint = Matter.Constraint,
  Vertices = Matter.Vertices,
  Mouse = Matter.Mouse;

// create an engine
var engine = Engine.create();

var width_ = 1920;
var height_ = 1080;
var chain_number = 10;
// create a renderer
var render = Render.create({
  element: document.getElementById("canvas"),
  engine: engine,
  options: {
    width: width_,
    height: height_,
    showVelocity: false,
    wireframes: false
  }
});

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

// create two boxes and a ground----------------
var boxR = Bodies.rectangle(width_, height_ / 2, 40, height_, {
  isStatic: true,
  friction: 0,
  restitution: 0.8
});
var boxL = Bodies.rectangle(0, height_ / 2, 40, height_, {
  isStatic: true,
  friction: 0,
  restitution: 0.8
});
var circle = Bodies.circle(90, 90, 10, {
  friction: 0,
  restitution: 0.8
});
var ground = Bodies.rectangle(width_ / 2, height_, width_, 100, {
  isStatic: true,
  angle: 0,
  friction: 0,
  restitution: 0.8
});
//-------------------------------------

var x = [];
var y = [];
var zahyou = [];
var radius = 20;
var angle_upper_limit = 30;

//table with smooth edges-----------------------
zahyou.push({ x: 200 + radius, y: height_ - 100 });
zahyou.push({ x: -radius, y: height_ - 100 });
for (var i = angle_upper_limit; i > 0; i--) {
  x.push(radius * Math.cos((i * 3 * 2 * Math.PI) / 360) + 200);
  y.push(radius * Math.sin((-i * 3 * 2 * Math.PI) / 360) + 100);
}

for (var i = 180; i < 180 + angle_upper_limit; i++) {
  x.push(radius * Math.cos((i * 3 * 2 * Math.PI) / 360) + 0);
  y.push(radius * Math.sin((i * 3 * 2 * Math.PI) / 360) + 100);
}

for (var i = 0; i < x.length; i++) {
  zahyou.push(Matter.Vector.create(x[i], y[i]));
}

var tmp = Matter.Vertices.create(zahyou);
//decomp.makeCCW(zahyou);

var bodyC = Matter.Bodies.fromVertices(width_ / 2, height_ / 2 + 100, tmp, {
  friction: 0,
  restitution: 0.8,
});
Matter.Body.setStatic(bodyC, true);


var BoxA = Bodies.rectangle((width_ * 2) / 4 + 160, 220, 20, 20, {
  isStatic: false,
  friction: 0,
  restitution: 0,
  density: 0.005,
});
var BoxB = Bodies.rectangle((width_ * 2) / 4 + 30, 250, 100, 20, {
  isStatic: false,
  friction: 0,
  restitution: 0,
  density: 0.0005
});

//bridge
var bridge_length = width_*8/10;
var Bridge = Bodies.rectangle((width_ ) / 2, height_*2/3, bridge_length, 10, {
  isStatic: false,
  friction: 0,
  restitution: 0,
  density: 0.03,
});

//-----------------chain and boxes--------------------
var Boxes = [];
for (var i = 0; i < chain_number; i++) {
  Boxes.push(
    Bodies.circle((width_ * 2) / 4 + 50 + i, 120, 4, {
      isStatic: false,
      density: 0.0001,
      friction: 0,
      restitution: 0.5
    })
  );
}

//connect each chain
var constraints = [];
for (var i = 0; i < Boxes.length - 1; i++) {
  constraints.push(
    Constraint.create({
      bodyA: Boxes[i],
      bodyB: Boxes[i + 1],
      length: bridge_length/Boxes.length,
      stiffness: 1,
      damping: 0.1
    })
  );
}

var anchor_point = -80;
//connect Right wall and chain
constraints.push(
  Constraint.create({
    bodyA: boxR,
    pointA: { x: -20, y: anchor_point },
    bodyB: Boxes[chain_number - 1],
    length: 20,
    stiffness: 0
  })
);

//connect Left wall and chain
constraints.push(
  Constraint.create({
    bodyA: boxL,
    pointA: { x: 20, y: anchor_point },
    bodyB: Boxes[0],
    length: 20,
    stiffness: 0
  })
);

var length_string = 50;
//connect Bridge and chains
for(var i = 0; i < chain_number; i++){
constraints.push(
  Constraint.create({
    bodyA: Bridge,
    pointA: { x: -(bridge_length)/2+(bridge_length)*i/(chain_number-1), y: 0 },
    bodyB: Boxes[i],
    length: Math.pow(Math.abs(i+1-chain_number/2),2)*1.5 + 10,
    stiffness: 0.1,
    render:{
      type: "line",
    }
    
  })
);
}
//-------------------------------------------------

//human
var human = [];
  human.push(
    Bodies.circle((width_ * 2) / 4 + 50 + i, 120, 4, {
      isStatic: false,
      density: 0.0001,
      friction: 0,
      restitution: 0.5
    })
  );

//add boxes
var Boxes = [];
var number_of_box = 0;
window.onclick = () => { 
  Boxes.push(
    Bodies.rectangle(150, 50, 20, 20, {
      isStatic: false,
      restitution: 0.7,
      friction: 0.02,
      frictionAir: 0,
      density: 0.01,
    })
  );
  World.add(engine.world, Boxes[number_of_box]);
  number_of_box++;
}



World.add(engine.world, constraints);
for (var i = 0; i < Boxes.length; i++) {
  World.add(engine.world, Boxes[i]);
}
World.add(engine.world, [Bridge,/*BoxA, BoxB,*/ ground, /*circle,*/ boxR, boxL,human, /*bodyC*/]);

World.add(engine.world, mouseConstraint);

engine.world.gravity.y = 0.5;

// keep the mouse in sync with rendering
render.mouse = mouse;
// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
engine.constraintIterations = 20;
//console.log(body.position);
