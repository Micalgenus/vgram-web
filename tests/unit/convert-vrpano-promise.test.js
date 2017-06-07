'use strict';

var expect = require('expect.js-extra');
var path = require('path');
const util = require('util');

describe('modules/convert-vrpano', function () {
   it('creates a vrpano tour', function (done) {
      var vrpano = require('../../modules/convert-vrpano-promise');
      var currentPath = process.cwd();

      // var imagePaths = [
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0008.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0009.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0073.jpg')];

      // var imagePaths = [
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0009.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0073.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0074.jpg')];

      // var imagePaths = [
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0073.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0074.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0075.jpg')];

      // var imagePaths = [
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0074.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0075.jpg'),
      //    path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0008.jpg')];

      var imagePaths = [
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0075.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0008.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0009.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0073.jpg')];

      var folderPath = "sinho0689@gmail.com/201705310105";

      var promise = vrpano.convertVRPano(imagePaths, folderPath);
      if (promise) {
         this.timeout(1000 * 1000);     // 1000ms * 1000s
      }

      return promise.then(result => {
         console.log("result : \n", util.inspect(result, false, null));
         expect(result.code).to.be(0);
         return promise.resolve();
      }).then(done);

      // return promise.then(function(result) {
      //   console.log("result : \n", util.inspect(result, false, null));
      //   expect(result).to.be.ok();
      // });
   });
});
