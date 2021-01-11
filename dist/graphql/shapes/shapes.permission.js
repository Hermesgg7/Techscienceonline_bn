'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    shapes: _graphqlShield.allow
  },

  Mutation: {

    createShape: _graphqlShield.allow,

    deleteShape: _graphqlShield.allow
  }
};