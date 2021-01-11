"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _book = require("../../model/actions/book.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/book.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    books: function books(parent, _ref, ctx, info) {
      // return _accounts(paginateReq).then(({ accounts, totalCount }) => {
      //   return { accounts, totalCount }
      // })

      var paginateReq = _ref.paginateReq;
    }
  },

  Mutation: {

    publishBook: function publishBook(parent, _ref2, ctx, info) {
      var publishBookReq = _ref2.publishBookReq;

      return (0, _book._publishBook)(_extends({}, publishBookReq, {
        userId: ctx.user.id
      })).then(function (result) {
        return result;
      });
    }
  }
};