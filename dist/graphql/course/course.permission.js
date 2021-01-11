'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

  Query: {

    courses: _graphqlShield.allow,

    courseById: _graphqlShield.allow
  },

  Mutation: {

    createCourse: _graphqlShield.allow,

    editCourse: _graphqlShield.allow,

    deleteCourse: _graphqlShield.allow
  }
};