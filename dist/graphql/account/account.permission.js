"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permissions = undefined;

var _graphqlShield = require("graphql-shield");

var _shield = require("../../middlewares/shield");

var permissions = exports.permissions = {

    Query: {

        accounts: _graphqlShield.allow,

        accountById: _shield.isAdmin
    },

    Mutation: {

        createAccount: _shield.isAdmin,

        editAccount: _shield.isAdmin,

        editAccountImage: _graphqlShield.allow,

        deleteAccount: _shield.isAdmin
    }
};