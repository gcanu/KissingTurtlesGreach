/**
 * Function that draws the background.
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 **/
window.ktDrawBackground = (function() {
  return function(canvas, grid) {
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < grid; i++) {
      for (var j = 0; j < grid; j++) {
        ctx.beginPath();
        ctx.fillStyle = ((i + j) % 2 === 0) ? 'rgba(30, 130, 30, 0.8)' : 'rgba(30, 30, 230, 0.8)';
        ctx.rect(i * canvas.width / grid, j * canvas.height / grid, canvas.width / grid, canvas.height / grid);
        ctx.fill();
      }
    }
  };
})();