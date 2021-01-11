"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _level = require("../../model/actions/level.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/level.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    levels: function levels(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _level._levels)(paginateReq).then(function (_ref2) {
        var levels = _ref2.levels,
            totalCount = _ref2.totalCount;

        return { levels: levels, totalCount: totalCount };
      });
    },

    levelById: function levelById(parent, _ref3, context, info) {
      var id = _ref3.id;

      return (0, _level._levelById)(id).then(function (level) {
        return level;
      });
    }
  },

  Mutation: {

    createLevel: function createLevel(parent, _ref4, context, info) {
      var createLevelReq = _ref4.createLevelReq;

      return (0, _level._createLevel)(createLevelReq).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg,
            level = _ref5.level;

        return { scs: scs, msg: msg, level: level };
      });
    },

    editLevel: function editLevel(parent, _ref6, context, info) {
      var editLevelReq = _ref6.editLevelReq;

      return (0, _level._editLevel)(editLevelReq).then(function (_ref7) {
        var scs = _ref7.scs,
            msg = _ref7.msg,
            level = _ref7.level;

        return { scs: scs, msg: msg, level: level };
      });
    },

    deleteLevel: function deleteLevel(parent, _ref8, context, info) {
      var id = _ref8.id;

      return (0, _level._deleteLevel)(id).then(function (_ref9) {
        var scs = _ref9.scs,
            msg = _ref9.msg,
            level = _ref9.level;

        return { scs: scs, msg: msg, level: level };
      });
    }
  }
};