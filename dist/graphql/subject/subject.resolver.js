"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _subject = require("../../model/actions/subject.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/subject.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    subjects: function subjects(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _subject._subjects)(paginateReq).then(function (_ref2) {
        var subjects = _ref2.subjects,
            totalCount = _ref2.totalCount;

        return { subjects: subjects, totalCount: totalCount };
      });
    },

    subjectById: function subjectById(parent, _ref3, context, info) {
      var id = _ref3.id;

      return (0, _subject._subjectById)(id).then(function (subject) {
        return subject;
      });
    }
  },

  Mutation: {

    createSubject: function createSubject(parent, _ref4, context, info) {
      var createSubjectReq = _ref4.createSubjectReq;

      return (0, _subject._createSubject)(createSubjectReq).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg,
            subject = _ref5.subject;

        return { scs: scs, msg: msg, subject: subject };
      });
    },

    editSubject: function editSubject(parent, _ref6, context, info) {
      var editSubjectReq = _ref6.editSubjectReq;

      return (0, _subject._editSubject)(editSubjectReq).then(function (_ref7) {
        var scs = _ref7.scs,
            msg = _ref7.msg,
            subject = _ref7.subject;

        return { scs: scs, msg: msg, subject: subject };
      });
    },

    deleteSubject: function deleteSubject(parent, _ref8, context, info) {
      var id = _ref8.id;

      return (0, _subject._deleteSubject)(id).then(function (_ref9) {
        var scs = _ref9.scs,
            msg = _ref9.msg,
            subject = _ref9.subject;

        return { scs: scs, msg: msg, subject: subject };
      });
    }
  }
};