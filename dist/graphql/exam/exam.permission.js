'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

    Query: {

        exams: _graphqlShield.allow
    },

    Mutation: {

        createExam: _graphqlShield.allow,

        editExam: _graphqlShield.allow,

        assignExam: _graphqlShield.allow,

        requestExam: _graphqlShield.allow,

        deleteExam: _graphqlShield.allow
    }
};