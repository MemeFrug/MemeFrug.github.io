//Starting the Levels
let level = 0;

var pos1 = 125 //middle
var pos2 = 70 //left
var pos3 = 180 //right

//Health
const healthDiv = document.getElementById('healthDiv')
const amtHealth = document.getElementById('amtHealth')

let Health = 100;

//Canvas
/*
    width: 300px;
    height: 800px;
*/

//Failed Screen
const faileddiv = document.getElementById('Failed')
document.getElementById('Tryagain').addEventListener('mouseup', () => {
    location.reload()
})
const wondiv = document.getElementById('Won')

var levels = [
    {//Level 1
        cubes: [
             cube1 = new theBombCreator(pos1, 0, 1, 1000),
             cube2 = new theCubeCreator(pos3, 0, 2, 2000),
             cube3 = new theCubeCreator(pos2, 0, 1, 3000),
             cube4 = new theCubeCreator(pos3, 0, 1, 4000),
             cube5 = new theCubeCreator(pos1, 0, 1, 4000),
             cube6 = new theCubeCreator(pos1, 0, 1, 5000),
             cube7 = new theCubeCreator(pos3, 0, 2, 6000),
             cube8 = new theBombCreator(pos2, 0, 1, 7000),
             cube9 = new theCubeCreator(pos3, 0, 1, 8000),
             cube10 = new theCubeCreator(pos1, 0, 2, 9000),
             finishcube = new theCubeCreator(pos3, 0, 4, 10000)
        ],

        Update(delta) {
                if (this.cubes[10] == undefined) {
                    wondiv.style.display = 'inherit';
                }
    
                for (let index = 0; index < this.cubes.length; index++) {
                    if (this.cubes[index] == undefined) {
                        continue;
                    }
                    if (this.cubes[index].y > 150 ) {
                        if (this.cubes[index].isBomb == true || (this.cubes[index].isBomb && this.cubes[index] == undefined)) {
                            delete this.cubes[index]
                        } else {
                            Health = Health - 20
                            amtHealth.textContent = Health
                            delete this.cubes[index]
                        }
                    }else {
                        this.cubes[index].update(delta)
                    }
                }
                for (let index = 0; index < this.cubes.length; index++) {
                    if (this.cubes[index] == undefined) {
                        continue
                    }
                    if (this.cubes[index].position() == 0 && character.pressingkeydown) {
                        if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                                if (this.cubes[index].isBomb == true) {
                                    delete this.cubes[index]
                                    Health = Health - 50
                                    amtHealth.textContent = Health
                                }else {
                                    delete this.cubes[index]
                                    console.log('pressed down');
                                    console.log('deleted cube');
                                }
                            }        
                    } 
                    else if (this.cubes[index].position() == 1 && character.pressingkeyleft) {
                        if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                            if (this.cubes[index].isBomb == true) {
                                delete this.cubes[index]
                                Health = Health - 50
                                amtHealth.textContent = Health
                            }else {
                                delete this.cubes[index]
                                console.log('pressed down');
                                console.log('deleted cube');
                            }
                            }        
                    } 
                    else if (this.cubes[index].position() == 2 && character.pressingkeyright) {
                        if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                            if (this.cubes[index].isBomb == true) {
                                delete this.cubes[index]
                                Health = Health - 50
                                amtHealth.textContent = Health
                            }else {
                                delete this.cubes[index]
                                console.log('pressed down');
                                console.log('deleted cube');
                            }
                            }        
                    } 
            }
        },

        draw(ctx){
                for (let index = 0; index < this.cubes.length; index++) {
                    if (this.cubes[index] == undefined) {
                        continue;
                    }
                    this.cubes[index].draw(ctx)
                }
        }
}, {//Level 2
    cubes: [
        cube0 = new theBombCreator(pos1, 0, 2, 1),
        cube1 = new theCubeCreator(pos1, 0, 2, 1000),
        cube2 = new theCubeCreator(pos3, 0, 3, 2000),
        cube3 = new theCubeCreator(pos2, 0, 2, 3000),
        cube4 = new theCubeCreator(pos3, 0, 2, 4000),
        cube5 = new theBombCreator(pos1, 0, 2, 4000),
        cube6 = new theCubeCreator(pos1, 0, 2, 5000),
        cube7 = new theCubeCreator(pos3, 0, 3, 6000),
        cube8 = new theCubeCreator(pos2, 0, 2, 7000),
        cube9 = new theCubeCreator(pos3, 0, 2, 8000),
        cube10 = new theCubeCreator(pos1, 0, 3, 9000),
        cube11 = new theCubeCreator(pos1, 0, 3, 4000),
        cube12 = new theCubeCreator(pos1, 0, 3, 5000),
        cube13 = new theCubeCreator(pos3, 0, 4, 6000),
        cube14 = new theCubeCreator(pos2, 0, 3, 7000),
        cube15 = new theCubeCreator(pos3, 0, 3, 8000),
        cube16 = new theBombCreator(pos1, 0, 3, 9000),
        cube17 = new theCubeCreator(pos1, 0, 2, 10000),
        cube18 = new theCubeCreator(pos3, 0, 3, 11000),
        cube19 = new theCubeCreator(pos2, 0, 2, 12000),
        cube20 = new theCubeCreator(pos3, 0, 2, 13000),
        cube21 = new theCubeCreator(pos1, 0, 2, 14000),
        cube22 = new theCubeCreator(pos1, 0, 2, 14000),
        cube23 = new theCubeCreator(pos3, 0, 3, 15000),
        cube23 = new theCubeCreator(pos2, 0, 2, 16000),
        cube24 = new theBombCreator(pos3, 0, 2, 16000),
        cube25 = new theCubeCreator(pos1, 0, 3, 16000),
        cube26 = new theCubeCreator(pos1, 0, 3, 17000),
        cube27 = new theCubeCreator(pos1, 0, 3, 18000),
        cube28 = new theCubeCreator(pos3, 0, 4, 19000),
        cube29 = new theCubeCreator(pos2, 0, 3.5, 20000),
        cube30 = new theCubeCreator(pos3, 0, 3.5, 21000),
        cube31 = new theCubeCreator(pos1, 0, 3.5, 22000),
        cube32 = new theBombCreator(pos1, 0, 3, 23000),
        cube33 = new theBombCreator(pos3, 0, 3, 23000),
        cube34 = new theCubeCreator(pos2, 0, 3, 24000),
        cube35 = new theCubeCreator(pos3, 0, 3, 24000),
        cube36 = new theCubeCreator(pos1, 0, 3, 25000),
        cube37 = new theCubeCreator(pos1, 0, 3, 26000),
        cube38 = new theCubeCreator(pos3, 0, 3.5, 26000),
        cube39 = new theBombCreator(pos2, 0, 5, 27000),
        cube40 = new theCubeCreator(pos3, 0, 3, 28000),
        cube41 = new theCubeCreator(pos1, 0, 3, 29000),
        cube42 = new theCubeCreator(pos1, 0, 3.5, 30000),
        cube43 = new theCubeCreator(pos1, 0, 3, 31000),
        cube44 = new theCubeCreator(pos3, 0, 5, 32000),
        cube45 = new theCubeCreator(pos2, 0, 3.5, 33000),
        cube46 = new theCubeCreator(pos3, 0, 3, 33000),
        cube47 = new theCubeCreator(pos1, 0, 4, 34000),
        finishcube = new theCubeCreator(pos3, 0, 5, 35000)
    ],
    Update(delta) {

            if (this.cubes[49] == undefined) {
                wondiv.style.display = 'inherit';
            }

            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                if (this.cubes[index].y > 150 ) {
                    if (this.cubes[index].isBomb == true || (this.cubes[index].isBomb && this.cubes[index] == undefined)) {
                        delete this.cubes[index]
                    } else {
                        Health = Health - 20
                        amtHealth.textContent = Health
                        delete this.cubes[index]
                    }
                }else {
                    this.cubes[index].update(delta)
                }
            }
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue
                }
                if (this.cubes[index].position() == 0 && character.pressingkeydown) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                            if (this.cubes[index].isBomb == true) {
                                delete this.cubes[index]
                                Health = Health - 50
                                amtHealth.textContent = Health
                            }else {
                                delete this.cubes[index]
                                console.log('pressed down');
                                console.log('deleted cube');
                            }
                        }        
                } 
                else if (this.cubes[index].position() == 1 && character.pressingkeyleft) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                            Health = Health - 50
                            amtHealth.textContent = Health
                        }else {
                            delete this.cubes[index]
                            console.log('pressed down');
                            console.log('deleted cube');
                        }
                        }        
                } 
                else if (this.cubes[index].position() == 2 && character.pressingkeyright) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                            Health = Health - 50
                            amtHealth.textContent = Health
                        }else {
                            delete this.cubes[index]
                            console.log('pressed down');
                            console.log('deleted cube');
                        }
                        }        
                } 
        }
    },

    draw(ctx){
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                this.cubes[index].draw(ctx)
            }
    }
},{//Level 3
    cubes: [
        cube1 = new theBombCreator(pos1, 0, 3, 4000),
        cube1 = new theBombCreator(pos1, 0, 3, 3400),
        cube1 = new theBombCreator(pos1, 0, 3, 2200),
        cube1 = new theBombCreator(pos1, 0, 3, 1000),
        cube1 = new theCubeCreator(pos2, 0, 2, 1000),
        cube1 = new theCubeCreator(pos1, 0, 2, 1200),
        cube1 = new theCubeCreator(pos3, 0, 2, 1400),
        cube1 = new theCubeCreator(pos1, 0, 2, 1600),
        cube1 = new theCubeCreator(pos2, 0, 2, 1800),
        cube1 = new theCubeCreator(pos1, 0, 2, 2000),
        cube1 = new theCubeCreator(pos3, 0, 2, 2200),
        cube1 = new theCubeCreator(pos1, 0, 2, 2400),
        cube1 = new theCubeCreator(pos2, 0, 2, 2600),
        cube1 = new theCubeCreator(pos1, 0, 2, 2800),
        cube1 = new theCubeCreator(pos3, 0, 2, 3000),
        cube1 = new theCubeCreator(pos1, 0, 2, 3200),
        cube1 = new theCubeCreator(pos2, 0, 2, 3400),
        cube1 = new theCubeCreator(pos1, 0, 2, 3600),
        cube1 = new theCubeCreator(pos3, 0, 2, 3800),
        cube1 = new theCubeCreator(pos1, 0, 2, 4000),
    ],
    Update(delta) {
            if (this.cubes[20] == undefined) {
                wondiv.style.display = 'inherit';
            }

            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                if (this.cubes[index].y > 150 ) {
                    if (this.cubes[index].isBomb == true || (this.cubes[index].isBomb && this.cubes[index] == undefined)) {
                        delete this.cubes[index]
                    } else {
                        Health = Health - 20
                        amtHealth.textContent = Health
                        delete this.cubes[index]
                    }
                }else {
                    this.cubes[index].update(delta)
                }
            }
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue
                }
                if (this.cubes[index].position() == 0 && character.pressingkeydown) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                            if (this.cubes[index].isBomb == true) {
                                delete this.cubes[index]
                                Health = Health - 50
                                amtHealth.textContent = Health
                            }else {
                                delete this.cubes[index]
                                console.log('pressed down');
                                console.log('deleted cube');
                            }
                        }        
                } 
                else if (this.cubes[index].position() == 1 && character.pressingkeyleft) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                            Health = Health - 50
                            amtHealth.textContent = Health
                        }else {
                            delete this.cubes[index]
                            console.log('pressed down');
                            console.log('deleted cube');
                        }
                        }        
                } 
                else if (this.cubes[index].position() == 2 && character.pressingkeyright) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                            Health = Health - 50
                            amtHealth.textContent = Health
                        }else {
                            delete this.cubes[index]
                            console.log('pressed down');
                            console.log('deleted cube');
                        }
                        }        
                } 
        }
    },

    draw(ctx){
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                this.cubes[index].draw(ctx)
            }
    }

}]

