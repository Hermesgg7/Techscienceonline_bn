'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    choices: _graphqlShield.allow
  },

  Mutation: {

    createChoice: _graphqlShield.allow,

    editChoice: _graphqlShield.allow,

    deleteChoice: _graphqlShield.allow
  }
};