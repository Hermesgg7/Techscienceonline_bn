"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = undefined;

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

var _speech = require("./speech/speech.resolver");

var _content = require("./content/content.resolver");

var typeDefs = exports.typeDefs = [_root.typeDefs, _auth.typeDefs, _account.typeDefs, _membership.typeDefs, _role.typeDefs, _subject.typeDefs, _course.typeDefs, _user.typeDefs, _level.typeDefs, _exam.typeDefs, _question.typeDefs, _choice.typeDefs, _result.typeDefs, _speech.typeDefs, _content.typeDefs];