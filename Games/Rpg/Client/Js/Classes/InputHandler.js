document.addEventListener('mousewheel', (event) => {
	if (event.ctrlKey == true) {
		event.preventDefault();
	}
}, { passive: false });

document.addEventListener('keydown', (event) => {
	if (event.ctrlKey == true && (event.key == "+" || event.key == "=" || event.key == '_' || event.key == '-')) {
		event.preventDefault();
	}
});

//Input Handlere
class Inputhandler {
	constructor() {
		this.detectLeftButton = function (e) {
			if (typeof e === 'object') {
				if (e.button == 0) return true;
				else return false;
			}
		}

		this.keysdown = {
			w: false,
			a: false,
			s: false,
			d: false,

			inventory1: true,
			inventory2: false,
			inventory3: false,
			inventoryindex: 0,
		}

		window.onblur = () => {
			character.stopDown()
			character.stopLeft()
			character.stopRight()
			character.stopUp()
		}

		document.addEventListener('mousedown', (event) => {
			if (this.detectLeftButton(event) && typeof character.inventory[this.keysdown.inventoryindex] !== 'undefined') {
				character.inventory[this.keysdown.inventoryindex].use()
				character.inventory[this.keysdown.inventoryindex].isshooting = true;
			}
		})

		document.addEventListener('mouseup', (event) => {
			if (this.detectLeftButton(event)) {
				character.inventory.forEach(element => {
					element.isshooting = false;
				});
			}
		})

		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case '1':
					if (!this.keysdown.inventory1) {
						character.inventory.forEach(element => {
							element.isshooting = false;
						});
						this.keysdown.inventory1 = true
						this.keysdown.inventory2 = false
						this.keysdown.inventory3 = false
						this.keysdown.inventoryindex = 0;
						document.getElementById("inventorycolumn1").style.color = 'grey'
						document.getElementById("inventorycolumn3").style.color = 'white'
						document.getElementById("inventorycolumn2").style.color = 'white'
						if (typeof character.inventory[this.keysdown.inventoryindex] === 'undefined') {
							document.getElementById("ammocounter").innerHTML = `Nothing Equipped`
							break;
						}
						if (character.inventory[this.keysdown.inventoryindex].reloading) {
							document.getElementById("ammocounter").innerHTML = 'Reloading...'
							break;
						}
						document.getElementById("ammocounter").innerHTML = `<span id="ammoamount">${character.inventory[this.keysdown.inventoryindex].TotalAmmo}</span>/<span id="maxammoammount">${character.inventory[this.keysdown.inventoryindex].MaxAmmo}</span>`
					}
					break;
				case '2':					
					if (!this.keysdown.inventory2) {
						character.inventory.forEach(element => {
							element.isshooting = false;
						});
						this.keysdown.inventory2 = true
						this.keysdown.inventory1 = false
						this.keysdown.inventory3 = false
						this.keysdown.inventoryindex = 1;
						document.getElementById("inventorycolumn2").style.color = 'grey'
						document.getElementById("inventorycolumn1").style.color = 'white'
						document.getElementById("inventorycolumn3").style.color = 'white'
						if (typeof character.inventory[this.keysdown.inventoryindex] === 'undefined') {
							document.getElementById("ammocounter").innerHTML = `Nothing Equipped`
							break;
						}
						if (character.inventory[this.keysdown.inventoryindex].reloading) {
							document.getElementById("ammocounter").innerHTML = 'Reloading...'
							break;
						}
						document.getElementById("ammocounter").innerHTML = `<span id="ammoamount">${character.inventory[this.keysdown.inventoryindex].TotalAmmo}</span>/<span id="maxammoammount">${character.inventory[this.keysdown.inventoryindex].MaxAmmo}</span>`
					}
					break;
				case '3':
					if (!this.keysdown.inventory3) {
						character.inventory.forEach(element => {
							element.isshooting = false;
						});
						this.keysdown.inventory3 = true
						this.keysdown.inventory1 = false
						this.keysdown.inventory2 = false
						this.keysdown.inventoryindex = 2;
						document.getElementById("inventorycolumn3").style.color = 'grey'
						document.getElementById("inventorycolumn1").style.color = 'white'
						document.getElementById("inventorycolumn2").style.color = 'white'
						if (typeof character.inventory[this.keysdown.inventoryindex] === 'undefined') {
							document.getElementById("ammocounter").innerHTML = `Nothing Equipped`
							break;
						}
						if (character.inventory[this.keysdown.inventoryindex].reloading) {
							document.getElementById("ammocounter").innerHTML = 'Reloading...'
							break;
						}
						document.getElementById("ammocounter").innerHTML = `<span id="ammoamount">${character.inventory[this.keysdown.inventoryindex].TotalAmmo}</span>/<span id="maxammoammount">${character.inventory[this.keysdown.inventoryindex].MaxAmmo}</span>`
					}
					break;
				//Escape Key
				case 'Escape':
					console.log('Pressed Escape Key');
					break;
				//move up key
				case 'w':
					this.keysdown.w = true
					character.moveUp()
					break;
				//move left key
				case 'a':
					this.keysdown.a = true
					character.moveLeft()
					break;
				//move down key
				case "s":
					this.keysdown.s = true
					character.moveDown()
					break;
				//move right key
				case 'd':
					this.keysdown.d = true
					character.moveRight()
					break;
			}

		})
		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				//Drop Inventory slot key
				case 'g':
					if (typeof character.inventory[this.keysdown.inventoryindex] !== 'undefined') {
						//
						// socket.emit('dropitem', character.inventory[this.keysdown.inventoryindex])
						character.dropitem(this.keysdown.inventoryindex)
					}
					break;
				//reload key
				case 'r':
					if (typeof character.inventory[this.keysdown.inventoryindex] !== 'undefined') {
						if (!character.inventory[this.keysdown.inventoryindex].reloading) {
							character.inventory[this.keysdown.inventoryindex].reload(this.keysdown.inventoryindex)	
						}
					}
					break;
				//move up key
				case 'w':
					this.keysdown.w = false
					character.stopUp()

					break;
				//move left key
				case 'a':
					this.keysdown.a = false
					character.stopLeft()

					break;
				//move down key
				case 's':
					this.keysdown.s = false
					character.stopDown()

					break;
				//move right key
				case 'd':
					this.keysdown.d = false
					character.stopRight()

					break;

				default:
			}
		})
	}
}