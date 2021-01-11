"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _graphqlIsoDate = require("graphql-iso-date");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/root.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Date: _graphqlIsoDate.GraphQLDate,
  Time: _graphqlIsoDate.GraphQLTime,
  DateTime: _graphqlIsoDate.GraphQLDateTime,

  Query: {
    sayHello: function sayHello(parent, args, context, info) {
      return "Hello " + args.name + "!";
    }
  },

  Mutation: {
    sayHello: function sayHello(parent, args, context, info) {
      return "Hello " + args.name + "!";
    }
  }

};