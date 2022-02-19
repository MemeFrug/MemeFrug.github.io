function UpdateInventory() {//TODO: FIX THIS FUTER SELF. (Make it so it resets/clears the inventory then repaints it)
    if (character.inventory.length == 0) {
        document.getElementById("inventoryitem1").innerHTML = ''
        
        document.getElementById("ammocounter").innerHTML = `Nothing Equipped`
    }

    for (let index = 0; index < character.inventory.length; index++) {
        if (index == 0) {
            if (typeof character.inventory[index] === 'undefined') {
                document.getElementById("inventoryitem1").innerHTML = ''                
                document.getElementById("inventoryitem2").innerHTML = ''  
                document.getElementById("inventoryitem3").innerHTML = ''  
            }else {
                document.getElementById("inventoryitem1").innerHTML = character.inventory[index].name
            }
        }       
        if (index == 1) {
            if (typeof character.inventory[index] === 'undefined') {
                document.getElementById("inventoryitem2").innerHTML = '' 
                document.getElementById("inventoryitem3").innerHTML = ''                 
            }else {
                document.getElementById("inventoryitem2").innerHTML = character.inventory[index].name
            }
        }
        if (index == 2) {
            if (typeof character.inventory[index] === 'undefined') {
                document.getElementById("inventoryitem3").innerHTML = ''                
            }else {
                document.getElementById("inventoryitem3").innerHTML = character.inventory[index].name
            }
        }
        
        FinishReloading(index)
    } 
}

function FinishReloading(index) {
    if (inputhandler.keysdown.inventoryindex == index) {
        document.getElementById("ammocounter").innerHTML = `
            <span id="ammoamount">${character.inventory[inputhandler.keysdown.inventoryindex].TotalAmmo}</span>/<span id="maxammoammount">${character.inventory[inputhandler.keysdown.inventoryindex].MaxAmmo}</span>
        `   
    }
}