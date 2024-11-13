// ============================================================================
// Copyright (c) 2013 Steven Lu

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
// ============================================================================

// MODIFIED BY @MemeFrug
// Issues,
/*
  - Game freezes with an exception error seemingly when holding when about to lose (possibly spawns a block inside another...)
*/

// Changes,
// - Removed mobile functionality (just wanted to simplify)
// - Added mobile compatability screen TODO
// - Improved user interface
// - Increasing Level
// - Each level increases speed
// - Holding tetrinomes
// - Win at Level 255
// - Local storage TODO
// - Queue System
// - Improved Particle Based Background

var TETRIS = new function () { // namespacing
	
    function random_det(seed) {
      return function() {
        // Robert Jenkins' 32 bit integer hash function.
        seed = ((seed + 0x7ed55d16) + (seed << 12))  & 0xffffffff;
        seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
        seed = ((seed + 0x165667b1) + (seed << 5))   & 0xffffffff;
        seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;
        seed = ((seed + 0xfd7046c5) + (seed << 3))   & 0xffffffff;
        seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
        //return (seed >>> 0) / 0xffffffff;
        return (seed >>> 0); 
      };
    }
    
    // generator to mod PRNG by 7
    function random_det_7(seed) {
      var gen = random_det(seed);
      return function () { 
        return gen()%7;
      };
    }
    
    // generator to produce a permutation of 0..7 -- returns array
    // this is a fisher yates shuffle
    function random_perm_7(seed) {
      var gen = random_det(seed);
      var arr = [0,1,2,3,4,5,6];
      return function () {
        var i;
        for(i=6;i>0;i--) {
          var j = gen()%(i+1);
          var tmp = arr[j];
          arr[j] = arr[i];
          arr[i] = tmp;
          // todo: change to xor swap
        }
        return arr;
      };
    }
    
    function random_perm_single(seed) {
      var gen = random_perm_7(seed);
      var curPerm = gen(); // i dont like this unnecessary duplicating of state
      var which = -1;
      return function () {    
        which += 1;
        if (which >= 7) { curPerm = gen(); which = 0;}
        return curPerm[which];
      };
    }
    let linesRequired = 1 // TO level up
    let level = 1 // Current level

    let moveDownSpeed = 500 // milliseconds
    let levelsEachDrop = 1

    var board = [];
    var i=0;
    for (i=0;i<240;i++) {
        board[i] = 0;
    }
    var xoff = 0;
    var yoff = 0;
    var xsize = 15;
    var ysize = 15;
    var gapsize = 0;
    var bordersize = 2;
    // white, red, green, blue, purple, yellow, orange, cyan
    // None,  Z,   S,     J,    T,      O,      L,      I
    var colors = ["#FFFFFF","#F00","#0F0",
                  "#22F","#F0F", "#FF0",
                  "#F70","#0EE"];
    
    function drawTetrinome(posX,posY,value,context) {
      context.fillStyle = colors[value];
      // context.strokeRect(xoff + posX*(xsize+gapsize), yoff+posY*(ysize+gapsize),xsize,ysize)
      context.fillRect(xoff + posX*(xsize+gapsize), yoff+posY*(ysize+gapsize),xsize,ysize);
    }
    function drawBoard(context) {
      var i;
      // context.fillStyle = "#000";
      // context.fillRect(0,0,xoff*2 + xsize*10 + gapsize*9,yoff*2+ysize*24+gapsize*23);
      context.clearRect(0,0,(xsize+gapsize)*11,(ysize+gapsize)*25);
      // context.strokeRect(xoff,yoff,(xsize+gapsize)*10-gapsize,(ysize+gapsize)*24-gapsize);
      context.fillStyle = "rgba(0,0,0,0)";
      context.fillRect(xoff,yoff,(xsize+gapsize)*10-gapsize,(ysize+gapsize)*24-gapsize);
      for(position=0;position<240;position++){
        var i = position % 10;
        var j = (position-i) / 10;
        drawTetrinome(i,j,board[position],context);
      }
    }
    function updateSizing() {
      xsize = ysize = Math.floor((window.innerHeight - 25 - yoff*2 - 24*gapsize) / 24.0);
      //gapsize = Math.floor((window.innerHeight - 150) / 300);
      var bc = document.getElementById('board_canvas');
      bc.width = (xoff*2 + xsize*10 + gapsize*9);
      bc.height = (yoff*2 + ysize*24 + gapsize*23);
    }
    
    function determineLevel(clearedLines = 0) {
      linesRequired -= clearedLines
      //Add to current lines cleared
      document.getElementById("linesToClear").textContent = Math.round(linesRequired)
      if (linesRequired <= 0) {
        // Update the level
        level = level + 1;
        tempNewParticles += 650
        document.getElementById("level").textContent = level
        
        // Update the level's down speed
        console.log("Drop speed decreased by ", moveDownSpeed-(-((level**3)+(10*(level**2))-31000000)/100000));
        moveDownSpeed = (1000000)/(level**2+2000)

        //Left over cleared lines ensure it is the absolute value
        leftOverClears = Math.abs(linesRequired)

        //Update lines required
        linesRequired = Math.round(level*(1/7) + 1)
        console.log(linesRequired);
        determineLevel(leftOverClears) // Check for left overs
      }
      
      
      //Check winning state
      if (level >= 255) {
        gameWin()
      }
    }

    function clearRowCheck(startrow, numrowsdown) {
      var i;
      var numRowsCleared = 0;
      for (i=0;i<numrowsdown;i++) {
        var j;
        var full = true;
        for (j=0;j<10;j++) {
          if (!board[(startrow+i)*10+j]) full = false;
        }
        if (full) { numRowsCleared++; shiftDown(startrow+i);  var ctx1 = document.getElementById('board_canvas').getContext('2d'); drawBoard(ctx1);}
      }
      
      // Determine level with how many rows cleared
      if (numRowsCleared >0) {
        console.log(numRowsCleared*numRowsCleared);
        determineLevel(numRowsCleared*numRowsCleared)
      }

      if (numRowsCleared == 1) {
        applyScore(100);
        
      }
      else if (numRowsCleared == 2) {
        applyScore(200);
      }
      else if (numRowsCleared == 3) {
        applyScore(400);
      }
      else if (numRowsCleared == 4) {
        applyScore(1000);
      }
    }
    // row is full
    function shiftDown(row) {
      var i;
      for(i=row*10-1;i>=0;i--) {
        board[i+10] = board[i];
      }
      for(i=0;i<10;i++) {
       board[i]=0;
      }
    }
    
    // Returns a random number between two values (inclusive)
    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    function randFloat(min, max) {
      return (Math.random() * (max - min)) + min
    }

    let particles = []
    let maxParticleNum = 200 // Overided when temp particles are added
    let tempNewParticles = 0

    function backgroundUpdate(dt) {
      const canvas = document.getElementById("backgroundCanvas")
      const ctx = canvas.getContext('2d')

      canvas.width = 1920
      canvas.height = 1080

      // if (particles.length > maxParticleNum*2 - tempNewParticles) {
      //   tempNewParticles = 0
      // }

      // Generate new Particles
      if (particles.length < maxParticleNum + tempNewParticles) {
        // console.log("Generation new particles:", maxParticleNum - particles.length);
        for (let i = 0; i < maxParticleNum - particles.length + tempNewParticles; i++) {
          let newParticle = {}
          // newParticle.c = "grey"
          newParticle.c = colors[randInt(0, colors.length-1)]
          newParticle.w = randInt(4, 15)
          newParticle.h = newParticle.w+randInt(-1, 2)
          newParticle.x = randInt(0, canvas.width-newParticle.w+130)
          newParticle.y = canvas.height + randInt(0, 400)
          newParticle.o = 1
          newParticle.vo = randFloat(0.9, 0.99) // Rate of change of opacity
          //Particle's velocity
          newParticle.vx = randFloat(-1, 1)
          newParticle.vy = randFloat(-0.4, -0.5)
          if (tempNewParticles > 0) tempNewParticles -= 1
          particles.push(newParticle)
        }
      }

      // Update particle's position + Draw the background
      particles.forEach(particle => {
        // Delete if out of view
        if (particle.y+particle.h < -300 || particle.x < -100 || particle.x > canvas.width +100 || particle.o < 0.1) { // Above viewport...
          // Delete the particle from the array
          particles.splice(particles.indexOf(particle), 1)
          return
        }
        // Add the particle's velocity to its corodinates
        particle.x += particle.vx * dt
        particle.vx = particle.vx*randFloat(-0.99, 1.01) // Slow it down
        particle.y += particle.vy * dt
        particle.vy = particle.vy*1.02 // Speed it up
        particle.o = particle.o*particle.vo
        //Draw
        ctx.save()
        ctx.rotate(0.2)
        ctx.fillStyle = particle.c
        ctx.globalAlpha = particle.o
        // ctx.fillStyle = "red"
        ctx.fillRect(particle.x, particle.y, particle.w, particle.h)
        ctx.restore()
      });
    }

    let camera = {
      x: 0,
      y: 0,
      xoffset: 0,
      yoffset: 0,
      yvel: 0,
      xvel: 0
    }

    let cameraMovementTime = 0

    function cameraMovement(dt) {
      const mainContainer = document.getElementById("mainContainer");

      cameraMovementTime += 1
      
      camera.xoffset += camera.xvel
      camera.yoffset += camera.yvel

      camera.xvel *= 0.9
      camera.yvel *= 0.9

      camera.xoffset *= 0.7
      camera.yoffset *= 0.7

      // Camera shake plus any offset
      camera.x = (0.2*Math.cos(1/50*cameraMovementTime) + camera.xoffset) *dt
      camera.y = (0.1*Math.sin(1/50*cameraMovementTime) + camera.yoffset) *dt

      mainContainer.style.position = "absolute"
      mainContainer.style.top = `${camera.y+13}px`
      mainContainer.style.left = `${camera.x}px`
    }

    let mainCanvasContext = undefined

    var autoMoveDownInterval = "";
    var animationUpdateInterval = false;
    function moveDownIntervalFunc () {
      moves[7]();
    } 
    let lastTime = 0

    function animationUpdateIntervalFunc(totalTime) {
      const dt = totalTime-lastTime
      lastTime = totalTime

      if (!dt || dt > 80) {
        console.warn("Ignoring Frame Too large.", dt);
        if (animationUpdateInterval) requestAnimationFrame(animationUpdateIntervalFunc)   
        return; // Ignore frame if spiked or not exist
      }

      if (!mainCanvasContext) {
        const mainCanvas = document.getElementById('board_canvas')
        mainCanvasContext = mainCanvas.getContext('2d')
      }

      // Update the main Container for camera shake
      cameraMovement(dt)

        //Draw the background
        backgroundUpdate(dt)

        //Draw the queue system
        drawQueue(mainCanvasContext);


      // Redraw the board
      drawBoard(mainCanvasContext);
      updateShadow();
      // move animPositions closer to their targets (piece positions)
      animPositionX += (pieceX - animPositionX)*.01*dt;
      animPositionY += (pieceY - animPositionY)*.01*dt;
      // move animRotation closer to zero
      animRotation -= animRotation * 0.015 * dt;
      drawPiece(mainCanvasContext);
      document.getElementById("DropSpeed").textContent =  Math.round(moveDownSpeed)
      if (animationUpdateInterval) requestAnimationFrame(animationUpdateIntervalFunc)
    }
    
    var paused = false;
    function isPaused() {
        return paused;
    }
    
    var setPause = function(isendgame, customText = "Paused") {
      //console.log("setPause invoked", paused);
      if (paused) return;
      clearInterval(autoMoveDownInterval); 
      autoMoveDownInterval = "";
      animationUpdateInterval = false;

      paused = true;
      pausedBecauseLostFocus = false; // default this to false
      document.getElementById("pauseText").style.display = "block"
      document.getElementById("pauseText").textContent = customText
    }
    
    
    function unPause() {
      if (!paused) return;
      if (autoMoveDownInterval == "") {
        autoMoveDownInterval = setInterval(moveDownIntervalFunc,moveDownSpeed);
      }
      if (animationUpdateInterval == false) {
          animationUpdateInterval = true
          requestAnimationFrame(animationUpdateIntervalFunc)
      }
      paused = false;
      pausedBecauseLostFocus = false; // default this to false
      //Clear pause text and hide it
      document.getElementById("pauseText").style.display = "none"
      document.getElementById("pauseText").textContent = ""
    }
    

    window.onload = function () { win_onload(); }; 
    
    function win_onload() {
      generateQueue(); // Generate the queue of tetrinomes
      next(); // Pick the next one in the queue
      applyScore(0); // to init
      setPause(false);
      unPause();
      updateSizing();  
    }
    
    // coordinate systems follow convention starting at top-left. 
    // order is that of clockwise rotation.
    // row-major layout.
    // currently using SRS rotation; I am not satisfied with 
    // the S, Z, I having 4 states when they only need two, 
    // but I would need to have them rotate on an axis that changes
    // location depending on orientation and cw vs ccw rotation. 
    // todo: Implement this :) --- hopefully without enumerating
    // all possible cases
    var tetromino_Z = [[[1,1],[0,1,1]],[[0,0,1],[0,1,1],[0,1]],[[],[1,1],[0,1,1]],[[0,1],[1,1],[1]]];
    var tetromino_S = [[[0,2,2],[2,2]],[[0,2],[0,2,2],[0,0,2]],[[],[0,2,2],[2,2]],[[2],[2,2],[0,2]]];
    var tetromino_J = [[[3],[3,3,3]],[[0,3,3],[0,3],[0,3]],[[],[3,3,3],[0,0,3]],[[0,3],[0,3],[3,3]]];
    var tetromino_T = [[[0,4],[4,4,4]],[[0,4],[0,4,4],[0,4]],[[],[4,4,4],[0,4]],[[0,4],[4,4],[0,4]]];
    var tetromino_O = [[[5,5],[5,5]]];
    var tetromino_L = [[[0,0,6],[6,6,6]],[[0,6],[0,6],[0,6,6]],[[],[6,6,6],[6]],[[6,6],[0,6],[0,6]]];
    var tetromino_I = [[[7,7,7,7]],[[0,0,7],[0,0,7],[0,0,7],[0,0,7]],[[],[],[7,7,7,7]],[[0,7],[0,7],[0,7],[0,7]]];
    // tetromino geometry data
    var tetrominos = [tetromino_Z,tetromino_S,tetromino_J,tetromino_T,tetromino_O,tetromino_L,tetromino_I];
    // this is for the rotation animation -- must know where in local
    // grid did the piece rotate around
    // each coordinate is a triple, the first two are x,y, and 
    // the last is to indicate whether the point is in the center
    // of the block or in the corner to the bottom right between 
    // blocks. These are the points which may be rotated around
    // to retain block alignment, if that makes any sense. 
    var tet_center_rot = [[1,1,true],[1,1,true],[1,1,true],[1,1,true],[0,0,false],[1,1,true],[1,1,false]];
    
    var pieceX=3;
    var pieceY=0;
    var curPiece=0;
    var curRotation=0;
    
    function clearContext(ctx, width, height) {
        // Store the current transformation matrix
        ctx.save();
    
        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);
    
        // Restore the transform
        ctx.restore(); 
    }
    
    function gameWin() {
      setPause(true, "Won!");
    }
    function gameOver() {
      setPause(true, "Game Over...");
      //Cleanup TODO
      
    }
    
    //Queue system
    let queueLength = 5
    let tetrinomeQueue = []
    var generator = random_perm_single(Math.floor((new Date()).getTime() / 1000));

    function generateQueue() {
      for (let i = 0; i < queueLength; i++) {
        tetrinomeQueue.push(generator())
      }
      console.log(tetrinomeQueue);
    }

    function getNextTetrinome() {
      tetrinomeQueue.push(generator())
      return tetrinomeQueue.shift()
    }

    function drawQueue(ctx) {
      //Draw The held piece in preview
      const QueueCanvas = document.getElementById("queueCanvas")
      const context = QueueCanvas.getContext('2d')

      const tileSize = 60
      QueueCanvas.width = QueueCanvas.clientWidth *2
      QueueCanvas.height = QueueCanvas.clientHeight*2//tiles long

      clearContext(context, QueueCanvas.width, QueueCanvas.height)
      for (let yposition = 0; yposition < tetrinomeQueue.length; yposition++) {
        const tetrinomeIdentifier = tetrinomeQueue[yposition];
        for (let i = 0; i < tetrominos[tetrinomeIdentifier][0].length; i++) {
          const element = tetrominos[tetrinomeIdentifier][0][i];
          for (let j = 0; j < element.length; j++) {
            const color = element[j];
            
            // To get the center of the preview canvas
            const lengthOfLongestSide = tetrominos[tetrinomeIdentifier][0][tetrominos[tetrinomeIdentifier][0].length - 1].length * 20
            // const lengthOfHeight = tetrominos[tetrinomeIdentifier][0].length * 20
            
            context.fillStyle = colors[color]
            context.fillRect(j * tileSize + QueueCanvas.width/2 - lengthOfLongestSide*1.5, i * tileSize + yposition*QueueCanvas.height/queueLength + tileSize, tileSize, tileSize)
          }
        }
      }
    }

    let heldPiece = undefined
    let alreadyHeld = false

    var lockTimer = "";
    
    function next() {
      alreadyHeld = false

      pieceX = 3;
      pieceY = 0;
      animPositionX = pieceX;
      animPositionY = pieceY;
      curRotation = 0;
      curPiece = getNextTetrinome();
      if (kick()) {
        gameOver();
      }
    }
    

    function holdFunc() {
      if (freezeInteraction) return; // Fix Spawning Tetrinomes inside one another

      alreadyHeld = true

      //Reset its position
      pieceX = 3;
      pieceY = 0;
      animPositionX = pieceX;
      animPositionY = pieceY;
      curRotation = 0;

      // console.log(curPiece);
      if (curPiece != undefined) {
      // console.log(heldPiece);
        const currentHeldPiece = heldPiece
        if (currentHeldPiece != undefined) {
          heldPiece = curPiece
          curPiece = currentHeldPiece
        } else {
          heldPiece = curPiece
          curPiece = getNextTetrinome()
        }

        //Camera velocity to the left for feedback
        camera.xvel += -0.2

        //Draw The held piece in preview
        const PreviewCanvas = document.getElementById("PreviewCanvas")
        const context = PreviewCanvas.getContext('2d')

        PreviewCanvas.width = 100
        PreviewCanvas.height = 100

        clearContext(context, PreviewCanvas.width, PreviewCanvas.height)
        for (let i = 0; i < tetrominos[heldPiece][0].length; i++) {
          const element = tetrominos[heldPiece][0][i];
          for (let j = 0; j < element.length; j++) {
            const color = element[j];

            // Note 20px is the size of the grid in preview window

            // To get the center of the preview canvas
            const lengthOfLongestSide = tetrominos[heldPiece][0][tetrominos[heldPiece][0].length - 1].length * 20
            const lengthOfHeight = tetrominos[heldPiece][0].length * 20

            // Draw the tetrinome with correct colors and centered
            context.fillStyle = colors[color]
            context.fillRect(j * 20 + (PreviewCanvas.width - lengthOfLongestSide) / 2, i * 20 + (PreviewCanvas.height - lengthOfHeight) / 2, 20, 20)
          }
        }
      }
    }
    
    var lastFixTime = 0;
    
    function fixPiece() {
        lastFixTime = new Date().getTime();
      var i,j;
      var tetk = tetrominos[curPiece][curRotation];
      for (j=0;j<tetk.length;j++) {
        var tetkj = tetk[j];
        for (i=0;i<tetkj.length;i++) {
          var tetkji = tetkj[i];
          var pxi = pieceX+i;
          var pyj = pieceY+j;
          if (tetkji)
          {
            board[pyj*10+pxi] = tetkji;
          }
        }
      }
      drawBoard(document.getElementById('board_canvas').getContext('2d'));
      // will hardcode this behavior for now
      clearRowCheck(pieceY,tetrominos[curPiece][curRotation].length);
      next();
    }
    
    function isPieceInside() {
      var i,j;
      var tetk = tetrominos[curPiece][curRotation];
      for (j=0;j<tetk.length;j++) {
        var tetkj = tetk[j];
        for (i=0;i<tetkj.length;i++) {
          var tetkji = tetkj[i];
          var pxi = pieceX+i;
          var pyj = pieceY+j;
          if (tetkji && (pxi < 0 || pyj < 0 || pxi > 9 || pyj > 23)) {
            //document.getElementById('msg').innerHTML += "<br>pxi,pyj="+pxi+","+pyj+"i,j="+i+","+j+"tetkji="+tetkji;
            return 1;
          }
          if (tetkji && board[pyj*10+pxi]) {
            return 2; 
          }
        }
      }
      return 0;
    }
    moves = [
      // left
      function () {if (freezeInteraction) return; pieceX -= levelsEachDrop; if (isPieceInside()) pieceX += levelsEachDrop; shiftright = 0; clearLockTimer();},
      // up direction movement is a cheat in standard tetris
      function () {if (freezeInteraction) return; pieceY -= levelsEachDrop; if (isPieceInside()) pieceY += levelsEachDrop; clearLockTimer();},
      // right
      function () {if (freezeInteraction) return; pieceX += levelsEachDrop; if (isPieceInside()) pieceX -= levelsEachDrop; shiftright = 1; clearLockTimer();},
      // down key calls this -- moves stuff down, if at bottom, locks it
      function () {
        if (freezeInteraction) return;
        pieceY += levelsEachDrop; if (isPieceInside()) { 
          pieceY -= levelsEachDrop;
          fixPiece();	  
        }
        clearLockTimer();
      },
      // rotate clockwise
      function () {
        if (freezeInteraction) return;
        var oldrot = curRotation; 
        curRotation = (curRotation+1)%(tetrominos[curPiece].length);
        if (kick()) curRotation = oldrot; 
        else animRotation = -Math.PI/2.0;
        clearLockTimer();
      },
      // rotate ccw
      function () {
        if (freezeInteraction) return;
        var oldrot = curRotation;
        var len = tetrominos[curPiece].length;
        curRotation = (curRotation-1+len)%len;
        if (kick()) curRotation = oldrot;
        else animRotation = Math.PI/2.0;
        clearLockTimer();
      },
      // hard drop
      function () {
        if (freezeInteraction) return;
        var curY;
        var traversed = 0;
        while(!isPieceInside()) {
          curY = pieceY;
          pieceY++;
          traversed++;
        }
        pieceY = curY;
        dropPiece();
        applyScore(traversed);
        clearLockTimer();
      }, 
      // timer based down
      function () {
        if (freezeInteraction) return;
        pieceY += levelsEachDrop; 
        if (isPieceInside()) { 
          pieceY -= levelsEachDrop; 
          if (lockTimer == "") {
            lockTimer = setTimeout(function(){moves[3]();},600);
          }
        }
      },
    ];
    function clearLockTimer() {
      if (lockTimer != "") {
        clearTimeout(lockTimer);
        lockTimer = "";
      }
    }
    
    var freezeInteraction = false;
    var hardDropTimeout = "";
    // sets up hard drop animation
    function dropPiece () {
      if (hardDropTimeout != "") return; 
      freezeInteraction = true;
      tempNewParticles += 200;
      camera.yvel += 0.1
      hardDropTimeout = setTimeout(function () {freezeInteraction = false; fixPiece(); clearLockTimer(); hardDropTimeout = "";},100);
    }
    
    // left, right
    var shiftorders = [
        [0,0], // initial
        [-1,0],[-1,1],[-1,-1],[0,-1], // col 1 block left; directly above
        [-1,2],[-1,-2], // col 1 block left, two away vertically
        [-2,0],[-2,1],[-2,-1],[-2,2],[-2,-2], // col 2 blocks left
        [0,-2], // directly above, two spaces
        
    //	[0,2], // directly below, two spaces (can cause tunnelling perhaps? one space below certainly is not needed)
    //	[-3,0],[-3,1],[-3,-1],[-3,2],[-3,-2], // col 3 blocks left -- this may be getting cheap
        [1,0],[1,1],[1,-1],[2,0],[2,1],[2,-1],[1,2],[1,-2] // move left for wall kicking
    ];
    var shiftright = 0; // 0 = left, 1 = right
        
    
    // rotation nudge. Attempts to shift piece into a space that fits nearby, if necessary.
    // if such a position is found, it will be moved there. 
    function kick() {
      var i;
      // modify this array to change the order in which shifts are tested. To favor burying pieces into gaps below,
      // place negative y offset entries closer to the front. 
     
      var oldpos = [pieceX,pieceY]; // for simplicity I reuse methods that actually modify piece position.
      for (i=0;i<shiftorders.length;i++) {
        pieceX = oldpos[0]; pieceY = oldpos[1]; // restore position
        if (shiftright) pieceX -= shiftorders[i][0];
        else pieceX += shiftorders[i][0];
        pieceY += shiftorders[i][1];
        if (!isPieceInside())
          return 0;
      }
      pieceX = oldpos[0]; pieceY = oldpos[1]; // restore position
      return 1; // return failure
    }
    
    // will be called from left and right moves, also 
    function updateShadow() {
      var ctx = document.getElementById('board_canvas').getContext('2d');
      drawShadow(ctx);
    }
    
    var repeatRateInitial = 200;
    var repeatRate = 100;
    var repeatIntervals = ["","","",""];
    var repeatInitPassed = [false,false,false,false];
    function setupRepeat(i) {
      if (i < 4) {
        if (repeatIntervals[i] == "") {
          repeatIntervals[i] = setTimeout(
            function () {
              moves[i](); repeatIntervals[i] = setInterval(moves[i], repeatRate); repeatInitPassed[i] = true;
            }, repeatRateInitial
          );
        }
      }
    }
    function stopRepeat(i) {
      if (i<4 && repeatIntervals[i] != "") {
        if (repeatInitPassed[i]){
          clearInterval(repeatIntervals[i]);
        }
        else clearTimeout(repeatIntervals[i]);
        repeatIntervals[i] = "";
      }
    }
    
    var buttonList = [[37,74],[],[39,76],[40,75],[38,73,88,82],[90,84],[68,32],[],[67],[77],[78]];
    var buttonStates = new Array(buttonList.length); for (i=0;i<buttonList.length;++i) buttonStates[i] = 0;
    
    function keydownfunc(e) {   
      var keynum;
      if (!(e.which)) keynum = e.keyCode;
      else if (e.which) keynum = e.which;
      else return;
      var keychar = String.fromCharCode(keynum);
      
      if (keychar == 'P') { 
        if (paused) unPause();
        else { setPause(false); return; }
      }
      if (paused) return;
      
      if (keynum == 16) { // Left Shift
        if (!alreadyHeld) holdFunc();
      }

      var i;
      for (i=0;i<buttonList.length;i++) {
        var j;
        for (j=0;j<buttonList[i].length;j++) {
          if (keynum == buttonList[i][j] && !buttonStates[i]){
            moves[i]();
            stopRepeat(i); // this is insurance
            setupRepeat(i);
            buttonStates[i] = 1;
          }
        }
      }
    }
    
    function keyupfunc(e) {
      var keynum;
      if (!(e.which)) keynum = e.keyCode;
      else if (e.which) keynum = e.which;
      else return;
      var keychar = String.fromCharCode(keynum);
      if (paused) return;
      
      var i;
      for (i=0;i<buttonList.length;i++) {
        var j;
        for (j=0;j<buttonList[i].length;j++) {
          if (keynum == buttonList[i][j]) {
            buttonStates[i] = 0;
            stopRepeat(i);
          }
        }
      }
      
    }
    
    var animPositionX=3;
    var animPositionY=0;
    var animRotation=0;
    function drawPiece(context) {
      var i,j;
      // drawing using geometry of current rotation 
      var tetk = tetrominos[curPiece][curRotation];
      // translating (canvas origin) to the center, 
      // rotating there, then drawing the boxes
      context.save();
      context.fillStyle = colors[curPiece+1];
      var centerX = tet_center_rot[curPiece][0]*(xsize+gapsize)+xsize/2+(!tet_center_rot[curPiece][2])*(xsize/2+gapsize);
      var centerY = tet_center_rot[curPiece][1]*(ysize+gapsize)+ysize/2+(!tet_center_rot[curPiece][2])*(ysize/2+gapsize);
      
      context.translate(xoff + animPositionX*(xsize+gapsize) + centerX,yoff + animPositionY*(ysize+gapsize) + centerY);
      context.rotate(animRotation);
      context.translate(-centerX,-centerY); 
      
      // now in rotated coordinates, zeroed at piece origin
      for (j=0;j<tetk.length;j++) {
        var tetkj = tetk[j];
        for (i=0;i<tetkj.length;i++) {
          var tetkji = tetkj[i];
          if (tetkji) {
            context.fillRect(i*(xsize),j*(ysize),xsize,ysize);
          }
        }
      }
      context.restore();
    }
    
    var shadowY = 0;
    function drawShadow(context) { 
      var curY;
      var count = 0;
      var origY = pieceY;
      while(!isPieceInside()) {
        curY = pieceY;
        pieceY++;
        count++;
      } // This is a little bad --
      // I am modifying critical program state
      // when it is not necessary.
      // This is done to increase code reuse

      // Agreed.. scary
      pieceY = origY; 
      shadowY = curY;
      if (!count) return;
      drawShadowPieceAt(context,pieceX,curY);
    }
    
    function drawShadowPieceAt(context, gridX, gridY) {
      tetk = tetrominos[curPiece][curRotation];
      // context.clearRect(0,0,xoff*2 + xsize*10 + gapsize*9,yoff*2+ysize*24+gapsize*23);  
      context.save();
      context.fillStyle = "#777";
      context.translate(xoff+gridX*(xsize+gapsize),yoff+gridY*(ysize+gapsize));
      for (j=0;j<tetk.length;j++) {
        var tetkj = tetk[j];
        for (i=0;i<tetkj.length;i++) {
          var tetkji = tetkj[i];
          if (tetkji) {
            context.fillRect(i*(xsize+gapsize),j*(ysize+gapsize),xsize,ysize);
          }
        }
      }
      context.restore();
    }
    
    var pausedBecauseLostFocus = false;
    function losefocusfunc() {
      if (paused) return;
      setPause(false);
      pausedBecauseLostFocus = true;
    }
    function gainfocusfunc() {
      if (paused && pausedBecauseLostFocus) {
        unPause();
      }
    }
    var score = 0;
    
    var scoreCallback = function (val) {}; // I get called when score changes. 
    
    function applyScore(amount) {
      score += amount;
      document.getElementById('score').innerHTML = score;
      scoreCallback(score);
    }
    
    document.onkeydown = function (e) { keydownfunc(e); };
    document.onkeyup = function (e) { keyupfunc(e); };
    window.onblur = function () {losefocusfunc(); };
    window.onfocus = function () {gainfocusfunc(); };
    
    window.onselectstart = function(e) { return false; }
    // no IE
    window.onresize = function () { win_onresize(); };
    
    function win_onresize() {
      updateSizing();
    };
    
    // HERE IS THE API
    this.hardMode = (difficulty) => {levelsEachDrop = difficulty}
    this.isPaused = function () { return isPaused(); }; 
    this.setPause = function () { setPause(false); };
    this.unPause = function () { unPause(); }; 
    this.scoreChangeCallback = function (cb) { scoreCallback = cb; };
    
    this.determineLevel = (x) => {determineLevel(x)}

    }; // end TETRIS namespace (this module system is some weirdness I don't yet fully understand but it works and that's all that matters)
    