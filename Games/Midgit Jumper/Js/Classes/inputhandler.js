//Input Handlere
class InputHandler {
    constructor() {
        
		this.keysdown = {
			w: false,
			a: false,
			s: false,
			d: false
		}

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                //left arrow
                case "ArrowLeft":
                    character._Move('a')
                    this.keysdown.a = true
                    break;
                //right arrow
                case 'ArrowRight':
                    character._Move('d')
                    this.keysdown.d = true
                    break;
                //move up arrow
                case 'ArrowUp':
                    character._Move('w')
                    this.keysdown.w = true
                    break;
                //move down arrpw
                case 'ArrowDown':
                    character._Move('s')
                    this.keysdown.s = true
                    break;
                //move up key
                case 'w':
                    character._Move('w')
                    this.keysdown.w = true
                    break;
                //move left key
                case "a":
                    character._Move('a')
                    this.keysdown.a = true
                    break;
                //move down key
                case "s":
                    character._Move('s')
                    this.keysdown.s = true
                    break;
                //move right key
                case "d":
                    character._Move('d')
                    this.keysdown.d = true
                    break;
                case " ":
                    character._Move('w')
                    this.keysdown.w = true
                default:
                    console.log(event.key, "WAT");
            }
        })
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                //left arrow
                case 'ArrowLeft':
                    character._stopMoving('a')
                    this.keysdown.a = false
                    break;
                //right arrow
                case 'ArrowRight':
                    character._stopMoving('d')
                    this.keysdown.d = false
                    break;
                //move up arrow
                case 'ArrowUp':
                    character._stopMoving('w')
                    this.keysdown.w = false
                    break;
                //move down arrow
                case 'ArrowDown':
                    character._stopMoving('s')
                    this.keysdown.s = false
                    break;

                //move up key
                case 'w':
                    character._stopMoving('w')
                    this.keysdown.w = false
                    break;
                //move left key
                case "a":
                    character._stopMoving('a')
                    this.keysdown.a = false
                    break;
                //move down key
                case "s":
                    character._stopMoving('s')
                    this.keysdown.s = false
                    break;
                //move right key
                case "d":
                    character._stopMoving('d')
                    this.keysdown.d = false
                    break;
                    
                case " ":
                    character._stopMoving('w')
                    this.keysdown.w = false

                default:
            }
        })
    }
}