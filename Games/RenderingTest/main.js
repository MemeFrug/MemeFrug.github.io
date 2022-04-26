const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

let perlin_octaves = 4; // default to medium smooth
let perlin_amp_falloff = 0.5; // 50% reduction/octave

let perlin;

const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));

function noiseSeed(seed) {
    // Linear Congruential Generator
    // Variant of a Lehman Generator
    const lcg = (() => {
      // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
      // m is basically chosen to be large (as it is the max period)
      // and for its relationships to a and c
      const m = 4294967296;
      // a - 1 should be divisible by m's prime factors
      const a = 1664525;
      // c and m should be co-prime
      const c = 1013904223;
      let seed, z;
      return {
        setSeed(val) {
          // pick a random seed if val is undefined or null
          // the >>> 0 casts the seed to an unsigned 32-bit integer
          z = seed = (val == null ? Math.random() * m : val) >>> 0;
        },
        getSeed() {
          return seed;
        },
        rand() {
          // define the recurrence relationship
          z = (a * z + c) % m;
          // return a float in [0, 1)
          // if z = m then z / m = 0 therefore (z % m) / m < 1 always
          return z / m;
        }
      };
    })();
  
    lcg.setSeed(seed);
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = lcg.rand();
    }
};

function noise(x, y = 0, z = 0) {
    if (perlin == null) {
      perlin = new Array(PERLIN_SIZE + 1);
      for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = Math.random();
      }
    }
  
    if (x < 0) {
      x = -x;
    }
    if (y < 0) {
      y = -y;
    }
    if (z < 0) {
      z = -z;
    }
  
    let xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let rxf, ryf;
  
    let r = 0;
    let ampl = 0.5;
  
    let n1, n2, n3;
  
    for (let o = 0; o < perlin_octaves; o++) {
      let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
  
      rxf = scaled_cosine(xf);
      ryf = scaled_cosine(yf);
  
      n1 = perlin[of & PERLIN_SIZE];
      n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
      n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);
  
      of += PERLIN_ZWRAP;
      n2 = perlin[of & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
      n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);
  
      n1 += scaled_cosine(zf) * (n2 - n1);
  
      r += n1 * ampl;
      ampl *= perlin_amp_falloff;
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;
  
      if (xf >= 1.0) {
        xi++;
        xf--;
      }
      if (yf >= 1.0) {
        yi++;
        yf--;
      }
      if (zf >= 1.0) {
        zi++;
        zf--;
      }
    }
    return r;
};




let inc = 0.01;
let perlinNoise;
let width;
let height;
let points = []

const pixelOffset = 9
const cubeSize = 10
const scl = 1



























const player = new Player(false, 0, 10, 50, 50, 100, 500, -900);
player.c = "red" // Set the colour of the player from default: black to red
ENGINE.Config.sideScroller = true
ENGINE.addPlayer(player, true)

let stats;

const WORLD_LAYER_1_SQUARE_SIZE = 150
// const WORLD_LAYER_2_SQUARE_SIZE = 20
const WORLD_COLS = 50
const WORLD_ROWS = 50
const WORLD_SIZE_W = WORLD_LAYER_1_SQUARE_SIZE * WORLD_COLS
const WORLD_SIZE_H = WORLD_LAYER_1_SQUARE_SIZE * WORLD_ROWS
// const WORLD_LAYER_2_COLS = Math.round(WORLD_LAYER_1_SQUARE_SIZE / WORLD_LAYER_2_SQUARE_SIZE)
// const WORLD_LAYER_2_ROWS = Math.round(WORLD_LAYER_1_SQUARE_SIZE / WORLD_LAYER_2_SQUARE_SIZE)

let world = []

let CubeToShow = []

function setup() {
    stats = new Stats();
    stats.autoLoad()

    ENGINE.Config.g = 2500

    
	perlin_octaves = 2
	noiseSeed(789)       





    WORLD.size = {
        w: WORLD_SIZE_W,
        h: WORLD_SIZE_H
    }

    //Layer 1
    for (let i = 0; i < WORLD_ROWS; i++) {
        let row = []
        for (let i = 0; i < WORLD_COLS; i++) {
            row.push([])

            // let rowlayer2 = []
            // //Layer 2
            // for (let i = 0; i < WORLD_LAYER_2_ROWS; i++) {
            //     let rowLayer2Rows = []

            //     for (let i = 0; i < WORLD_LAYER_2_COLS; i++) {
            //         rowLayer2Rows.push([])
            //     }
            //     rowlayer2.push(rowLayer2Rows)
            // }
            // row.push(rowlayer2)
        }
        world.push(row)
    }
    // console.log(world);

    document.getElementById("PlayButtonElement").addEventListener("mouseup", () => {
        document.getElementById("MainMenu").style.display = "none"
        setupGame()

        // -------------------------------
        
        const ctx = ENGINE.canvas.ctx
		ctx.imageSmoothingEnabled = false

		width = WORLD.size.w
		height = WORLD.size.h

		let yoff = 0;

		//Generate The Map
		for (let y = 0; y < height; y += pixelOffset) {
            let xoff = 0;
            for (let x = 0; x < width; x += pixelOffset) {
                var r = floor( noise(xoff * scl, yoff * scl) * 255 )
				
				if (r > 100) {
					// points.push({c: "lightblue", x: x, y: y})
				}
				else if (r <= 100) {
                    let x2 = 0
                    let y2 = 0
                    for (let i = 0; i < world.length; i++) {
                        x2 = 0;
                        for (let j = 0; j < world[i].length; j++) {
                
                            if (_rectIntersect(x2, y2, WORLD_LAYER_1_SQUARE_SIZE, WORLD_LAYER_1_SQUARE_SIZE, x, y, cubeSize, cubeSize)) {
                                world[i][j].push({c: "rgb(74, 41, 3)", x: x, y: y})
                            }
                            x2 += WORLD_LAYER_1_SQUARE_SIZE;
                        }
                
                        y2 += WORLD_LAYER_1_SQUARE_SIZE;
                    }
					// points.push({c: "rgb(54, 43, 16)", x: x, y: y})
				}

                xoff += inc;
            }
			yoff += inc;
		}
    })
}

