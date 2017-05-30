'use strict';

var expect = require('expect.js-extra');
var path = require('path');
const util = require('util');

describe('modules/convert-vrpano', function () {
   it('creates a vrpano tour', function (done) {
      var vrpano = require('../../modules/convert-vrpano-promise');
      var currentPath = process.cwd();

      var imagePaths = [
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0008.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0009.jpg'),
         path.join(currentPath, 'resources/medias/vrimages/sinho0689@gmail.com/SAM_100_0073.jpg')];
      var folderPath = "sinho0689@gmail.com/convertvrpanotest";

      var promise = vrpano.convertVRPano(imagePaths, folderPath);
      // if (promise) {
      //    this.timeout(1000 * 1000);     // 1000ms * 100s
      // }

      return expect(promise).to.fulfill().then(result => {
         console.log("result : \n", util.inspect(result, false, null));
         return expect(result.code).to.be(0);
      });

      // return promise.then(function(result) {
      //   console.log("result : \n", util.inspect(result, false, null));
      //   expect(result).to.be.ok();
      // });
   });
});
