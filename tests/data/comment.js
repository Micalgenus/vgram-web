"use strict";

/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
var _ = require('lodash');

var userData = require("./user");
var postData = require("./post");
moment.locale("ko");

//------------------------------------------
// post table
//------------------------------------------
var data = [];


var testContent = [
   "hello?",
   "good입니다~",
   "댓글 테스트중입니다.",
   "This will add the attribute projectId or project_id to User. Instances of Project will get the accessors getWorkers and setWorkers.",
   "가나다라마바사아자차카타파하 가나다라마바사아자차카타파하 가나다라마바사아자차카타파하 가나다라마바사아자차카타파하",
   '<pre><code class="js hljs javascript">Project.belongsToMany(User, {through: <span class="hljs-string">UserProject</span>})User.belongsToMany(Project, {through: <span class="hljs-string">UserProject</span>});</code></pre>'];

for (let i = 0; i < postData.length; i++) {  // comment 관련 test 데이터 30개 생성
   for(let j = 0; j < userData.length; j++) {
      var comment = {
         post_id: postData[i].ID,
         user_id: userData[j].ID,
         parent_comment_id: null,
         content: testContent[j%testContent.length],
         like: Math.floor(Math.random() * 10) + 1,
         createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
      };

      data.push(comment);
   }
}

module.exports = data;
