//Input Handlere
class inputhandler {
    constructor() {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                //left arrow
                case 37:
                    console.log('Left Arrow Pressed');
                    character.moveLeft()
                    break;
                //right arrow
                case 39:
                    character.moveRight()
                    break;
                //move up arrow
                case 38:
                    character.moveUp()
                    break;
                //move down arrpw
                case 40:
                    console.log('Moving Down');
                    character.moveDown()
                    break;
                //move up key
                case 87:
                    break;
                //move left key
                case 65:
                    break;
                //move down key
                case 83:
                    break;
                //move right key
                case 68:
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
                    if (character.speedx <= 0) {
                     
                    character.stopx()  
                    }
                    break;
                //right arrow
                case 39:
                    if (character.speedx >= 0) {
                     
                    character.stopx()   
                    }
                    break;
                //move up arrow
                case 38:
                    if (character.speedy <= 0) {
                     
                    character.stopy()   
                    }
                    break;
                //move down arrow
                case 40:
                    if (character.speedy >= 0) {
                     
                    character.stopy()   
                    }
                    break;
                //move up key
                case 87:
                    break;
                //move left key
                case 65:
                    break;
                //move down key
                case 83:
                    break;
                //move right key
                case 68:
                    break;

                default:
            }
        })
    }
}