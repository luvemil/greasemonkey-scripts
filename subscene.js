// ==UserScript==
// @name        SubScene Filter
// @namespace   www.subscene.com
// @description Add filter to subscene searches
// @include     https://*subscene.com/subtitles/*
// @exclude     https://*subscene.com/subtitles/title?q*
// @exclude     https://*subscene.com/subtitles/*/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
$("#flagWrapper").after('<div><input id="myfilterquery" type="text"><button id="mytoggle" type="button">Toggle</button></div>');
var rows = $("tr").filter(function(ix,el) {
  return $(this).find("span.l").text();
});
$("#mytoggle").click(function() {
  rows.filter(function(ix,el) {
    return $(this).find("span.l").text().trim() != "English";
  })
    .hide();
});
$("#myfilterquery").submit(function() {
  var isValid = true;
  try {
    var inputRegex = new RegExp($(this).val());
  } catch(e) {
    isValid = false;
  }

  if(!isValid) {
    window.console.log("Regex not valid");
    return $(this);
  }

  rows.filter(function(ix,el) {
    return ! $(this).children("td.a1 a span:nth-child(2)").text().trim().match(inputRegex);
  })
    .hide();
});
