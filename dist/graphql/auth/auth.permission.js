'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Mutation: {

    signin: _graphqlShield.allow,

    signup: _graphqlShield.allow

  }
};