function draw(ctx) {
    // ctx.scale(0.2, 0.2)
    let x = 0;
    let y = 1;

    CubeToShow = []

    ctx.lineWidth = 10
    ctx.strokeRect(-ENGINE.VARIABLES.Cam.x, -ENGINE.VARIABLES.Cam.y, ENGINE.Config.nativeWidth, ENGINE.Config.nativeHeight)

    for (let i = 0; i < world.length; i++) {
        x = 0;

        for (let j = 0; j < world[i].length; j++) {
            //Show The Squares
            ctx.fillStyle = "black"
            ctx.lineWidth = 5
            ctx.strokeRect(x, y, WORLD_LAYER_1_SQUARE_SIZE, WORLD_LAYER_1_SQUARE_SIZE)
            ctx.lineWidth = 1

            //Check if the Player is in this square
            // if (_rectIntersect(x, y, WORLD_LAYER_1_SQUARE_SIZE, WORLD_LAYER_1_SQUARE_SIZE, player.x, player.y, player.w, player.h)) {
            //     //Update the variable
            //     CubeToShow.push({i:i,j:j})

            //     //The one to the right
            //     if (world[i][j+1]) CubeToShow.push({i:i,j:j+1})
            //     //The one to the left
            //     if (world[i][j-1]) CubeToShow.push({i:i,j:j-1})
            //     //The one below
            //     if (world[i+1]) CubeToShow.push({i:i+1,j:j})
            //     //The one above
            //     if (world[i-1]) CubeToShow.push({i:i-1,j:j})
            //     //The one diagonal top right
            //     if (world[i-1]) if (world[i-1][j+1]) CubeToShow.push({i:i-1,j:j+1})
            //     //The one diagonal top left
            //     if (world[i-1]) if (world[i-1][j-1]) CubeToShow.push({i:i-1,j:j-1})
            //     //The one diagonal bottom right
            //     if (world[i+1]) if (world[i+1][j+1]) CubeToShow.push({i:i+1,j:j+1})
            //     //The one diagonal bottom left
            //     if (world[i+1]) if (world[i+1][j-1]) CubeToShow.push({i:i+1,j:j-1})
            // }

            if (_rectIntersect(x, y, WORLD_LAYER_1_SQUARE_SIZE, WORLD_LAYER_1_SQUARE_SIZE, -ENGINE.VARIABLES.Cam.x, -ENGINE.VARIABLES.Cam.y, ENGINE.Config.nativeWidth, ENGINE.Config.nativeHeight)) {
                //Update the variable
                CubeToShow.push({i:i,j:j})
            }
            x += WORLD_LAYER_1_SQUARE_SIZE;
        }

        y += WORLD_LAYER_1_SQUARE_SIZE;
    }

    //Draw Everything Inside Those Squares
    //Let us draw the tiny squares inside the big square
    for (let s = 0; s < CubeToShow.length; s++) {
        const element = CubeToShow[s];
        const i = element.i
        const j = element.j
        const x = j * WORLD_LAYER_1_SQUARE_SIZE
        const y = i * WORLD_LAYER_1_SQUARE_SIZE

        //Show The Cubes for debugging
        // ctx.fillStyle = "green"
        // ctx.fillRect(x, y, WORLD_LAYER_1_SQUARE_SIZE, WORLD_LAYER_1_SQUARE_SIZE)

        for (let k = 0; k < world[i][j].length; k++) {
            const element2 = world[i][j][k]
            ctx.fillStyle = element2.c
            ctx.fillRect(element2.x, element2.y, cubeSize, cubeSize)

            player.collisionDetection({x: element2.x, y: element2.y, w: cubeSize, h: cubeSize})
        }
        // const layer2Length = world[i][j].length

        // let yToBeAddedOn = 0
        // for (let k = 0; k < layer2Length; k++) {
        //     let y2 = y + yToBeAddedOn
    
        //     let x2 = x
        //     for (let l = 0; l < world[i][j][k].length; l++) {
        //         ctx.fillStyle = "black"
        //         ctx.strokeRect(x2, y2, WORLD_LAYER_2_SQUARE_SIZE, WORLD_LAYER_2_SQUARE_SIZE)
        //         x2 += WORLD_LAYER_2_SQUARE_SIZE
        //     }
        //     yToBeAddedOn += WORLD_LAYER_2_SQUARE_SIZE
        // }
    }

    // ENGINE.VARIABLES.Cam.x = i -= 10
}

function update(deltaTime) {
	const LocalPlayer = ENGINE.GetLocalPlayer()
    if (ENGINE.InputHandler.keys_down.w) LocalPlayer.move('w'); // Move the player
	else LocalPlayer.stopMove("w")
	if (ENGINE.InputHandler.keys_down.a) LocalPlayer.move('a');
	else LocalPlayer.stopMove("a")
	if (ENGINE.InputHandler.keys_down.d) LocalPlayer.move('d');
	else LocalPlayer.stopMove("d")
}

function setupGame() {
    createCanvas(true, Enum.ResizeType.AspectRatio)
    setCanvasBackground("#63c0c2")
}

player.c = "red" // Set the colour of the player from default: black to red
// player.gravityMax = -300 // Set the gravity max, so gravity is'nt applied, is -300 because when jumping the velocity y gets set to -300, so make sure gravityMax is -300 so it does'nt affect the jumping