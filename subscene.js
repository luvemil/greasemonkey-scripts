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
    <select id="langChoice">\
      <option id="langDefault" value="">All</option>\
    </select>\
    <input id="myFilterQuery" type="text">\
    <label>\
      <input type="checkbox" id="caseInsensitiveBox">\
      Case Insensitive\
    </label>\
    <select id="earChoice">\
      <option id="earDefault" value="">Any</option>\
      <option value="hi">HI</option>\
      <option value="nohi">No HI</option>\
    </select>\
    <select id="authorChoice">\
      <option id="authorDefault" value="">Any</option>\
    </select>\
    <button id="filterButton" type="button">Filter</button>\
    <button id="clearButton" type="button">Clear</button>\
  </div>'
);
var rows = $("tr").filter(function(ix,el) {
  return $(this).find("span.l").text();
});
var filtered = rows;
var visibles = rows;

var langs = [];
$("tr td.a1 span.l").each(function() {
  lang = $(this).text().trim();
  if( langs.indexOf(lang) == -1 ) {
    langs.push(lang);
  }
});
var el = $("#langChoice");
$.each(langs, function(key,value) {
  el.append($("<option></option>")
      .attr("value",value).text(value));
});

var authors = [];
/* TODO:
 *  - populate authors
 *  - update author selection "#authorChoice"
 */

var authorsPopulate = function() {
  authors = [];
  filtered.find("td.a5").each(function() {
    author = $(this).text().trim();
    if( authors.indexOf(author) == -1 ) {
      authors.push(author);
    }
  });
};

var updateAuthorChoice = function() {
  $("#authorChoice option:gt(0)").remove();
  var el = $("#authorChoice");
  $.each(authors,function(key, value) {
    el.append($("<option></option>")
      .attr("value",value).text(value));
  });
}

var render = function() {
  rows.hide();
  filtered.show();
};

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

  // Get the language filter params
  do_filter = $("#langChoice").val() != "";
  var filter_lang = $("#langChoice").val();

  // Get the hearing impairment filter params
  do_hi = $("#earChoice").val() != "";
  var filter_hi = $("#earChoice").val();
  if(filter_hi == "hi") {
    var hi_class = "a41";
  } else if (filter_hi == "nohi") {
    var hi_class = "a40";
  }

  filtered = rows.filter(function(ix,el) {
      if(!do_filter) {
        return true;
      }
      return $(this).find("span.l").text().trim() == filter_lang;
    })
    .filter(function(ix,el) {
      if(!isValid) {
        return true;
      }
      return $(this).find("td.a1 a span:nth-child(2)").text().trim().match(inputRegex);
    })
    .filter(function(ix,el) {
      if(!do_hi) {
        return true;
      }
      return $(this).find("td:nth-child(3)").attr('class') == hi_class;
    });

  render();
});
$("#clearButton").click(function() {
  filtered = visibles = rows;
  render();

  // restore the filters to the empy state
  $("#langChoice").val($("#langDefault").val());
  $("#earChoice").val($("#earDefault").val());
  $("#caseInsensitiveBox").prop('checked',false);
  $("#myFilterQuery").val("");
});
