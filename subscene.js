// ==UserScript==
// @name        SubScene
// @namespace   www.subscene.com
// @description Add filter to subscene searches
// @include     https://*subscene.com/subtitles/*
// @exclude     https://*subscene.com/subtitles/title?q*
// @exclude     https://*subscene.com/subtitles/*/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
$("#flagWrapper").after('<div><input type="text"><button id="mytoggle" type="button">Toggle</button></div>');
$("#mytoggle").click(function() {
  $("tr").each(function() {
    var lang_node = $(this).find("span.l")[0];
    if(lang_node) {
      var Lang = lang_node.innerText;
      if(Lang != "English") {
        $(this).toggle();
      }
    }
  });
});
