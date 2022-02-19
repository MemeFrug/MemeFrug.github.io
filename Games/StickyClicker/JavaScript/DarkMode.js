//DARK MODE
var darkmodebut = document.getElementById("darkmode")
darkmodebut.addEventListener('click', darkmodefunc)

function darkmodefunc() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
//END OF DARK MODE