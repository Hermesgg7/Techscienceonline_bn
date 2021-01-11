"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permissions = undefined;

var _graphqlShield = require("graphql-shield");

var permissions = exports.permissions = {

    Query: {
        "*": _graphqlShield.allow,
        sayHello: _graphqlShield.allow
    },

    Mutation: {
        "*": _graphqlShield.allow,
        sayHello: _graphqlShield.allow
    }
};