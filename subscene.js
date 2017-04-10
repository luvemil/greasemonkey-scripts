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

$("#flagWrapper").after(
  '<div>\
    <label>\
      <input type="checkbox" id="langCheckBox">\
      English Only\
    </label>\
    <input id="myFilterQuery" type="text">\
    <label>\
      <input type="checkbox" id="caseInsensitiveBox">\
      Case Insensitive\
    </label>\
    <button id="filterButton" type="button">Filter</button>\
    <button id="clearButton" type="button">Clear</button>\
  </div>'
);
var rows = $("tr").filter(function(ix,el) {
  return $(this).find("span.l").text();
});
var langs = [];
$("tr td.a1 span.l").each(function() {
  lang = $(this).text().trim();
  if( langs.indexOf(lang) == -1 ) {
    langs.push(lang);
  }
});

$("#filterButton").click(function() {
  // Get the regex to search for
  var isValid = true;
  try {
    if($("#caseInsensitiveBox").prop('checked')) {
      var inputRegex = new RegExp($("#myFilterQuery").val(),"i");
    } else {
      var inputRegex = new RegExp($("#myFilterQuery").val());
    }
  } catch(e) {
    isValid = false;
  }

  // Get the status of the checkbox
  filter_lang = $("#langCheckBox").prop('checked');

  rows.hide()
    .filter(function(ix,el) {
      if(!filter_lang) {
        return true;
      }
      return $(this).find("span.l").text().trim() == "English";
    })
    .filter(function(ix,el) {
      if(!isValid) {
        return true;
      }
      return $(this).find("td.a1 a span:nth-child(2)").text().trim().match(inputRegex);
    })
    .show();
});
$("#clearButton").click(function() {
  rows.show();
  // restore the filters to the empy state
  $("#langCheckBox").prop('checked',false);
  $("#caseInsensitiveBox").prop('checked',false);
  $("#myFilterQuery").val("");
});
