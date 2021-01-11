"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = undefined;

var _apolloServerExpress = require("apollo-server-express");

var validators = exports.validators = {

  Mutation: {

    saveResult: function saveResult(resolve, obj, _ref, context) {
      var saveResultReq = _ref.saveResultReq;
      var totalQuestion = saveResultReq.totalQuestion,
          attempedQuestion = saveResultReq.attempedQuestion;


      if (attempedQuestion > totalQuestion) throw new _apolloServerExpress.UserInputError('Invalid attempled questions!');

      return resolve(obj, { saveResultReq: saveResultReq }, context);
    }
  }
};