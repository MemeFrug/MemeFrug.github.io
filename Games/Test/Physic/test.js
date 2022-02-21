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

var width_ = 800;
var height_ = 800;
var chain_number = 10;
// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: width_,
    height: height_,
    showVelocity: true,
    wireframes: false
  }
});

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 1,
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

var anchor_point = -80;

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

function draw_rectangle() {
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

setInterval(() => {
    draw_rectangle()
});

for (var i = 0; i < Boxes.length; i++) {
  World.add(engine.world, Boxes[i]);
}
World.add(engine.world, [ground, /*circle,*/ boxR, boxL,human, /*bodyC*/]);

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
