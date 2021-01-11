"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _jsonwebtoken = require("jsonwebtoken");

var _user = require("../../model/actions/user.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/auth.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Mutation: {

    signin: function signin(parent, _ref, ctx, info) {
      var signinReq = _ref.signinReq;

      return (0, _user._signin)(signinReq).then(function (_ref2) {
        var scs = _ref2.scs,
            msg = _ref2.msg,
            token = _ref2.token;

        return { scs: scs, msg: msg, token: token };
      });
    },

    signup: function signup(parent, _ref3, ctx, info) {
      var signupReq = _ref3.signupReq;

      return (0, _user._signup)(signupReq).then(function (_ref4) {
        var scs = _ref4.scs,
            user = _ref4.user,
            msg = _ref4.msg;

        if (!scs) return { scs: scs, msg: msg };

        var token = (0, _jsonwebtoken.sign)(user, process.env.APP_KEY, { expiresIn: '12h' });

        return { scs: scs, msg: msg, token: token };
      });
    },

    changePassword: function changePassword(parent, _ref5, ctx, info) {
      var changePasswordReq = _ref5.changePasswordReq;
      var id = ctx.user.id;

      return (0, _user._changePassword)(_extends({ id: id }, changePasswordReq)).then(function (_ref6) {
        var scs = _ref6.scs,
            msg = _ref6.msg;

        return { scs: scs, msg: msg };
      });
    },

    forgotPassword: function forgotPassword(parent, _ref7, ctx, info) {
      var forgotPasswordReq = _ref7.forgotPasswordReq;

      return (0, _user._forgotPassword)(forgotPasswordReq).then(function (_ref8) {
        var scs = _ref8.scs,
            msg = _ref8.msg;

        return { scs: scs, msg: msg };
      });
    },

    resetPassword: function resetPassword(parent, _ref9, ctx, info) {
      var resetPasswordReq = _ref9.resetPasswordReq;

      return (0, _user._resetPassword)(resetPasswordReq).then(function (_ref10) {
        var scs = _ref10.scs,
            msg = _ref10.msg;

        return { scs: scs, msg: msg };
      });
    }
  }
};