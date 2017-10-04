////////////////////////////////////////////////////////////////////////////////
// Filter object
////////////////////////////////////////////////////////////////////////////////

function Filter(name, func, init, update, imageFile) {
  this.name = name;
  this.func = func;
  this.update = update;
  this.imageFile = imageFile;
  this.sliders = [];
  this.nubs = [];
  init.call(this);
}

Filter.prototype.addSlider = function (name, label, min, max, value, step) {
  this.sliders.push({name: name, label: label, min: min, max: max, value: value, step: step});
};

Filter.prototype.setCode = function (code) {
  eval(code);
};

////////////////////////////////////////////////////////////////////////////////
// Initialization code
////////////////////////////////////////////////////////////////////////////////

var canvas;
var texture;

var initCount = 0, loadCount = 1;
var images = {
  '/images/image.jpg': {credit: 'matthigh', url: 'http://www.flickr.com/photos/matthigh/2125630879/'},
  '/images/lighthouse.jpg': {credit: 'renet', url: 'http://www.flickr.com/photos/renet/12135813/'},
  '/images/perspective.jpg': {credit: 'stuckincustoms', url: 'http://www.flickr.com/photos/stuckincustoms/1213760517/'}
};
for (var file in images) {
  var image = images[file].image = new Image();
  image.onload = init;
  image.src = file;
  loadCount++;
}

$(window).load(init);

function init() {
  // Count the images as they load and only initialize when they are all loaded
  if (++initCount < loadCount) return;

  // Try to get a WebGL canvas
  var placeholder = document.getElementById('placeholder');
  try {
    canvas = fx.canvas();
  } catch (e) {
    placeholder.innerHTML = e;
    return;
  }
  canvas.replace(placeholder);

  // Load the textures
  for (var file in images) {
    images[file].texture = canvas.texture(images[file].image);
  }


// Load the texture from the image and draw it to the canvas
  var filter = filters["Adjust"][0];
  var image = images[filter.imageFile || '/images/image.jpg'];
  texture = image.texture;
  $('#container').css({width: texture._.width, height: texture._.height});
  canvas.draw(image.texture).update();

// Add a row for each slider
  for (var i = 0; i < filter.sliders.length; i++) {
    var slider = filter.sliders[i];
    var onchange = (function (this_, slider) {
      return function (data) {
        this_[slider.name] = data.from;
        this_.update();
      };
    })(filter, slider);

    $('#' + slider.name + '_slider').ionRangeSlider({
      onUpdate: onchange,
      onChange: onchange,
      min: slider.min,
      max: slider.max,
      from: slider.value,
      step: slider.step
    });

    filter[slider.name] = slider.value;
  }

  filter.update();
}

////////////////////////////////////////////////////////////////////////////////
// Filter definitions
////////////////////////////////////////////////////////////////////////////////

var filters = {
  'Adjust': [
    new Filter('Brightness / Contrast', 'brightnessContrast', function () {
      this.addSlider('brightness', 'Brightness', -1, 1, 0, 0.01);
      this.addSlider('contrast', 'Contrast', -1, 1, 0, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).brightnessContrast(' + this.brightness + ', ' + this.contrast + ').update();');
    }),
    new Filter('Hue / Saturation', 'hueSaturation', function () {
      this.addSlider('hue', 'Hue', -1, 1, 0, 0.01);
      this.addSlider('saturation', 'Saturation', -1, 1, 0, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).hueSaturation(' + this.hue + ', ' + this.saturation + ').update();');
    }),
    new Filter('Vibrance', 'vibrance', function () {
      this.addSlider('amount', 'Amount', -1, 1, 0.5, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).vibrance(' + this.amount + ').update();');
    }),
    new Filter('Denoise', 'denoise', function () {
      this.addSlider('exponent', 'Exponent', 0, 50, 20, 1);
    }, function () {
      this.setCode('canvas.draw(texture).denoise(' + this.exponent + ').update();');
    }),
    new Filter('Unsharp Mask', 'unsharpMask', function () {
      this.addSlider('radius', 'Radius', 0, 200, 20, 1);
      this.addSlider('strength', 'Strength', 0, 5, 2, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).unsharpMask(' + this.radius + ', ' + this.strength + ').update();');
    }),
    new Filter('Noise', 'noise', function () {
      this.addSlider('amount', 'Amount', 0, 1, 0.5, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).noise(' + this.amount + ').update();');
    }),
    new Filter('Sepia', 'sepia', function () {
      this.addSlider('amount', 'Amount', 0, 1, 1, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).sepia(' + this.amount + ').update();');
    }),
    new Filter('Vignette', 'vignette', function () {
      this.addSlider('size', 'Size', 0, 1, 0.5, 0.01);
      this.addSlider('amount', 'Amount', 0, 1, 0.5, 0.01);
    }, function () {
      this.setCode('canvas.draw(texture).vignette(' + this.size + ', ' + this.amount + ').update();');
    })
  ]
};
