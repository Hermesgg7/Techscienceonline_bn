'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    memberships: _graphqlShield.allow,

    membershipById: _graphqlShield.allow
  },

  Mutation: {

    createMembership: _graphqlShield.allow,

    editMembership: _graphqlShield.allow,

    deleteMembership: _graphqlShield.allow
  }
};