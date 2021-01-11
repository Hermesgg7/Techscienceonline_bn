"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parseJson = exports.parseJson = function parseJson(str) {
  var obj = {};

  if (!str) return obj;

  try {
    obj = JSON.parse(str);
  } catch (error) {
    obj = {};
  }
  return obj;
};