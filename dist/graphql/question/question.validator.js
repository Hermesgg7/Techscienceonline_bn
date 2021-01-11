'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = undefined;

var _apolloServerExpress = require('apollo-server-express');

var validators = exports.validators = {

  Mutation: {

    createQuestion: function createQuestion(resolve, obj, _ref, ctx) {
      var createQuestionReq = _ref.createQuestionReq;
      var type = createQuestionReq.type;


      if (!['objective', 'subjective'].includes(type)) throw new _apolloServerExpress.UserInputError('You must provide exact exam type!');

      return resolve(obj, { createQuestionReq: createQuestionReq }, ctx);
    },

    editQuestion: function editQuestion(resolve, obj, _ref2, ctx) {
      var editQuestionReq = _ref2.editQuestionReq;
      var type = editQuestionReq.type;


      if (!['objective', 'subjective'].includes(type)) throw new _apolloServerExpress.UserInputError('You must provide exact exam type!');

      return resolve(obj, { editQuestionReq: editQuestionReq }, ctx);
    }
  }
};