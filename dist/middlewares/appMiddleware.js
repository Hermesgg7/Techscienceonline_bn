'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _expressCspHeader = require('express-csp-header');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppMiddleware = new _express2.default();

AppMiddleware.use(_bodyParser2.default.json());
AppMiddleware.use(_bodyParser2.default.urlencoded({ extended: false }));
AppMiddleware.use((0, _cors2.default)());
AppMiddleware.use((0, _helmet2.default)());
AppMiddleware.use((0, _expressCspHeader.expressCspHeader)({
  directives: {
    'default-src': [_expressCspHeader.SELF],
    'script-src': [_expressCspHeader.SELF, _expressCspHeader.INLINE, _expressCspHeader.EVAL,, '*.com', '*.net'],
    'style-src': [_expressCspHeader.SELF, _expressCspHeader.INLINE, '*.com', '*.net'],
    'style-src-elem': [_expressCspHeader.SELF, _expressCspHeader.INLINE, '*.com', '*.net'],
    'img-src': [_expressCspHeader.SELF, '*.com', '*.net', _expressCspHeader.DATA, _expressCspHeader.BLOB],
    'font-src': [_expressCspHeader.SELF, 'fonts.gstatic.com', _expressCspHeader.DATA, _expressCspHeader.BLOB],
    'connect-src': [_expressCspHeader.SELF, '*.com', '*.net']
  }
}));

exports.default = AppMiddleware;