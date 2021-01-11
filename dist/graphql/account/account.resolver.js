"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _account = require("../../model/actions/account.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/account.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    accounts: function accounts(parent, _ref, ctx, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _account._accounts)(paginateReq).then(function (_ref2) {
        var accounts = _ref2.accounts,
            totalCount = _ref2.totalCount;

        return { accounts: accounts, totalCount: totalCount };
      });
    },

    accountById: function accountById(parent, _ref3, ctx, info) {
      var id = _ref3.id;

      return (0, _account._accountById)(id).then(function (account) {
        return account;
      });
    }
  },

  Mutation: {

    createAccount: function createAccount(parent, _ref4, ctx, info) {
      var createAccountReq = _ref4.createAccountReq;

      return (0, _account._createAccount)(createAccountReq).then(function (_ref5) {
        var scs = _ref5.scs,
            msg = _ref5.msg,
            account = _ref5.account;

        return { scs: scs, msg: msg, account: account };
      });
    },

    editAccount: function editAccount(parent, _ref6, ctx, info) {
      var editAccountReq = _ref6.editAccountReq;

      return (0, _account._editAccount)(editAccountReq).then(function (_ref7) {
        var scs = _ref7.scs,
            msg = _ref7.msg,
            account = _ref7.account;

        return { scs: scs, msg: msg, account: account };
      });
    },

    editAccountImage: function editAccountImage(parent, _ref8, ctx, info) {
      var editAccountImageReq = _ref8.editAccountImageReq;

      return (0, _account._editAccountImage)(_extends({}, editAccountImageReq, {
        user: ctx.user
      })).then(function (res) {
        return res;
      });
    },

    deleteAccount: function deleteAccount(parent, _ref9, ctx, info) {
      var id = _ref9.id;

      return (0, _account._deleteAccount)(id).then(function (_ref10) {
        var scs = _ref10.scs,
            msg = _ref10.msg,
            account = _ref10.account;

        return { scs: scs, msg: msg, account: account };
      });
    }
  }
};