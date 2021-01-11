"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _user = require("../../model/actions/user.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/user.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    users: function users(parent, _ref, ctx, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _user._users)(_extends({}, paginateReq, {
        userId: ctx.user.id,
        userAccountId: ctx.user.accountId,
        isTeacher: ctx.user.roleId === 2
      })).then(function (_ref2) {
        var users = _ref2.users,
            totalCount = _ref2.totalCount;

        return { users: users, totalCount: totalCount };
      });
    },

    userById: function userById(parent, _ref3, ctx, info) {
      var id = _ref3.id;

      return (0, _user._userById)(id).then(function (user) {
        return user;
      });
    }
  },

  Mutation: {

    createUser: function createUser(parent, _ref4, ctx, info) {
      var createUserReq = _ref4.createUserReq;

      return (0, _user._createUser)(_extends({}, createUserReq, {
        userAccountId: ctx.user.accountId,
        isTeacher: ctx.user.roleId === 2
      })).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg;

        return { scs: scs, msg: msg };
      });
    },

    editUser: function editUser(parent, _ref6, ctx, info) {
      var editUserReq = _ref6.editUserReq;

      return (0, _user._editUser)(_extends({}, editUserReq, {
        userId: ctx.user.id,
        userAccountId: ctx.user.accountId,
        isTeacher: ctx.user.roleId === 2
      })).then(function (_ref7) {
        var scs = _ref7.scs,
            msg = _ref7.msg;

        return { scs: scs, msg: msg };
      });
    },

    deleteUser: function deleteUser(parent, _ref8, ctx, info) {
      var id = _ref8.id;

      return (0, _user._deleteUser)({
        id: id,
        userId: ctx.user.id,
        userAccountId: ctx.user.accountId,
        isTeacher: ctx.user.roleId === 2
      }).then(function (_ref9) {
        var scs = _ref9.scs,
            msg = _ref9.msg,
            user = _ref9.user;

        return { scs: scs, msg: msg, user: user };
      });
    }
  }
};