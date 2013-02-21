/**
 * Function that draws the background.
 *
 * Help:
 *
 * canvas.getContext('2d')
 * ctx.beginPath()
 * ctx.fillStyle/strokeStyle = 'red' | 'rgb(250, 30, 120)' | 'rgba(250, 30, 120, 0.5)'
 * ctx.lineWidth = 3
 * ctx.moveTo(x, y)
 * ctx.lineTo(x, y)
 * ctx.closePath()
 * ctx.fill()
 * ctx.stroke()
 * ctx.rect(x, y, w, h)
 * ctx.arc(x, y, r, startangle, endangle)
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 **/
window.ktDrawBackground = (function() {
  return function(canvas, grid) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.stroke();

    var w = canvas.width / grid;
    var h = canvas.height / grid;
    var color = [
       'red', 'blue'
    ];
    var c=0;

    for (var i = 0; i < grid; i++) {
      for (var j = 0; j < grid; j++) {
        ctx.beginPath();
        ctx.fillStyle = ctx.strokeStyle = color[c%2];
        ctx.rect(w*i, h*j, w, h);
        ctx.fill();
        ctx.stroke();
        c++;
      }
    }
  };
})();