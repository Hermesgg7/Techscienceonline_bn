'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTeacher = exports.isAdmin = exports.isAuthenticated = undefined;

var _graphqlShield = require('graphql-shield');

var isAuthenticated = exports.isAuthenticated = (0, _graphqlShield.rule)({ cache: 'contextual' })(function (parent, args, _ref, info) {
  var user = _ref.user;
  return !!user;
});

var isAdmin = exports.isAdmin = (0, _graphqlShield.rule)({ cache: 'contextual' })(function (parent, arg, _ref2, info) {
  var user = _ref2.user;
  return !!user && user.roleId == 1;
});

var isTeacher = exports.isTeacher = (0, _graphqlShield.rule)({ cache: 'contextual' })(function (parent, arg, _ref3, info) {
  var user = _ref3.user;
  return !!user && (user.roleId == 2 || user.roleId == 1);
});