const Level1Start = document.getElementById('Level1').addEventListener('mouseup', () => {
    healthDiv.style.display = 'inherit'
    lastTime = 0;
    console.log('Picked Level 1')
    LevelSelectorDiv.style.display = 'none'
    GameScreen.style.display = 'inherit'
    UPDATE()
    level = 1;
})
const Level2Start = document.getElementById('Level2').addEventListener('mouseup', () => {
    healthDiv.style.display = 'inherit'
    lastTime = 0;
    console.log('Picked Level 2')
    LevelSelectorDiv.style.display = 'none'
    GameScreen.style.display = 'inherit'
    UPDATE()
    level = 2;
})
const Level3Start = document.getElementById('Level3').addEventListener('mouseup', () => {
    healthDiv.style.display = 'inherit'
    lastTime = 0;
    console.log('Picked Level 3')
    LevelSelectorDiv.style.display = 'none'
    GameScreen.style.display = 'inherit'
    UPDATE()
    level = 3;
})

let doneonesec = false;

let lastTime = 0;

let isinlevel = true;

var character = new arrowkeys

function UPDATE(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    if (character.pressingkeydown == false) {
        ctx.clearRect(125,121,50,10)
    }
    if (character.pressingkeyright == false) {
        ctx.clearRect(180,121,50,10)
    }
    if (character.pressingkeyleft == false) {
        ctx.clearRect(70,121,50,10)
    }

    for (let index = level - 1; index == level - 1; index++) {
        if (levels[index] == undefined) {
            continue;
        }
        if (Health <= 0) {
            faileddiv.style.display = 'inherit'
            isinlevel = false
        }

        levels[index].Update(deltaTime)
        ctx.clearRect(0,0,300,800)
        character.draw(ctx)
        levels[index].draw(ctx)
    }

    //Refresh
    if (isinlevel == true) {
        requestAnimationFrame(UPDATE)
    }
}