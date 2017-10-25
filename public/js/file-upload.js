/*
 * jQuery File Upload Plugin JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global $, window */

$(function () {

  var setHeader = function (xhr) {
    xhr.setRequestHeader('Authorization', $.cookie('authorization'));
  };

  // Initialize the jQuery File Upload widget:

  let $vrImageUpload = $('#fileupload');
  let $normalImageUpload = $('#fileupload2');

  let vrImagesList = null;
  let normalImagesList = null;

  $vrImageUpload.fileupload({
    type: 'POST',
    dropZone: $('#upload1'),
    singleFileUploads: true,
    beforeSend: function (xhr) {
      setHeader(xhr);
    },
    added: function (e, data) {
      $(data.context).find("button.edit").magnificPopup({
        items: {
          src: '#modifyImage',
          type: 'inline'
        },
        callback: {
          elementParse: function (item) {

          }
        }
      });

      if (vrImagesList == null) {
        vrImagesList = data;
      } else {
        vrImagesList.context.push(data.context[0]);
        vrImagesList.files.push(data.files[0]);

        $(data.context).find('button.start').off('submit').prop("disabled", true);
      }
    },
    done: function (e, data) {
      $vrImageUpload.find('.template-upload').remove();
    },
    fail: function (e, data) {
      alert('vr images upload fail');
    }
  });

  $normalImageUpload.fileupload({
    type: 'POST',
    dropZone: $('#upload2'),
    singleFileUploads: false,
    beforeSend: function (xhr) {
      setHeader(xhr);
    },
    added: function (e, data) {
      $(data.context).find("button.edit").magnificPopup({
        items: {
          src: '#modifyImage',
          type: 'inline'
        },
        callback: {
          elementParse: function (item) {

          }
        }
      });
      
      if (normalImagesList == null) {
        normalImagesList = data;
      } else {
        normalImagesList.context.push(data.context[0]);
        normalImagesList.files.push(data.files[0]);

        $(data.context).find('button.start').off('submit').prop("disabled", true);
      }
    },
    done: function (e, data) {
      $normalImageUpload.find('.template-upload').remove();
    },
    fail: function (e, data) {
      alert('normal images upload fail');
    },
  });
});