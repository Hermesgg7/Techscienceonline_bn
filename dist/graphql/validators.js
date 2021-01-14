"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = require("./auth/auth.validator");

var _account = require("./account/account.validator");

var _membership = require("./membership/membership.validator");

var _role = require("./role/role.validator");

var _subject = require("./subject/subject.validator");

var _course = require("./course/course.validator");

var _user = require("./user/user.validator");

var _level = require("./level/level.validator");

var _exam = require("./exam/exam.validator");

var _question = require("./question/question.validator");

var _choice = require("./choice/choice.validator");

var _result = require("./result/result.validator");

var _speech = require("./speech/speech.validator");

var _content = require("./content/content.validator");

var validators = exports.validators = {
  Query: _extends({}, _auth.validators.Query, _account.validators.Query, _membership.validators.Query, _role.validators.Query, _subject.validators.Query, _course.validators.Query, _user.validators.Query, _level.validators.Query, _exam.validators.Query, _question.validators.Query, _choice.validators.Query, _result.validators.Query, _speech.validators.Query, _content.validators.Query),
  Mutation: _extends({}, _auth.validators.Mutation, _account.validators.Mutation, _membership.validators.Mutation, _role.validators.Mutation, _subject.validators.Mutation, _course.validators.Mutation, _user.validators.Mutation, _level.validators.Mutation, _exam.validators.Mutation, _question.validators.Mutation, _choice.validators.Mutation, _result.validators.Mutation, _speech.validators.Mutation, _content.validators.Mutation)
};