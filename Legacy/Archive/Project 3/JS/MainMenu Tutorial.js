console.log('Loaded MainMenu.js');

//Play Button
function StartGame() {
    console.log('Starting Game') //debug (remove later)
    //Remove Elements on screen
    MainMenu.remove()
    document.getElementById('footer').remove()
    //Show Elements
    TutorialDiv.style.display = 'inherit'
    if (SavedName == null) {
        Tutorial()   
    } else {
        TutorialDiv.remove()
        console.log(NameofChar)
        GameScreenDiv.style.display = 'inherit'
        canvas = document.getElementById('gameScreen')
        ctx = canvas.getContext('2d')
        new inputhandler;
        character = new Character(480,480,50,50,NameofChar)
        localStorage.setItem('Name', NameofChar)
        character.stopx()
        character.stopy()
        console.log(`created new character: ${character.name}`);
        Loggedinas.textContent = character.name
        Main()
    }
}

function Tutorial() {
    setTimeout(function() {
        var TutorialText1 = document.createElement("P")
        TutorialDiv.appendChild(TutorialText1).textContent = 'In this game you strive to make a business'

        var TutorialText2 = document.createElement("P")
        TutorialDiv.appendChild(TutorialText2).textContent = 'Makemoney. And Do all Kinds of stuff.'

        var TutorialText3 = document.createElement("P")
        TutorialDiv.appendChild(TutorialText3).textContent = 'Hire Land, Build Bisnesses and get better busnesses etc!'

        var TutorialInput = document.createElement("input")
        TutorialInput.type = 'text'
        TutorialInput.placeholder = 'Name Here (Max 15 letters)'
        TutorialInput.size = 40
        TutorialInput.style.fontSize = '20px'
        TutorialInput.maxLength = 15

        TutorialDiv.appendChild(TutorialInput)

        var TutorialText4 = document.createElement("P")
        TutorialText4.classList.add('MenuButton')
        TutorialDiv.appendChild(TutorialText4).textContent = 'Lets Go!!'
        EndTutorialBut = TutorialText4.addEventListener('click', () => {
            NameofChar = TutorialInput.value
            if (NameofChar != '') {
                TutorialDiv.remove()
                
                GameScreenDiv.style.display = 'inherit'
                canvas = document.getElementById('gameScreen')
                ctx = canvas.getContext('2d')
                new inputhandler;
                character = new Character(480,480,50,50,NameofChar)
                localStorage.setItem('Name', NameofChar)
                character.stopx()
                character.stopy()
                console.log(`created new character: ${character.name}`);
                Loggedinas.textContent = character.name
                Main()
            } else {
                TutorialInput.placeholder = 'Please Enter a Name'
            }
        })
    },1000)
}