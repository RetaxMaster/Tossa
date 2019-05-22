"use strict";

var empty = function empty(string) {
  return string == "";
};

var removeSpecialChars = function removeSpecialChars(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};

var parseUrlName = function parseUrlName(name) {
  return removeSpecialChars(name.toLowerCase().trim().split(" ").join("-"));
};

var putLineBreaks = function putLineBreaks(text) {
  return text.split("\\n").join("<br>");
};