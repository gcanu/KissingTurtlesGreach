/**
 * Function that animates towards a frame.
 *
 * Help:
 *
 * canvas.getContext('2d')
 * ctx.beginPath()
 * ctx.fillStyle/strokeStyle = 'red' | 'rgb(250, 30, 120)' | 'rgba(250, 30, 120, 0.5)'
 * ctx.linveWidth = 3
 * ctx.moveTo(x, y)
 * ctx.lineTo(x, y)
 * ctx.closePath()
 * ctx.fill()
 * ctx.stroke()
 * ctx.rect(x, y, w, h)
 * ctx.arc(x, y, r, startangle, endangle)
 * ctx.save()
 * ctx.restore()
 * ctx.translate(x, y)
 * ctx.scale(sx, sy)
 * ctx.rotate(a)
 * ctx.drawImage(img, x, y, w, h)
 *
 * ctx.clearRect(x, y, w, h)
 * window.ktDrawBackground(canvas, grid)
 * window.ktDrawFrame(canvas, grid, preloaded, objects)
 * window.requestAnimationFrame(fn)
 * Date.now()
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 * @param preloaded preloaded content.
 **/
window.ktAnimate = (function() {
  return function(canvas, grid, preloaded) {
    // TODO
    function moveObject(name, object, callback) {
      //TODO
    }
    return moveObject;
  };
})();
