console.log('Copyrighted by Max Knight');

var loaded = false;

window.onresize = function(e){
    console.log(e.currentTarget.devicePixelRatio)
    // 0.5 is equal to 50%
    // 1 to 100%
    // 2 to 200%
    // so on and so forth
  }

function Main(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    character.update(deltaTime)
    ctx.clearRect(0,0,1000,1000)
    bush.draw(ctx)
    character.draw(ctx)
    requestAnimationFrame(Main)
}
setInterval(function () {
    if (isautosaveon == true) {
        //PUT SAVING CODE HERE
    }
},60000)