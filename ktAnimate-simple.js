/**
 * Function that animates towards a frame.
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 * @param preloaded preloaded content.
 **/
window.ktAnimate = (function() {
  return function(canvas, grid, preloaded) {
    var layout = {};

    function draw() {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.ktDrawBackground(canvas, grid);
      window.ktDrawFrame(canvas, grid, preloaded, layout);
    }

    function moveObject(name, object, callback) {
      layout[name] = object;
      draw();
      if (callback) {
        setTimeout(callback, 1000);
      }
    }

    return moveObject;
  };
})();