'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._publishBook = undefined;

var _orms = require('../orms');

var _publishBook = exports._publishBook = function _publishBook(_ref) {
  var name = _ref.name,
      file = _ref.file,
      text = _ref.text,
      userId = _ref.userId;
  return new Promise(function (resolve) {
    _orms.Book.findOne({ where: { name: name } }).then(function (book) {
      if (!!book) return resolve({ scs: false, msg: 'That title of book already exists' });

      if (!!text) return _orms.Book.create({ name: name, matter: text, userId: userId }).then(function () {
        return resolve({ scs: true, msg: 'Book Published!' });
      });
    });
  });
};