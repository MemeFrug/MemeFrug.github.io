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
  - After render refactor, shadow sometimes flickers over animated tetrinome
  - Weird issue with stack overcalled??? when hard dropping need more testing
*/

// Changes,
// - Removed mobile functionality (just wanted to simplify)
// - Added mobile compatability screen
// - Improved user interface w/ See next UI element
// - Increasing Level
// - Win at Level 255
// - Each level increases speed
// - Checkpoints???

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
    let currentLinesCleared = 0
    let level = 0

    let moveDownSpeed = 300 // milliseconds

    var board = [];
    var i=0;
    for (i=0;i<240;i++) {
        board[i] = 0;
    }
    var xoff = 8;
    var yoff = 8;
    var xsize = 15;
    var ysize = 15;
    var gapsize = 2;
    var bordersize = 2;
    // white, red, green, blue, purple, yellow, orange, cyan
    // None,  Z,   S,     J,    T,      O,      L,      I
    var colors = ["#FFFFFF","#F00","#0F0",
                  "#22F","#F0F", "#FF0",
                  "#F70","#0EE"];
    
    function drawTetrinome(posX,posY,value,context) {
      context.fillStyle = colors[value];
      context.fillRect(xoff + posX*(xsize+gapsize), yoff+posY*(ysize+gapsize),xsize,ysize);
    }
    function drawBoard(boardArr, context) {
      var i;
      // context.fillStyle = "#000";
      // context.fillRect(0,0,xoff*2 + xsize*10 + gapsize*9,yoff*2+ysize*24+gapsize*23);
      context.clearRect(0,0,(xsize+gapsize)*11,(ysize+gapsize)*25);
      // context.strokeRect(0,0,xoff*2 + xsize*10 + gapsize*9,yoff*2+ysize*24+gapsize*23);
      context.fillStyle = "rgba(0,0,0,0.2)";
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
      // const linesRequired = level * 2 // Not official
      // document.getElementById("linesToClear").textContent = linesRequired
      // if (linesRequired<=currentLinesCleared + clearedLines) {
      //   level = level + 1;
      //   console.log(currentLinesCleared, linesRequired);
      //   currentLinesCleared = Math.max(currentLinesCleared-linesRequired, 0) 
      //   document.getElementById("level").textContent = level
        
      //   // Update the level's down speed
      //   moveDownSpeed = level*-2 + 300


      //   determineLevel() // Check for left overs
      //   return true
      // }
      // //Add to current lines cleared
      // document.getElementById("linesToClear").textContent = linesRequired-currentLinesCleared
      // return false
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
        if (full) { numRowsCleared++; shiftDown(startrow+i);  var ctx1 = document.getElementById('board_canvas').getContext('2d'); drawBoard(board,ctx1);}
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
    
  
    let mainCanvasContext = undefined

    var autoMoveDownInterval = "";
    var animationUpdateInterval = false;
    var mouseControlInterval = "";
    function moveDownIntervalFunc () {
      moves[7]();
    } 
    let lastTime = 0
    function animationUpdateIntervalFunc(totalTime) {
      const dt = totalTime-lastTime
      lastTime = totalTime

      if (!mainCanvasContext) {
        const mainCanvas = document.getElementById('board_canvas')
        mainCanvasContext = mainCanvas.getContext('2d')
      }

      // Redraw the board
      drawBoard(board, mainCanvasContext);
      updateShadow();

      // move animPositions closer to their targets (piece positions)
      animPositionX += (pieceX - animPositionX)*.01*dt;
      animPositionY += (pieceY - animPositionY)*.01*dt;
      // move animRotation closer to zero
      animRotation -= animRotation * 0.015 * dt;
      drawPiece(mainCanvasContext);
      if (animationUpdateInterval) requestAnimationFrame(animationUpdateIntervalFunc)
    }
    function mouseControlFunc() {}
    var isMouseControl = false;
    var mouseControlX = 0; // use this to draw helper arrow
    function toggleMouseControl () {
      if (isMouseControl) { mouseControlFunc = function () {}; document.oncontextmenu = null; } 
      else {mouseControlFunc = function () {
          mouseControlX = (posx / window.innerWidth)*11.5-2.5;
          if (pieceX > mouseControlX+.5) moves[0](); 
          if (pieceX < mouseControlX-.5) moves[2]();
      };
      document.oncontextmenu = function () { return false; };  
      }
      isMouseControl = !isMouseControl;
    }
    
    var paused = false;
    function isPaused() {
        return paused;
    }
    
    var setPause = function(isendgame) {
      //console.log("setPause invoked", paused);
      if (paused) return;
      clearInterval(autoMoveDownInterval); 
      autoMoveDownInterval = "";
      animationUpdateInterval = false;
      clearInterval(mouseControlInterval);
      mouseControlInterval = "";

      paused = true;
      pausedBecauseLostFocus = false; // default this to false
       
      document.getElementById("pauseText").textContent = "Paused"
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
      if (mouseControlInterval == "") {
        mouseControlInterval = setInterval(mouseControlFunc,100); //function indirection
      }
      paused = false;
      pausedBecauseLostFocus = false; // default this to false
      //Clear pause text
      document.getElementById("pauseText").textContent = ""
    }
    

    window.onload = function () { win_onload(); }; 
    
    function win_onload() {
      next();
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
    var tetromino_I = [[[],[7,7,7,7]],[[0,0,7],[0,0,7],[0,0,7],[0,0,7]],[[],[],[7,7,7,7]],[[0,7],[0,7],[0,7],[0,7]]];
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
    
    
    // function drawMessage(messageString, size) {
    //   var ctx = document.getElementById("board_canvas").getContext('2d');
    //   var offset = xoff;
    //   var size = (xsize +gapsize*.9)*size;
    //   var yoffset = yoff + (xsize+gapsize)*10;
    //   ctx.strokeStyle = "#FFF";
    //   ctx.strokeText(messageString,offset,yoffset,size,160);
    //   ctx.strokeStyle = "#000";
    //   ctx.strokeText(messageString,offset,yoffset,size,100);
    // }
    
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
      // drawMessage("You Win!", 1.45);
      setPause(true);
    }
    function gameOver() {
      // drawMessage("Game Over", 1.45);
      setPause(true);
      //Cleanup
      
    }
    
    var objPos = {x:0, y:0};
    var lockTimer = "";
    var generator = random_perm_single(Math.floor((new Date()).getTime() / 1000));
    function next() {
      pieceX = 3;
      pieceY = 0;
      animPositionX = pieceX;
      animPositionY = pieceY;
      curRotation = 0;
      curPiece = generator();
      if (kick()) {
        gameOver();
      }
      // updateShadow();
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
      drawBoard(board,document.getElementById('board_canvas').getContext('2d'));
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
      function () {if (freezeInteraction) return; pieceX -= 1; if (isPieceInside()) pieceX += 1; shiftright = 0; clearLockTimer();},
      // up direction movement is a cheat in standard tetris
      function () {if (freezeInteraction) return; pieceY -= 1; if (isPieceInside()) pieceY += 1; clearLockTimer();},
      // right
      function () {if (freezeInteraction) return; pieceX += 1; if (isPieceInside()) pieceX -= 1; shiftright = 1; clearLockTimer();},
      // down key calls this -- moves stuff down, if at bottom, locks it
      function () {
        if (freezeInteraction) return;
        pieceY += 1; if (isPieceInside()) { 
          pieceY -= 1;
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
        pieceY += 1; 
        if (isPieceInside()) { 
          pieceY -= 1; 
          if (lockTimer == "") {
            lockTimer = setTimeout(function(){moves[3]();},600);
          }
        }
      },
      // hold feature
      function () {
        //alert("hold unimplemented.");
      }, 
      function () {
        toggleMouseControl();
      },
      function () {
        drawIndicators = !drawIndicators;
      }
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
    
    //var directionalButtonStates = [0,0,0,0]; // left up right down
    //var rotationButtonStates = [0,0] // cw, ccw
    //var dropButtonState = 0;
    //var holdButtonState = 0; 
    // these variables keep track of button state in order to customize
    // key repeat rates
    
    function keydownfunc(e) {   
      var keynum;
      if (!(e.which)) keynum = e.keyCode;
      else if (e.which) keynum = e.which;
      else return;
      var keychar = String.fromCharCode(keynum);
      //document.title = keynum;
      
      if (keychar == 'P') { 
        if (paused) unPause();
        else { setPause(false); return; }
      }
      if (paused) return;
      
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

    var drawIndicators = false;
    function drawPiece(context) {
      var i,j;
      // drawing using geometry of current rotation 
      var tetk = tetrominos[curPiece][curRotation];
      // translating (canvas origin) to the center, 
      // rotating there, then drawing the boxes
      if (isMouseControl && drawIndicators) {
        context.save();
        context.translate(xoff + (xsize+gapsize) * (mouseControlX+1.5),yoff);
        
        context.fillStyle = "rgba(0,0,255,"+(Math.abs((mouseControlX) - Math.floor(mouseControlX+0.5)) * 0.2 + 0.2)+")";
        context.fillRect(-xsize/4,0,xsize/2,ysize*24 + gapsize*23);
        context.restore();
      }
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
            context.fillRect(i*(xsize+gapsize),j*(ysize+gapsize),xsize,ysize);
          }
        }
      }
      context.restore();
      if (isMouseControl && drawIndicators) {
          context.save();
          context.translate(xoff+(animPositionX+1.5)*(xsize+gapsize),yoff);
          context.fillStyle = "rgba(255,0,0,0.3)";
          context.fillRect(-xsize/4,0,xsize/2,ysize*24+gapsize*23);
          context.restore();
      }
      
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
    
    var posx=0;
    var posy=0;
    function mousemovefunc(e) {
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) 	{
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
      if (!paused)
        mouseControlFunc();
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
    function mousedownfunc(e) { 
      if (isMouseControl) {
      if (e.which == 1) {
        moves[4]();
      }
      else if (e.which == 3) {
        moves[6]();
      }
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
    document.onmousemove = function (e) { mousemovefunc(e); };
    window.onblur = function () {losefocusfunc(); };
    window.onfocus = function () {gainfocusfunc(); };
    document.onmousedown = function (e) {mousedownfunc(e); };
    
    window.onselectstart = function(e) { return false; }
    // no IE
    window.onresize = function () { win_onresize(); };
    
    function win_onresize() {
      updateSizing();
    };
    
    // HERE IS THE API
    
    this.isPaused = function () { return isPaused(); }; 
    this.setPause = function () { setPause(false); };
    this.unPause = function () { unPause(); }; 
    this.scoreChangeCallback = function (cb) { scoreCallback = cb; };
    
    }; // end TETRIS namespace (this module system is some weirdness I don't yet fully understand but it works and that's all that matters)
    