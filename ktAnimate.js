/**
 * Function that animates towards a frame.
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 * @param preloaded preloaded content.
 **/
window.ktAnimate = (function() {
  return function(canvas, grid, preloaded) {

    function average(from, to, progress) {
      return from + (to - from) * progress;
    }

    var duration = 1000;
    var current = {};
    var animated = {};
    function animate() {
      var name;
      var cont = false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.ktDrawBackground(canvas, grid);
      var frame = {};
      for (name in animated) {
        if (animated.hasOwnProperty(name)) {
          var to = animated[name];
          var from = current[name];
          var progress = (Date.now() - to.startTime) / duration;
          if (progress > 1) {
            current[name] = {
              role: to.role,
              x: to.x,
              y: to.y,
              rotation: to.rotation
            };
            delete animated[name];
            if (to.cb) {
              to.cb();
            }
          } else {
            cont = true;
            frame[name] = {
              role: to.role,
              x: average(from.x, to.x, progress),
              y: average(from.y, to.y, progress),
              rotation: average(from.rotation, to.rotation, progress)
            };
          }
        }
      }
      for (name in current) {
        if (current.hasOwnProperty(name) && !animated[name]) {
          frame[name] = current[name];
        }
      }
      window.ktDrawFrame(canvas, grid, preloaded, frame);
      if (cont) {
        window.requestAnimationFrame(animate);
      }
    }

    function moveObject(name, object, callback) {
      if (!current[name]) {
        current[name] = object;
        animate();
        callback();
      } else {
        object.startTime = Date.now();
        object.cb = callback;
        animated[name] = object;
        animate();
      }
    }

    return moveObject;
  };
})();