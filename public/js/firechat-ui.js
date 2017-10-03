/**
 * firechat custom UI - public/template/firechat 참고
 */

this["FirechatDefaultTemplates"] = this["FirechatDefaultTemplates"] || {};

this["FirechatDefaultTemplates"]["templates/layout-full.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  __p += new EJS({url: '/template/firechat/layout-full.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/layout-popout.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  __p += new EJS({url: '/template/firechat/layout-popout.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/message-context-menu.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.id = __e(obj.id);
  __p += new EJS({url: '/template/firechat/message-context-menu.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/message.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.type = __e(obj.type);
  obj.id = __e(obj.id);
  obj.userId = __e(obj.userId);
  obj.name = __e(obj.name);
  obj.localtime = __e(obj.localtime);
  obj.message = ((__t = ( obj.message )) == null ? '' : __t);

  __p += new EJS({url: '/template/firechat/message.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt-alert.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.message = __e(message);
  __p += new EJS({url: '/template/firechat/prompt-alert.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt-create-room.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.maxLengthRoomName = __e(obj.maxLengthRoomName);
  __p += new EJS({url: '/template/firechat/prompt-create-room.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt-invitation.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.fromUserName = __e(obj.fromUserName);
  obj.toRoomName = __e(obj.toRoomName);
  __p += new EJS({url: '/template/firechat/prompt-invitation.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt-invite-private.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.userName = __e(obj.userName);
  obj.roomName = __e(obj.roomName);
  __p += new EJS({url: '/template/firechat/prompt-invite-private.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt-invite-reply.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.toUserName = __e(obj.toUserName);
  __p += new EJS({url: '/template/firechat/prompt-invite-reply.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt-user-mute.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.userName = __e(obj.userName);
  __p += new EJS({url: '/template/firechat/prompt-user-mute.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/prompt.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.title = __e(obj.title);
  obj.content = ((__t = ( obj.content )) == null ? '' : __t);
  __p += new EJS({url: '/template/firechat/prompt.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/room-list-item.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.type = __e(obj.type);
  obj.id = __e(obj.id);
  obj.name = __e(obj.name);

  __p += new EJS({url: '/template/firechat/room-list-item.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/room-user-list-item.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.id = __e(obj.id);
  obj.name = __e(obj.name);

  __p += new EJS({url: '/template/firechat/room-user-list-item.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/room-user-search-list-item.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.id = __e(obj.id);
  obj.name = __e(obj.name);

  __p += new EJS({url: '/template/firechat/room-user-search-list-item.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/tab-content.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.id = __e(obj.id);
  __p += new EJS({url: '/template/firechat/tab-content.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/tab-menu-item.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape;

  obj.id = __e(obj.id);
  obj.name = __e(obj.name);
  __p += new EJS({url: '/template/firechat/tab-menu-item.ejs'}).render(obj);

  return __p;
};

this["FirechatDefaultTemplates"]["templates/user-search-list-item.html"] = function (obj) {
  obj || (obj = {});
  var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

  function print() {
    __p += __j.call(arguments, '')
  }

  obj.id = __e(obj.id);
  obj.name = __e(obj.name);
  __p += new EJS({url: '/template/firechat/user-search-list-item.ejs'}).render(obj);

  return __p;
};
