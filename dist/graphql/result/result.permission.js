'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

    Query: {

        results: _graphqlShield.allow,

        answers: _graphqlShield.allow
    },

    Mutation: {

        saveResult: _graphqlShield.allow,

        gradeResult: _graphqlShield.allow,

        acceptResult: _graphqlShield.allow,

        deleteResult: _graphqlShield.allow
    }
};