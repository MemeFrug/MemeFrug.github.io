var levels = [{
    //MainMenu

}, {
    //Level1
    Aiposx: 500,
    Aiposy: 200,
    wall1: new CubeCreator(100, 10, 20, 500, GAME_WIDTH, GAME_HEIGHT),
    wall2: new CubeCreator(10, 10, 20, 400, GAME_WIDTH, GAME_HEIGHT),
    nextlvl: new CubeCreator(500, 500, 60, 60, GAME_WIDTH, GAME_HEIGHT),
    Enemy: new AIConstructor(500, 200, 60, 60),
    Level1: new TextCreator(GAME_WIDTH / 2, 80, "40px", "Arial", 'black'),

    draw: function (ctx, walls) {
        this.wall1.draw(ctx, walls)
        this.wall2.draw(ctx, walls)
        this.nextlvl.draw(ctx, "#0f0")
        this.Enemy.draw(ctx, "purple")
        this.Level1.draw(ctx, "Level 1",)
    },
    respawn: function () {
        char.position.x = 40
        char.position.y = 20
        this.Enemy.position.y = 200
        this.Enemy.position.x = 500
    }

}, {//Level2
    wall1: new CubeCreator(100, 10, 20, 500),
    wall2: new CubeCreator(10, 10, 20, 500),
    laser1: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
        laser2: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
        laser3: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
        laser4: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
        laser5: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
    nextlvl: new CubeCreator(700, 500, 60, 60),
    char1: new character(40, 20, GAME_WIDTH, GAME_HEIGHT),
    Level2: new TextCreator(GAME_WIDTH / 2, 80, "40px", "Arial", 'black'),

    respawn: function () {
        this.char1.position.x = 40
        this.char1.position.y = 20
    },


    draw: function (ctx, walls, danger) {
        this.wall1.draw(ctx, walls)
        this.wall2.draw(ctx, walls)
        this.laser1.draw(ctx, danger)
        this.laser2.draw(ctx, danger)
        this.laser3.draw(ctx, danger)
        this.laser4.draw(ctx, danger)
        this.laser5.draw(ctx, danger)
        this.nextlvl.draw(ctx, "#0f0")
        this.char1.draw(ctx)
        this.Level2.draw(ctx, "Level 2")
    }

}, {//Level3
    char1: new character(300, 20, GAME_WIDTH, GAME_HEIGHT),
    Aiposy: 200,
    Aiposx: 500,
    Enemy: new AIConstructor(500, 200, 60, 60),
    Ai2posy: 500,
    Ai2posx: 300,
    Enemy2: new AIConstructor(300, 500, 60, 60),
    Ai3posy: 200,
    Ai3posx: 800,
    Enemy3: new AIConstructor(800, 200, 60, 60),
    Ai4posy: 400,
    Ai4posx: 500,
    Enemy4: new AIConstructor(500, 400, 60, 60),
    laser1: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
    laser2: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
    laser3: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
    laser4: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
    laser5: new CubeCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60),
    Level3: new TextCreator(GAME_WIDTH / 2, 80, "40px", "Arial", 'black'),

    Timer: new TextCreator(GAME_WIDTH - 400, 80, "40px", "Arial", 'black'),
    Timeleft: 30,

    respawn: function () {
        this.laser1.position.x = random(60, GAME_WIDTH)
        this.laser1.position.y = random(60, GAME_HEIGHT)
        this.laser2.position.x = random(60, GAME_WIDTH)
        this.laser2.position.y = random(60, GAME_HEIGHT)
        this.laser3.position.x = random(60, GAME_WIDTH)
        this.laser3.position.y = random(60, GAME_HEIGHT)
        this.laser4.position.x = random(60, GAME_WIDTH)
        this.laser4.position.y = random(60, GAME_HEIGHT)
        this.laser5.position.x = random(60, GAME_WIDTH)
        this.laser5.position.y = random(60, GAME_HEIGHT)
        this.char1.position.x = 40
        this.char1.position.y = 20
        this.Enemy.position.y = 200
        this.Enemy.position.x = 500
        this.Enemy2.position.x = 300
        this.Enemy2.position.y = 500
        this.Enemy3.position.x = 200
        this.Enemy3.position.y = 1000
        this.Enemy4.position.x = 500
        this.Enemy4.position.y = 400
        this.Timeleft = 30
    },

    draw: function (ctx, walls) {
        this.char1.draw(ctx)
        this.laser1.draw(ctx, 'red')
        this.laser2.draw(ctx, 'red')
        this.laser3.draw(ctx, 'red')
        this.laser4.draw(ctx, 'red')
        this.laser5.draw(ctx, 'red')
        this.Enemy.draw(ctx, "purple")
        this.Enemy2.draw(ctx, "purple")
        this.Enemy3.draw(ctx, "purple")
        this.Enemy4.draw(ctx, "purple")
        this.Timer.draw(ctx, "Time Left: " + this.Timeleft.toString() + " Seconds")
        this.Level3.draw(ctx, "Level 3")
    },

    update: function () {
        if (this.char1.iscolliding(this.laser1)) {
            console.log('respawning')
            this.respawn()
        } if (this.char1.iscolliding(this.laser2)) {
            console.log('respawning')
            this.respawn()
        } if (this.char1.iscolliding(this.laser3)) {
            console.log('respawning')
            this.respawn()
        } if (this.char1.iscolliding(this.laser4)) {
            console.log('respawning')
            this.respawn()
        } if (this.char1.iscolliding(this.laser5)) {
            console.log('respawning')
            this.respawn()
        }
        this.Aiposx = this.Enemy.position.x + 10
        this.Aiposy = this.Enemy.position.y + 10
        this.Ai2posx = this.Enemy2.position.x + 10
        this.Ai2posy = this.Enemy2.position.y + 10
        this.Ai4posx = this.Enemy4.position.x + 10
        this.Ai4posy = this.Enemy4.position.y + 10
        this.Ai3posx = this.Enemy3.position.x + 10
        this.Ai3posy = this.Enemy3.position.y + 10
    }
}, {//Level 4
    //Items
    char1: new character(300, 20, GAME_WIDTH, GAME_HEIGHT),
    trap1: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap2: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap3: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap4: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap5: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap6: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap7: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap8: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap9: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap10: new TrapCreator(random(60, GAME_WIDTH), random(60, GAME_HEIGHT), 60, 60, 'red', 'orange', true),
    trap11: new TrapCreator(800, 500, 190, 500),
    wall1: new CubeCreator(0, 200, 1010, 10),
    wall2: new CubeCreator(200, 500, 1010, 10),
    nextlevel: new CubeCreator(1000, 600, 60, 60),
    Level4: new TextCreator(GAME_WIDTH / 2, 80, "40px", "Arial", 'black'),

    //Respawning
    respawn: function () {
        this.trap1.position.x = random(60, GAME_WIDTH)
        this.trap1.position.y = random(60, GAME_HEIGHT)
        this.trap2.position.x = random(60, GAME_WIDTH)
        this.trap2.position.y = random(60, GAME_HEIGHT)
        this.trap3.position.x = random(60, GAME_WIDTH)
        this.trap3.position.y = random(60, GAME_HEIGHT)
        this.trap4.position.x = random(60, GAME_WIDTH)
        this.trap4.position.y = random(60, GAME_HEIGHT)
        this.trap5.position.x = random(60, GAME_WIDTH)
        this.trap5.position.y = random(60, GAME_HEIGHT)
        this.trap6.position.x = random(60, GAME_WIDTH)
        this.trap6.position.y = random(60, GAME_HEIGHT)
        this.trap7.position.x = random(60, GAME_WIDTH)
        this.trap7.position.y = random(60, GAME_HEIGHT)
        this.trap8.position.x = random(60, GAME_WIDTH)
        this.trap8.position.y = random(60, GAME_HEIGHT)
        this.trap9.position.x = random(60, GAME_WIDTH)
        this.trap9.position.y = random(60, GAME_HEIGHT)
        this.trap10.position.x = random(60, GAME_WIDTH)
        this.trap10.position.y = random(60, GAME_HEIGHT)
        this.char1.position.x = 300
        this.char1.position.y = 20
    },

    //Draw Items
    draw: function (ctx, walls) {
        this.char1.draw(ctx)
        this.trap1.draw(ctx)
        this.trap2.draw(ctx)
        this.trap3.draw(ctx)
        this.trap4.draw(ctx)
        this.trap5.draw(ctx)
        this.trap6.draw(ctx)
        this.trap7.draw(ctx)
        this.trap8.draw(ctx)
        this.trap9.draw(ctx)
        this.trap10.draw(ctx)
        this.trap11.draw(ctx)
        this.nextlevel.draw(ctx, '#0f0')
        this.wall1.draw(ctx, 'black')
        this.wall2.draw(ctx, 'black')
        this.Level4.draw(ctx, "Level 4")
    },

    //Go to next level
    nextlvl: function () {
        console.log('going to next level')
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        clearInterval(lvl4interval)
        whatlevel = 5
        levels[5].draw(ctx)
        notdead = false
        document.getElementById("personel best").textContent = textval.toString() + " Seconds"
        localStorage.setItem("Time", textval.toString())
    },

    //Update Items
    update: function () {
        if (this.char1.iscolliding(this.trap1)) {
            if (!this.trap1.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap2)) {
            if (!this.trap2.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap3)) {
            if (!this.trap3.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap4)) {
            if (!this.trap4.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap5)) {
            if (!this.trap5.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap6)) {
            if (!this.trap6.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap7)) {
            if (!this.trap7.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap8)) {
            if (!this.trap8.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap9)) {
            if (!this.trap9.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap10)) {
            if (!this.trap10.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.trap11)) {
            if (!this.trap11.activated) {

            } else {
                this.respawn()
            }
        }
        if (this.char1.iscolliding(this.nextlevel)) {
            this.nextlvl()
        }
    }
}, { //Finish Game Screen

        // Button position and dimensions
        // Render button and text
        draw: function (ctx) {
            console.log('loaded')

            // Button position and dimensions 
            var buttonX = (GAME_WIDTH / 2) - 250;
            var buttonY = GAME_HEIGHT / 2;
            var buttonW = 500;
            var buttonH = 100;

            // Render button and text
            ctx.fillStyle = 'red'
            ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
            var MainMenuText = new TextCreator((GAME_WIDTH / 2) - 240, (GAME_HEIGHT / 2) - 230, "90px", "Arial", 'red')
            MainMenuText.draw(ctx, "Finished!")
            var PlayText = new TextCreator(buttonX + 60, buttonY + 80, "80px", "Arial", 'white')
            PlayText.draw(ctx, "Play Again")

            // Add event listener to canvas element 
            canvas.addEventListener('click', function event2(event) {
                // Control that click event occurred within position of button 
                // NOTE: This assumes canvas is positioned at top left corner  
                if (
                    event.x > buttonX &&
                    event.x < buttonX + buttonW &&
                    event.y > buttonY &&
                    event.y < buttonY + buttonH
                ) {
                    // Executes if button was clicked! 
                    console.log('Button was clicked!');
                    location.reload()
                }
            }); 
        }
    }]