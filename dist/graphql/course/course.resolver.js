"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _course = require("../../model/actions/course.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/course.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    courses: function courses(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _course._courses)(paginateReq).then(function (_ref2) {
        var courses = _ref2.courses,
            totalCount = _ref2.totalCount;

        return { courses: courses, totalCount: totalCount };
      });
    },

    courseById: function courseById(parent, _ref3, context, info) {
      var id = _ref3.id;

      return (0, _course._courseById)(id).then(function (course) {
        return course;
      });
    }
  },

  Mutation: {

    createCourse: function createCourse(parent, _ref4, context, info) {
      var createCourseReq = _ref4.createCourseReq;

      return (0, _course._createCourse)(createCourseReq).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg,
            course = _ref5.course;

        return { scs: scs, msg: msg, course: course };
      });
    },

    editCourse: function editCourse(parent, _ref6, context, info) {
      var editCourseReq = _ref6.editCourseReq;

      return (0, _course._editCourse)(editCourseReq).then(function (_ref7) {
        var scs = _ref7.scs,
            msg = _ref7.msg,
            course = _ref7.course;

        return { scs: scs, msg: msg, course: course };
      });
    },

    deleteCourse: function deleteCourse(parent, _ref8, context, info) {
      var id = _ref8.id;

      return (0, _course._deleteCourse)(id).then(function (_ref9) {
        var scs = _ref9.scs,
            msg = _ref9.msg,
            course = _ref9.course;

        return { scs: scs, msg: msg, course: course };
      });
    }
  }
};