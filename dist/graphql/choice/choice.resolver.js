"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _choice = require("../../model/actions/choice.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/choice.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    choices: function choices(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _choice._choices)(paginateReq).then(function (_ref2) {
        var choices = _ref2.choices,
            totalCount = _ref2.totalCount;

        return { choices: choices, totalCount: totalCount };
      });
    }
  },

  Mutation: {

    createChoice: function createChoice(parent, _ref3, context, info) {
      var createChoiceReq = _ref3.createChoiceReq;

      return (0, _choice._createChoice)(createChoiceReq).then(function (_ref4) {
        var scs = _ref4.scs,
            msg = _ref4.msg;

        return { scs: scs, msg: msg };
      });
    },

    editChoice: function editChoice(parent, _ref5, context, info) {
      var editChoiceReq = _ref5.editChoiceReq;

      return (0, _choice._editChoice)(editChoiceReq).then(function (_ref6) {
        var scs = _ref6.scs,
            msg = _ref6.msg;

        return { scs: scs, msg: msg };
      });
    },

    deleteChoice: function deleteChoice(parent, _ref7, context, info) {
      var id = _ref7.id;

      return (0, _choice._deleteChoice)(id).then(function (_ref8) {
        var scs = _ref8.scs,
            msg = _ref8.msg;

        return { scs: scs, msg: msg };
      });
    }
  }
};