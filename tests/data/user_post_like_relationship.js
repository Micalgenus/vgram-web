/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");
var userData = require('./user');
var postData = require('./post');
//------------------------------------------
// user_post_like_relationship table
//------------------------------------------
let likerelationship = [
    // {
    //     user_id: 1,
    //     post_id: 1
    // },
    // {
    //     user_id: 2,
    //     post_id: 1
    // },
    // {
    //     user_id: 3,
    //     post_id: 1
    // },
    // {
    //     user_id: 4,
    //     post_id: 1
    // },
    // {
    //     user_id: 5,
    //     post_id: 1
    // },
    // {
    //     user_id: 6,
    //     post_id: 1
    // },
    // {
    //     user_id: 7,
    //     post_id: 1
    // },
    // {
    //     user_id: 8,
    //     post_id: 1
    // },
    // {
    //     user_id: 9,
    //     post_id: 1
    // },
    // {
    //     user_id: 10,
    //     post_id: 1
    // },
    // {
    //     user_id: 1,
    //     post_id: 2
    // },
    // {
    //     user_id: 1,
    //     post_id: 3
    // }
]
likerelationship = _.map(postData, function (user, i) {

    for (var post of postData) {
       

        
        return {
            user_id: user.ID,
            post_id: post.Id
        };
        if (!_.find(data, tmp)) {
            data.push(tmp);
        }
    }
});

module.exports = likerelationship;