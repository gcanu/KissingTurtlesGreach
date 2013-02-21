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
    window.ktDrawBackground(canvas, grid);
    var objects = {
      franklin: {
        role: 'turtle1',
        x: 12,
        y: 2,
        rotation: Math.PI
      },
      emily: {
        role: 'turtle2',
        x: 3,
        y: 10,
        rotation: Math.PI / 2
      },
      tree1: {
        role: 'tree',
        x: 0,
        y: 0,
        rotation: 0
      },
      tree2: {
        role: 'tree',
        x: grid - 1,
        y: grid - 1,
        rotation: 0
      },
      tree3: {
        role: 'tree',
        x: 10.5,
        y: 5.5,
        rotation: Math.PI / 7
      }
    };

    window.ktDrawFrame(canvas, grid, preloaded, objects);

    var animated = {};
    var frames = {};
    var startTime = Date.now();
    var duration = 1000;

    var fnAnimate = function animate() {
        for(var name in animated) {
          if(!frames[name]) { 
            frames[name] = {
              role: animated[name].role,
              x: animated[name].from.x,
              y: animated[name].from.y
            };
          }

          var progress = (Date.now() - startTime) / duration;
  
          frames[name].x = fnAverage(animated[name].from.x, animated[name].to.x, progress);
          frames[name].y = fnAverage(animated[name].from.y, animated[name].to.y, progress);
          console.log(frames[name].x);

          window.ktDrawFrame(canvas, grid, preloaded, frames);
          
          if(progress <= 1)
            window.requestAnimationFrame(fnAnimate);
          else if(animated[name].fn) 
            animated[name].fn();
        }
    };

    var fnAverage = function average(from, to, progress) {
      return from + (to - from) * progress;
    };

    function moveObject(name, object, callback) {
      var obj = objects[name];
      var toX = object.x;
      var toY = object.y;
      
      animated[name] = {
        role: obj.role,
        from: { x: obj.x, y: obj.y },
        to: { x: object.x, y: object.y },
        fn: callback
      };

      window.requestAnimationFrame(fnAnimate);
    }
    return moveObject;
  };
})();
