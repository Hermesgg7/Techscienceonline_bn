'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Web = _express2.default.Router();

Web.get('/*', function (req, res, next) {
  if (req.originalUrl.startsWith('/api')) return next();

  if (req.originalUrl.startsWith('/techscratch')) return res.sendFile((0, _path.join)(__dirname, '../../public/tech'));

  return res.sendFile((0, _path.join)(__dirname, '../../public/main/index.html'));
});

exports.default = Web;