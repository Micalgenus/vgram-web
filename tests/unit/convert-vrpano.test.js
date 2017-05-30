'use strict';

var expect = require('expect.js-extra');
var path = require('path');

describe('modules/convert-vrpano', function () {
   it('creates a vrpano tour', function () {
      var vrpano = require('../../modules/convert-vrpano-promise');
      var currentPath = process.cwd();

      var imagePaths = [
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0008.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0009.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0073.jpg')];
      var folderPath = "sinho0689@gmail.com/123456123456";

      var promise;
      setTimeout(() => {
         promise = vrpano.convertVRPano(imagePaths, folderPath);
      }, 10000);   // 1000ms * 10minute

      return expect(promise).to.fulfill().then(result => {
         expect(result).to.be(0);
      });
   });
});

