'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    levels: _graphqlShield.allow,

    levelById: _graphqlShield.allow
  },

  Mutation: {

    createLevel: _graphqlShield.allow,

    editLevel: _graphqlShield.allow,

    deleteLevel: _graphqlShield.allow
  }
};