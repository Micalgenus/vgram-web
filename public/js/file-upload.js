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
    $('#fileupload').fileupload({
        type: 'POST',
        dropZone: $('#upload1'),
        singleFileUploads: false,
        beforeSend: function (xhr) {
            setHeader(xhr);
        },
    });

    $('#fileupload2').fileupload({
        type: 'POST',
        dropZone: $('#upload2'),
        singleFileUploads: false,
        beforeSend: function (xhr) {
            setHeader(xhr);
        },
    });
});
