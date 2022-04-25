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




let stats;
let inc = 0.01;
let CameraPositionX = 0
let perlinNoise;
let width;
let height;
let points = []
const scl = 1

function setup() {
    stats = new Stats();
    stats.autoLoad()

	perlin_octaves = 2	
	noiseSeed(2555676)

    document.getElementById("PlayButtonElement").addEventListener("mouseup", () => {
        document.getElementById("MainMenu").style.display = "none"

        // Setup Game
        createCanvas(true, Enum.ResizeType.AspectRatio)
        setCanvasBackground("grey")
        const ctx = ENGINE.canvas.ctx
		ctx.imageSmoothingEnabled = false

		width = ENGINE.Config.WorldSize.x
		height = ENGINE.Config.WorldSize.y

		let yoff = 0;

        // const imageData = ctx.getImageData(0, 0 , width, height);
        // const data = imageData.data;
        // for (let y = 0; y < height; y++) {
        //     let xoff = 0;
        //     for (let x = 0; x < width; x++) {
        //         const i = (x + y * width) * 4;
        //         var r = floor( noise(xoff * scl, yoff * scl) * 255 )
        //         data[i + 0] = r; // red
        //         data[i + 1] = r; // green
        //         data[i + 2] = r; // blue
        //         data[i + 3] = 255; // alpha

        //         xoff += inc;
        //     }
        //     yoff += inc;
        // }
        // perlinNoise = imageData

		//Generate The Map
		for (let y = 0; y < height; y += 5) {
            let xoff = 0;
            for (let x = 0; x < width; x += 5) {
                var r = floor( noise(xoff * scl, yoff * scl) * 255 )
				
				if (r > 100) {
					// points.push({c: "lightblue", x: x, y: y})
				}
				else if (r <= 100) {
					points.push({c: "rgb(54, 43, 16)", x: x, y: y})
				}

                xoff += inc;
            }
			yoff += inc;
		}
	})
}

function getColour(x, y) {
	var r = floor( noise(x * .1, y * 0.1) * 255 )

	// if (r < 50) return "blue"
	// else if (r > )
	// else return "black"
}

function draw(ctx) {
	ctx.scale(0.3, 0.3)

	for (let i = 0; i < points.length; i++) {
		const element = points[i];
		ctx.fillStyle = element.c
		ctx.fillRect(element.x, element.y, 6, 6)
	}

	ENGINE.VARIABLES.Cam.x = CameraPositionX
	ENGINE.VARIABLES.Cam.y = CameraPositionX

	CameraPositionX -= 1

    // ctx.putImageData(perlinNoise, 0, 0);
}