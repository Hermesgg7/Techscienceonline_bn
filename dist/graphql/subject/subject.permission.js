'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    subjects: _graphqlShield.allow,

    subjectById: _graphqlShield.allow
  },

  Mutation: {

    createSubject: _graphqlShield.allow,

    editSubject: _graphqlShield.allow,

    deleteSubject: _graphqlShield.allow
  }
};