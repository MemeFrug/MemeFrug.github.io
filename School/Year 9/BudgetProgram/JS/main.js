// main.js
const Love_Button = document.getElementById("Love-Buy")
const Knees_Button = document.getElementById("Knees-Buy")
const Toes_Button = document.getElementById("Toes-Buy")
const Shoes_Button = document.getElementById("Shoes-Buy")

const Love_Bought = document.getElementById("Love-Bought")
const Knees_Bought = document.getElementById("Knees-Bought")
const Toes_Bought = document.getElementById("Toes-Bought")
const Shoes_Bought = document.getElementById("Shoes-Bought")

const Love_Cost = JSON.parse(document.getElementById("Love-Cost").innerHTML)
const Knees_Cost = JSON.parse(document.getElementById("Knees-Cost").innerHTML)
const Toes_Cost = JSON.parse(document.getElementById("Toes-Cost").innerHTML)
const Shoes_Cost = JSON.parse(document.getElementById("Shoes-Cost").innerHTML)

const Amount_Of_Money_Works = document.getElementById("Amount-of-Money-Left")
const Shop_buttons_container = document.getElementById("shop-buttons")

const _AmountofMoney = 100 // Dollars

let AmountofMoney = _AmountofMoney

function CheckMoney() {
    if (AmountofMoney == 0) {
        console.log("You have tun out of money");
        Shop_buttons_container.innerHTML = `
            <p>You Have Run Out of money</p>
            <p>Thank you for shopping at ZEROMART</p>
            <p>Please Leave The Store</p>
            <button id="Restart_Button">Restart</button>
        `
        document.getElementById("Restart_Button").addEventListener("mouseup", () => {
            location.reload()
        })
    }
    else if (AmountofMoney <= 0) {
        console.log("You have tun out of money");
        Shop_buttons_container.innerHTML = `
            <p>You Have Run Out of money</p>
            <p>Thank you for shopping at ZEROMART</p>
            <p>Please Leave The Store</p>
            <p>AND YOUR IN DEBT PAY IT BACK BITC</p>
            <button id="Restart_Button">Restart</button>
        `
        document.getElementById("Restart_Button").addEventListener("mouseup", () => {
            location.reload()
        })
    }

    Amount_Of_Money_Works.innerHTML = AmountofMoney
}

Love_Button.addEventListener("mouseup", () => {
    console.log("Pressed Love Button");
    AmountofMoney = AmountofMoney - Love_Cost
    CheckMoney()
})
Knees_Button.addEventListener("mouseup", () => {
    console.log("Pressed Knees Button");
    AmountofMoney = AmountofMoney - Knees_Cost
    CheckMoney()
})
Toes_Button.addEventListener("mouseup", () => {
    console.log("Pressed Toes Button");
    AmountofMoney = AmountofMoney - Toes_Cost
    CheckMoney()
})
Shoes_Button.addEventListener("mouseup", () => {
    console.log("Pressed Shoes Button");
    AmountofMoney = AmountofMoney - Shoes_Cost
    CheckMoney()
})