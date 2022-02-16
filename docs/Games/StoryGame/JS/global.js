/**
 * 
 *  Variables
 *  Description: Variables Here
 * 
 */

const Canvas = document.getElementById("canvas");
const MainMenuElementDOM = document.getElementById("MainMenu");
const TitleButtonsDOM = document.getElementById("title-buttons");
const ButtonsInContainerDOM = document.getElementsByClassName("button_container");
const TitleDOM = document.getElementById("title");
const Animations = { /* A List Of All The Animations in a Object */
    title_position: (progress) => {
        TitleButtonsDOM.style.height = progress * 100 + "%"
    },

    opacity_buttons: (progress) => {
        for (var i = 0, max = ButtonsInContainerDOM.length; i < max; i++) {
            ButtonsInContainerDOM[i].style.opacity = progress;
        }
    },

    opacity_buttons_none: (progress) => {
        TitleDOM.style.opacity = -progress + 1

        for (var i = 0, max = ButtonsInContainerDOM.length; i < max; i++) {
            ButtonsInContainerDOM[i].style.opacity = -progress + 1;
        }
    },

    people: (progress) => {
        ctx.globalAlpha = -progress + 1
    }
}

let ctx = Canvas.getContext("2d") // Get The Context of the Canvas Used For Drawing
let _IsFocused = true; // A Variable Used To See if Is In focussed

/**
 * @param {*} Person The Character Or Thing Saying The Text, Displayed in the Draw function
 * @param {*} Text The Text Of The Dialogue, Displayed in the Draw Function
 * @param {*} DelayStart Used For When Start To TypeWrite, there is a delay at the start of typewriting (Not Inbetween Each Letters)
 */
class Dialogue {
    constructor(Person, Text, DelayStart = 0) {
        this.text = Text
        this.person = Person
        this.DelayStart = DelayStart

        this.displayText = ""

        this.timeoutType = 50
        this.active = false
        this.textPosition = 0

        this.stopTyping = true
    }

    Draw(ctx) {
        if (!this.active) { return false }

        return true
    }

    TypeWrite() {
        if (this.textPosition < txt.length && !this.stopTyping) {
            this.displayText += this.text.charAt(this.textPosition);
            this.textPosition++;
            setTimeout(this.TypeWrite, this.timeoutType);
        }
    }

    Start() {
        this.stopTyping = false
        this.active = true
        this.TypeWrite()
    }
}


/**
 *
 *   Levels Global
 *   Description: A Object Containing All the Data For All the Levels, Might Move to Its Own File If It Gets Too Big
 *
 */
_Levels = [
    {
        Name: "Tutorial",
        Data: {
            Objects: {

            },
            Dialogue: [
                new Dialogue("John", "Text", 1000),
                new Dialogue("Me", "Text", 100) // Like so
            ]
        }
    },
    {
        Name: "Level 1"

    },
    {
        Name: "Level 2"

    },
    {
        Name: "Level 3"

    },
    {
        Name: "Level 4"

    },
    {
        Name: "Level 5"

    },
]