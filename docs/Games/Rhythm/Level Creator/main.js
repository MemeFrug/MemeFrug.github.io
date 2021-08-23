const container = document.getElementById("container");

const generate = document.getElementById("Generate")
const output = document.getElementById("output")


const canvas = document.getElementById('Canvas')
const ctx = canvas.getContext('2d');
const preview = document.getElementById('Preview')

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.style.backgroundColor = "white"
    cell.id = (c + 1) + ' second';
    cell.dataset.value = 'white'
    if (c < 20) {
        cell.innerText = 'pos1';
        pos1 = pos1 + 1
        cell.id = (pos1) + ' second';
    }
    if (c >= 20 && c < 40) {
        cell.innerText = 'pos2';
        pos2 = pos2 + 1
        cell.id = (pos2) + ' second';
    }
    if (c >= 40) {
        cell.innerText = 'pos3';
        pos3 = pos3 + 1
        cell.id = (pos3) + ' second';
    }
    container.appendChild(cell).className = "grid-item";
}
  };

makeRows(3, 20);

for (let index = 0; index < 60; index++) {
    container.childNodes[index].addEventListener('mouseup', () => {
        if (container.childNodes[index].dataset.value == 'white') {
            container.childNodes[index].style.backgroundColor = 'rgb(66,66,66)'
            container.childNodes[index].style.color = 'white'
            container.childNodes[index].dataset.value = 'black'
        }
        else if (container.childNodes[index].dataset.value == 'black') {
            container.childNodes[index].style.backgroundColor = 'white'
            container.childNodes[index].style.color = 'black'
            container.childNodes[index].dataset.value = 'white'
        }
    })
}

let code = ''

let text = [{
    cubes: [],
    Update(delta) {
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                if (this.cubes[index].y > 150 ) {
                    if (this.cubes[index].isBomb == true || (this.cubes[index].isBomb && this.cubes[index] == undefined)) {
                        delete this.cubes[index]
                    } else {
                        delete this.cubes[index]
                    }
                }else {
                    try {
                        this.cubes[index].update(delta)   
                    } catch (error) {
                        
                    }
                }
            }
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue
                }
                try {
                 
                if (this.cubes[index].position() == 0 && !character.pressingkeydown) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                            if (this.cubes[index].isBomb == true) {
                                delete this.cubes[index]
                            }else {
                                delete this.cubes[index]
                            }
                        }        
                } 
                else if (this.cubes[index].position() == 1 && !character.pressingkeyleft) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                        }else {
                            delete this.cubes[index]
                        }
                        }        
                } 
                else if (this.cubes[index].position() == 2 && !character.pressingkeyright) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                        }else {
                            delete this.cubes[index]
                        }
                        }        
                }    
                } catch (error) {
                    
                }
        }
    },

    draw(ctx){
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                try {
                    this.cubes[index].draw(ctx)
                    
                } catch (error) {
                    
                }
            }
    }
}]
let amtselected = 0;

