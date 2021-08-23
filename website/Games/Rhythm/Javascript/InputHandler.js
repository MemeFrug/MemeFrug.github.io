//Input Handlere
class inputhandler {
    constructor() {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                //left arrow
                case 37:
                    character.pressleft()
                    break;
                //right arrow
                case 39:
                    character.pressright()
                    break;
                //move down arrpw
                case 40:
                    character.pressdown()
                    break;
                case 73: //Debug Key 'I'
                    console.log('easter eggggg jk this is debug key')
                    break;
                default:
            }
        })
        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                //left arrow
                case 37:
                    
                    character.pressingkeyleft = false
                    break;
                //right arrow
                case 39:
                    character.pressingkeyright = false
                    break;
                //move down arrow
                case 40:
                    
                    character.pressingkeydown = false
                    break;
                default:
            }
        })
    }
}