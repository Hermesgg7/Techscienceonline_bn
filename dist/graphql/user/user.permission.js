'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    users: _graphqlShield.allow,

    userById: _graphqlShield.allow
  },

  Mutation: {

    createUser: _graphqlShield.allow,

    editUser: _graphqlShield.allow,

    deleteUser: _graphqlShield.allow
  }
};