generate.addEventListener('mouseup', () => {
/*    text = 'cubes: [],\nUpdate(delta) {\nfor (let index = 0; index < this.cubes.length; index++) {\nif (this.cubes[index] == undefined) {\ncontinue;}\nif (this.cubes[index].y > 150 ) {\nif (this.cubes[index].isBomb == true || (this.cubes[index].isBomb && this.cubes[index] == undefined)) {\ndelete this.cubes[index]\n} else {\ndelete this.cubes[index]\n}\n}else {\ntry {\nthis.cubes[index].update(delta)\n} catch (error) {\n}\n}\n}
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue
                }
                try {
                 
                if (this.cubes[index].position() == 0 && !character.pressingkeydown) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                            if (this.cubes[index].isBomb == true) {
                                delete this.cubes[index]
                            }else {
                                delete this.cubes[index]
                            }
                        }        
                } 
                else if (this.cubes[index].position() == 1 && !character.pressingkeyleft) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                        }else {
                            delete this.cubes[index]
                        }
                        }        
                } 
                else if (this.cubes[index].position() == 2 && !character.pressingkeyright) {
                    if (character.iscolliding(this.cubes[index], this.cubes[index].position())){
                        if (this.cubes[index].isBomb == true) {
                            delete this.cubes[index]
                        }else {
                            delete this.cubes[index]
                        }
                        }        
                }    
                } catch (error) {
                    
                }
        }
    },

    draw(ctx){
        
        console.log(this.cubes.generated());
            for (let index = 0; index < this.cubes.length; index++) {
                if (this.cubes[index] == undefined) {
                    continue;
                }
                try {
                    this.cubes[index].draw(ctx)
                    
                } catch (error) {
                    
                }
            }
    }
}]'*/
code = ''
    output.value = code
    for (let index = 1; index <= 60; index++) {
        console.log('Generating');
        console.log(index, JSON.stringify(text));
        if (container.childNodes[index].dataset.value == 'white') {
            continue;
        }
        if (container.childNodes[index].innerText == 'pos1') {
            if (container.childNodes[index].id == '1 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 1000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 1000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '2 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 2000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 2000)'   
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '3 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 3000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 3000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '4 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 4000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 4000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '5 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 5000)'))      
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 5000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '6 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 6000)'))       
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 6000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '7 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 7000)'))       
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 7000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '8 second') { 
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 8000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 8000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '9 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 9000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 9000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '10 second') { 
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 10000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 10000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '11 second') { 
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 11000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 11000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '12 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 12000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 12000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '13 second') { 
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 13000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 13000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '14 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 14000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 14000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '15 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 15000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 15000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '16 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 16000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 16000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '17 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 17000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 17000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '18 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 18000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 18000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '19 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 19000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 19000)'
                amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '20 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(125, 0, 2, 20000)'))   
                code = code + '\n' + 'cube1 = new theCubeCreator(125, 0, 2, 20000)'
                amtselected = amtselected + 1 
            }
        }
        if (container.childNodes[index].innerText == 'pos2') {
            if (container.childNodes[index].id == '1 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 1000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 1000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '2 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 2000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 2000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '3 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 3000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 3000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '4 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 4000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 4000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '5 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 5000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 5000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '6 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 6000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 6000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '7 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 7000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 7000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '8 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 8000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 8000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '9 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 9000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 9000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '10 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 10000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 10000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '11 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 11000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 11000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '12 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 12000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 12000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '13 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 13000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 13000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '14 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 14000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 14000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '15 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 15000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 15000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '16 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 16000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 16000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '17 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 17000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 17000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '18 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 18000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 18000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '19 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 19000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 19000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '20 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(70, 0, 2, 20000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(70, 0, 2, 20000)'

amtselected = amtselected + 1         }
        }
        if (container.childNodes[index].innerText == 'pos3') {
            if (container.childNodes[index].id == '1 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 1000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 1000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '2 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 2000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 2000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '3 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 3000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 3000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '4 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 4000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 4000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '5 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 5000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 5000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '6 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 6000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 6000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '7 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 7000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 7000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '8 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 8000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 8000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '9 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 9000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 9000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '10 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 10000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 10000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '11 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 11000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 11000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '12 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 12000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 12000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '13 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 13000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 13000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '14 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 14000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 14000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '15 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 1500)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 15000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '16 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 1600)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 16000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '17 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 1700)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 17000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '18 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 1800)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 18000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '19 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 1900)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 19000)'
amtselected = amtselected + 1 
            }
            if (container.childNodes[index].id == '20 second') {
                text[0].cubes.push(eval('cube1 = new theCubeCreator(180, 0, 2, 20000)'))
                code = code + '\n' + 'cube1 = new theCubeCreator(180, 0, 2, 20000)'
                amtselected = amtselected + 1 
            }
        }
    }

        output.value = code
})

preview.addEventListener('mouseup', () => {
    let lastTime = 0;
        var character = new arrowkeys();
        let inlevel = true
        console.log(text);
        UPDATE()
        function UPDATE(timeStamp) {
            let deltaTime = timeStamp - lastTime;
            lastTime = timeStamp
            text[0].Update(deltaTime)
            ctx.clearRect(0,0,300,800)
            character.draw(ctx)
            text[0].draw(ctx)
            if (inlevel) {
                requestAnimationFrame(UPDATE)   
            }
        }
})