//DARK MODE
var darkmodebut = document.getElementById("darkmode")
darkmodebut.addEventListener('click', darkmodefunc)

const isdarkmode = localStorage.getItem('darkmode')

let isindarkmode;

if (isdarkmode == undefined) {
    isindarkmode = false
}else {
    isindarkmode = eval(isdarkmode)
    darkmodefunc()
}

function darkmodefunc() {
    localStorage.setItem('darkmode', isindarkmode)
    if (isindarkmode) {
        isindarkmode = false
        var element = document.body;
        element.classList.toggle("dark-mode");
    } else {
        isindarkmode = true
        var element = document.body;
        element.classList.toggle("dark-mode");
    }
}
//END OF DARK MODE