'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    questions: _graphqlShield.allow
  },

  Mutation: {

    createQuestion: _graphqlShield.allow,

    createQuestions: _graphqlShield.allow,

    editQuestion: _graphqlShield.allow,

    deleteQuestion: _graphqlShield.allow
  }
};