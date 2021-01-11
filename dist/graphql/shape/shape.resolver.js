"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _shape = require("../../model/actions/shape.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/shape.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    shapes: function shapes(parent, _ref, ctx, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _shape._shapes)(paginateReq).then(function (shapes) {
        return shapes;
      });
    }
  },

  Mutation: {

    createShape: function createShape(parent, _ref2, ctx, info) {
      var createShapeReq = _ref2.createShapeReq;

      return (0, _shape._createShape)(_extends({}, createShapeReq, {
        userId: ctx.user.id
      })).then(function (_ref3) {
        var scs = _ref3.scs,
            msg = _ref3.msg;

        return { scs: scs, msg: msg };
      });
    },

    deleteShape: function deleteShape(parent, _ref4, ctx, info) {
      var id = _ref4.id;

      return (0, _shape._deleteShape)({
        id: id,
        userId: ctx.user.id
      }).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg;

        return { scs: scs, msg: msg };
      });
    }
  }
};