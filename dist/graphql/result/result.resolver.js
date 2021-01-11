"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _result = require("../../model/actions/result.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/result.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    results: function results(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;
      var _context$user = context.user,
          id = _context$user.id,
          accountId = _context$user.accountId,
          roleId = _context$user.roleId;


      return (0, _result._results)(_extends({}, paginateReq, {
        userId: id,
        accountId: accountId,
        isStudent: Number(roleId) === 3
      })).then(function (data) {
        return data;
      });
    },

    answers: function answers(parent, _ref2, context, info) {
      var paginateReq = _ref2.paginateReq;


      return (0, _result._answers)(paginateReq).then(function (_ref3) {
        var totalCount = _ref3.totalCount,
            answers = _ref3.answers;

        return { totalCount: totalCount, answers: answers };
      });
    }
  },

  Mutation: {

    saveResult: function saveResult(parent, _ref4, ctx, info) {
      var saveResultReq = _ref4.saveResultReq;

      return (0, _result._saveResult)(saveResultReq).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg;

        return { scs: scs, msg: msg };
      });
    },

    gradeResult: function gradeResult(parent, _ref6, context, info) {
      var gradeResultReq = _ref6.gradeResultReq;

      return (0, _result._gradeResult)(gradeResultReq).then(function (_ref7) {
        var scs = _ref7.scs,
            msg = _ref7.msg;

        return { scs: scs, msg: msg };
      });
    },

    acceptResult: function acceptResult(parent, _ref8, context, info) {
      var id = _ref8.id;

      return (0, _result._acceptResult)(id).then(function (_ref9) {
        var scs = _ref9.scs,
            msg = _ref9.msg;

        return { scs: scs, msg: msg };
      });
    },

    deleteResult: function deleteResult(parent, _ref10, context, info) {
      var id = _ref10.id;

      return (0, _result._deleteResult)(id).then(function (_ref11) {
        var scs = _ref11.scs,
            msg = _ref11.msg;

        return { scs: scs, msg: msg };
      });
    }
  }
};