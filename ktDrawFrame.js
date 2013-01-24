/**
 * Function that draws a single frame.
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 * @param preloaded preloaded content.
 * @param objects the objects to draw.
 **/
window.ktDrawFrame = (function() {
  return function(canvas, grid, preloaded, objects) {
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(canvas.width / grid, canvas.height / grid);
    ctx.translate(1/2, 1/2);
    for (var name in objects) {
      if (objects.hasOwnProperty(name)) {
        ctx.save();
        ctx.translate(objects[name].x, grid - 1 - objects[name].y);
        ctx.rotate(- objects[name].rotation);
        ctx.drawImage(preloaded[objects[name].role], -1/2, -1/2, 1, 1);
        ctx.restore();
      }
    }
    ctx.restore();
  };
})();