/**
 * Function that preloads required content.
 *
 * @param roles the role of objects that will be used.
 * @param callback the callback to call on preload end with content.
 **/
window.ktPreload = (function() {
  return function(roles, callback) {
    var r = roles.length;
    var images = {};
    function load(role) {
      var img = new Image();
      img.onload = function () {
        r--;
        if (r === 0) {
          callback(images);
        }
      };
      img.src = 'images/' + role + '.png';
      images[role] = img;
    }
    for (var i = 0; i < roles.length; i++) {
      load(roles[i]);
    }
  };
})();