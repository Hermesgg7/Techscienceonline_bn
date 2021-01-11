"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = undefined;

var _graphqlShield = require("graphql-shield");

var _shield = require("../../middlewares/shield");

var permissions = exports.permissions = {

  Query: {

    books: _graphqlShield.allow
  },

  Mutation: {

    publishBook: _graphqlShield.allow
  }
};