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
var rows = $("tr").filter(function(ix,el) {
  return $(this).find("span.l").text();
});
$("#mytoggle").click(function() {
  rows.filter(function(ix,el) {
    return $(this).find("span.l").text().trim() != "English";
  })
    .hide();
});
