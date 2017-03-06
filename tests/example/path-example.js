/**
 * Created by KIMSEONHO on 2017-03-06.
 */
const path = require("path");

const rootPath = path.normalize(__dirname + '/../..');
const appRootPath = require('app-root-path');    // process.env.APP_ROOT_PATH

console.log("rootPath : " + rootPath);
console.log("APP_ROOT_PATH : " + appRootPath);
