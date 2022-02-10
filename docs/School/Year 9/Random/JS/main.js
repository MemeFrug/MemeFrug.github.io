const Input = document.getElementById("input")
const Button = document.getElementById("button")
const Correct = document.getElementById("Correct")
let RandomNumber = 0;

function GetRandomInt(Max, Min) {
    return Math.floor(Math.random() * Max) + Min
}

function RefreshRandomNumber() {
    RandomNumber = GetRandomInt(10, 1)
}

Button.addEventListener("mouseup", () => {
    const GetNumberInInput = Input.value
    if (GetNumberInInput == RandomNumber) {
        console.log("Correct!");
        Correct.innerHTML = `Correct! Answer was ${RandomNumber}`
        Correct.style.color = "green"
        Correct.style.display = "inherit"
    }else {
        console.log("Got It Wrong");
        Correct.innerHTML = `Wrong. Answer was ${RandomNumber}`
        Correct.style.color = "red"
        Correct.style.display = "inherit"
    }
    RefreshRandomNumber()
})

RefreshRandomNumber()