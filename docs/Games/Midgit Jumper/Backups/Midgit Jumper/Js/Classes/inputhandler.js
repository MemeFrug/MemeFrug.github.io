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
                // //left arrow
                // case 37:
                    
                //     break;
                // //right arrow
                // case 39:

                //     break;
                // //move up arrow
                // case 38:
                    
                //     break;
                // //move down arrpw
                // case 40:
                    
                //     break;
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
                default:
            }
        })
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                // //left arrow
                // case 37:

                //     break;
                // //right arrow
                // case 39:

                //     break;
                // //move up arrow
                // case 38:

                //     break;
                // //move down arrow
                // case 40:
                    
                //     break;

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
                default:
            }
        })
    }
}