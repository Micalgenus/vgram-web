/**
 * Created by KIMSEONHO on 2017-10-30.
 */
exports.viewChatByMember = function (req, res) {

  const targetId = req.params.userId;

  if (targetId == req.user.ID)
    return res.redirect('/message');

  return User.findOne({
    where: {
      ID: targetId,
    }
  }).then(function (u) {
    if (!u) {
      req.flash('msg', 'not found user');
      return res.redirect('back');
    }

    // create Room and invite user

    // var firebaseRef = firebase.database().ref("firechat");
    // var chat = new Firechat(firebaseRef);
    // chat.setUser(userId, userName, function(user) {
    //   chat.resumeSession();
    // });

    req.flash('messageId', u.auth0_user_id);
    return res.redirect('/message');
  });
}

exports.inviteUserToRoom = function (req, res) {
  const targetId = req.params.userId;
  const roomId = req.params.roomId;

  return firebase.inviteUserToRoom(targetId, roomId).then(function () {
    return res.send('OK');
  });
}
