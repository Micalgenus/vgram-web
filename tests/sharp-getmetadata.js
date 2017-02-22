/**
 * Created by KIMSEONHO on 2017-02-17.
 */
const sharp = require("sharp");
const util = require("util");
const inputJpg = "./resources/medias/vrimages/SAM_100_0008.jpg";

const image = sharp(inputJpg);
image
   .metadata()
   .then(function(metadata) {
      console.log(metadata.format);
      console.log(metadata.orientation);
      console.log(util.inspect(metadata.exif, {showHidden: false, depth: null}));
      console.log(util.inspect(metadata, {showHidden: false, depth: null}));

      return image
         .resize(Math.round(metadata.width / 2))
         .webp()
         .toBuffer();
   })
   .then(function(data) {
      // data contains a WebP image half the width and height of the original JPEG
   });
