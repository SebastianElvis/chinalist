// ==UserScript==
// @name TTGBonusSignIn
// @namespace   https://github.com/gythialy
// @include http://totheglory.im/*
// @include https://totheglory.im/*
// @version 0.1
// @require http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @grant none
// ==/UserScript==
(function() {

    var signLink = $("#signed");
    // console.log($('#sp_signed').text());

    if (signLink && $('#sp_signed').text() === "签到") {
        var ss = $("script:not([src])")

        for (var index = 0, len = ss.length; index < len; ++index) {
            //get the time_stamp and token for later use.
            var ma = /signed_timestamp: "(\d+)", signed_token: "([\da-f]+)"/g.exec(ss[index].textContent);
            if (ma) {
                //console.log(ma[0]);
                var siPostData = {
                    signed_timestamp: ma[1],
                    signed_token: ma[2]
                };
                $.post(document.location.origin + "/signed.php", siPostData, function(data) {
                    $('#sp_signed').html("<b style=\"color:green;\">已签到</b>");
                    var sp = $('<span/>').html(data);
                    var ap = $('a[href="/mybonus.php"]').append(sp);
                    //alert(data);
                });
                break;
            }
        }
    }
})();
