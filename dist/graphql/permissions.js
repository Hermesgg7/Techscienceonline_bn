"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _root = require("./root/root.permission");

var _auth = require("./auth/auth.permission");

var _account = require("./account/account.permission");

var _membership = require("./membership/membership.permission");

var _role = require("./role/role.permission");

var _subject = require("./subject/subject.permission");

var _course = require("./course/course.permission");

var _user = require("./user/user.permission");

var _level = require("./level/level.permission");

var _exam = require("./exam/exam.permission");

var _question = require("./question/question.permission");

var _choice = require("./choice/choice.permission");

var _result = require("./result/result.permission");

var _speech = require("./speech/speech.permission");

var permissions = exports.permissions = {
  Query: _extends({}, _root.permissions.Query, _auth.permissions.Query, _account.permissions.Query, _membership.permissions.Query, _role.permissions.Query, _subject.permissions.Query, _course.permissions.Query, _user.permissions.Query, _level.permissions.Query, _exam.permissions.Query, _question.permissions.Query, _choice.permissions.Query, _result.permissions.Query, _speech.permissions.Query),
  Mutation: _extends({}, _root.permissions.Mutation, _auth.permissions.Mutation, _account.permissions.Mutation, _membership.permissions.Mutation, _role.permissions.Mutation, _subject.permissions.Mutation, _course.permissions.Mutation, _user.permissions.Mutation, _level.permissions.Mutation, _exam.permissions.Mutation, _question.permissions.Mutation, _choice.permissions.Mutation, _result.permissions.Mutation, _speech.permissions.Mutation)
};