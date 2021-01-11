'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyResetToken = exports.verifyToken = exports.makeToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var makeToken = exports.makeToken = function makeToken(_ref) {
  var payload = _ref.payload,
      expiresIn = _ref.expiresIn;

  var token = (0, _jsonwebtoken.sign)(payload, process.env.APP_KEY, !!expiresIn ? { expiresIn: expiresIn } : null);
  return token;
};

var verifyToken = exports.verifyToken = function verifyToken(req) {
  var parts = req.headers.authorization ? req.headers.authorization.split(' ') : [''];
  var token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : undefined;
  var user = undefined;

  if (!!token) {
    try {
      user = (0, _jsonwebtoken.verify)(token, process.env.APP_KEY);
    } catch (err) {
      user = undefined;
    }
  }

  return user;
};

var verifyResetToken = exports.verifyResetToken = function verifyResetToken(resetToken) {
  var userEmail = undefined;

  if (!resetToken) return userEmail;

  try {
    var _verify = (0, _jsonwebtoken.verify)(resetToken, process.env.APP_KEY),
        email = _verify.email;

    userEmail = email;
  } catch (err) {
    userEmail = undefined;
  }

  return userEmail;
};