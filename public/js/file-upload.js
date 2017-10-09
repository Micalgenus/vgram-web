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

    $vrImageUpload.fileupload({
        type: 'POST',
        dropZone: $('#upload1'),
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
          // $(data.context).find("button.edit").click(function() {
          //   $(".edit-modal-lg").modal();
          // });
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
        // $(data.context).find("button.edit").click(function() {
        //   $(".edit-modal-lg").modal();
        // });
      },
        done: function (e, data) {
            $normalImageUpload.find('.template-upload').remove();
        },
        fail: function (e, data) {
            alert('normal images upload fail');
        },
    });
});
