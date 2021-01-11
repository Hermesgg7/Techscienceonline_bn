'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    roles: _graphqlShield.allow,

    roleById: _graphqlShield.allow
  },

  Mutation: {

    createRole: _graphqlShield.allow,

    editRole: _graphqlShield.allow,

    deleteRole: _graphqlShield.allow
  }
};