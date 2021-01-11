"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _exam = require("../../model/actions/exam.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/exam.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    exams: function exams(parent, _ref, ctx, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _exam._exams)(_extends({}, paginateReq, { accountId: ctx.user.accountId })).then(function (_ref2) {
        var exams = _ref2.exams,
            totalCount = _ref2.totalCount;

        return { exams: exams, totalCount: totalCount };
      });
    }
  },

  Mutation: {

    createExam: function createExam(parent, _ref3, ctx, info) {
      var createExamReq = _ref3.createExamReq;

      return (0, _exam._createExam)(_extends({}, createExamReq, { accountId: ctx.user.accountId })).then(function (_ref4) {
        var scs = _ref4.scs,
            msg = _ref4.msg;

        return { scs: scs, msg: msg };
      });
    },

    editExam: function editExam(parent, _ref5, ctx, info) {
      var editExamReq = _ref5.editExamReq;

      return (0, _exam._editExam)(_extends({}, editExamReq, { accountId: ctx.user.accountId })).then(function (_ref6) {
        var scs = _ref6.scs,
            msg = _ref6.msg;

        return { scs: scs, msg: msg };
      });
    },

    assignExam: function assignExam(parent, _ref7, ctx, info) {
      var assignExamReq = _ref7.assignExamReq;

      return (0, _exam._assignExam)(_extends({}, assignExamReq, { accountId: ctx.user.accountId })).then(function (_ref8) {
        var scs = _ref8.scs,
            msg = _ref8.msg;

        return { scs: scs, msg: msg };
      });
    },

    requestExam: function requestExam(parent, _ref9, ctx, info) {
      var id = _ref9.id;

      return (0, _exam._requestExam)({ id: id, user: ctx.user }).then(function (_ref10) {
        var scs = _ref10.scs,
            msg = _ref10.msg;

        return { scs: scs, msg: msg };
      });
    },

    deleteExam: function deleteExam(parent, _ref11, ctx, info) {
      var id = _ref11.id;

      return (0, _exam._deleteExam)({ id: id, accountId: ctx.user.accountId }).then(function (_ref12) {
        var scs = _ref12.scs,
            msg = _ref12.msg;

        return { scs: scs, msg: msg };
      });
    }
  }
};