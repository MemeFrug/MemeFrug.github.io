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