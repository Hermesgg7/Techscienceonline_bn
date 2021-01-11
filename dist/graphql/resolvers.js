"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _root = require("./root/root.resolver");

var _auth = require("./auth/auth.resolver");

var _account = require("./account/account.resolver");

var _membership = require("./membership/membership.resolver");

var _role = require("./role/role.resolver");

var _subject = require("./subject/subject.resolver");

var _course = require("./course/course.resolver");

var _user = require("./user/user.resolver");

var _level = require("./level/level.resolver");

var _exam = require("./exam/exam.resolver");

var _question = require("./question/question.resolver");

var _choice = require("./choice/choice.resolver");

var _result = require("./result/result.resolver");

var resolvers = exports.resolvers = [_root.resolvers, _auth.resolvers, _account.resolvers, _membership.resolvers, _role.resolvers, _subject.resolvers, _course.resolvers, _user.resolvers, _level.resolvers, _exam.resolvers, _question.resolvers, _choice.resolvers, _result.resolvers];