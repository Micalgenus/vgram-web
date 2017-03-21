/**
 * Created by KIMSEONHO on 2017-03-07.
 */
   // 방타입, 전월세여부, 층수에 대한 name-value 추출
const value = require('../../utils/staticValue');
const i18nConverter = require('../../utils/i18n-converter');
const i18n = require('i18n');
const path = require("path");

i18n.configure({
   locales: ['ko-KR', 'en'],
   cookie: 'lang',      //
   directory: path.join(__dirname + '/../../locales'),
   defaultLocale: 'ko-KR',
   api: {
      '__': 'i18n',  //now req.__ becomes req.t
      '__n': 'i18n_n' //and req.__n can be called as req.tn
   }
});

var pairs = i18nConverter.getLangPair(
   {
      placeType: value.placeType,
      roomContractCondition: value.roomContractCondition,
      floors: value.floors
   }, i18n);

console.log(pairs);
