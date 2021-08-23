//Input Handlere
class inputhandler {
    constructor() {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                //left arrow
                case 37:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveLeft()
                        }
                    } catch (e) {

                    }
                    char.moveLeft()
                    break;
                //right arrow
                case 39:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveRight()
                        }
                    } catch (e) {

                    }
                    char.moveRight()
                    break;
                //move up arrow
                case 38:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveUp()
                        }
                    } catch (e) {

                    }
                    char.moveUp()
                    break;
                //move down arrpw
                case 40:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveDown()
                        }
                    } catch (e) {

                    }
                    char.moveDown()
                    break;
                //move up key
                case 87:
                    char.moveUp()
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveUp()
                        }
                    } catch (e) {

                    }
                    break;
                //move left key
                case 65:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveLeft()
                        }
                    } catch (e) {

                    }
                    char.moveLeft()
                    break;
                //move down key
                case 83:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveDown()
                        }
                    } catch (e) {

                    }
                    char.moveDown()
                    break;
                //move right key
                case 68:
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.moveRight()
                        }
                    } catch (e) {

                    }
                    char.moveRight()
                    break;
                default:
            }
        })
        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                //left arrow
                case 37:
                    if (char.speed < 0) {
                        char.stopLeft()
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {

                                levels[i].char1.stopLeft()
                            }
                        } catch (e) { }
                    }else {
                        char.stopLeft()
                        
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopLeft()
                            }
                        } catch (e) { }
                    }
                    break;
                //right arrow
                case 39:
                    if (char.speed > 0) {
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopRight()
                            }
                        } catch (e) {

                        }
                        char.stopRight()
                } else {
                    
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.stopRight()
                        }
                    } catch (e) {

                    }
                    char.stopRight()
                }
                    break;
                //move up arrow
                case 38:
                    if (char.speedup > 0) {
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopUp()
                            }
                        } catch (e) {

                        }
                        char.stopUp()
                } else {
                    
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.stopUp()
                        }
                    } catch (e) {

                    }
                    char.stopUp()
                }
                    break;
                //move down arrow
                case 40:
                    if (char.speedup > 0) {
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopDown()
                            }
                        } catch (e) {

                        }
                        char.stopDown()
                } else {
                    
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.stopDown()
                        }
                    } catch (e) {

                    }
                    char.stopDown()
                }
                    break;
                //move up key
                case 87:
                    if (char.speedup > 0) {
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopUp()
                            }
                        } catch (e) {

                        }
                        char.stopUp()
                } else {
                    
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.stopUp()
                        }
                    } catch (e) {

                    }
                    char.stopUp()
                }
                    break;
                //move left key
                case 65:
                    if (char.speed < 0) {
                        char.stopLeft()
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {

                                levels[i].char1.stopLeft()
                            }
                        } catch (e) { }
                    }else {
                        char.stopLeft()
                        
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopLeft()
                            }
                        } catch (e) { }
                    }
                    break;
                //move down key
                case 83:
                    if (char.speedup > 0) {
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopDown()
                            }
                        } catch (e) {

                        }
                        char.stopDown()
                } else {
                    
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.stopDown()
                        }
                    } catch (e) {

                    }
                    char.stopDown()
                }
                    break;
                //move right key
                case 68:
                    if (char.speed > 0) {
                        try {
                            for (var i = whatlevel; i <= whatlevel; i++) {
                                levels[i].char1.stopRight()
                            }
                        } catch (e) {

                        }
                        char.stopRight()
                } else {
                    
                    try {
                        for (var i = whatlevel; i <= whatlevel; i++) {
                            levels[i].char1.stopRight()
                        }
                    } catch (e) {

                    }
                    char.stopRight()
                }
                    break;

                default:
            }
        })
    }
}