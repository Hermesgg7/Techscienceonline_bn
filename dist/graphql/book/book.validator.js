"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = undefined;

var _apolloServerExpress = require("apollo-server-express");

var _validator = require("validator");

var validators = exports.validators = {

  Mutation: {

    publishBook: function publishBook(resolve, obj, _ref, ctx) {
      var publishBookReq = _ref.publishBookReq;
      var file = publishBookReq.file,
          text = publishBookReq.text;


      if (!file && !text || !!file && !!text) throw new _apolloServerExpress.UserInputError('Invalid Request!');

      return resolve(obj, { publishBookReq: publishBookReq }, ctx);
    }
  }
};