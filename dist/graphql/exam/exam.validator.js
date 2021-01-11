'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = undefined;

var _apolloServerExpress = require('apollo-server-express');

var validators = exports.validators = {

  Mutation: {

    createExam: function createExam(resolve, obj, _ref, ctx) {
      var createExamReq = _ref.createExamReq;
      var type = createExamReq.type,
          genre = createExamReq.genre;


      if (!['certification', 'practice', 'study', 'example'].includes(type)) throw new _apolloServerExpress.UserInputError('You must provide exact exam type!');

      if (genre !== 'home' && genre !== 'class') throw new _apolloServerExpress.UserInputError('You must provide exact exam genre!');

      return resolve(obj, { createExamReq: createExamReq }, ctx);
    },

    editExam: function editExam(resolve, obj, _ref2, ctx) {
      var editExamReq = _ref2.editExamReq;
      var type = editExamReq.type,
          genre = editExamReq.genre;


      if (!['certification', 'practice', 'study', 'example'].includes(type)) throw new _apolloServerExpress.UserInputError('You must provide exact exam type!');

      if (genre !== 'home' && genre !== 'class') throw new _apolloServerExpress.UserInputError('You must provide exact exam genre!');

      return resolve(obj, { editExamReq: editExamReq }, ctx);
    }
  }
};