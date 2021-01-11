"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _role = require("../../model/actions/role.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/role.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    roles: function roles(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _role._roles)(paginateReq).then(function (roles) {
        return roles;
      });
    },

    roleById: function roleById(parent, _ref2, context, info) {
      var id = _ref2.id;

      return (0, _role._roleById)(id).then(function (role) {
        return role;
      });
    }
  },

  Mutation: {

    createRole: function createRole(parent, _ref3, context, info) {
      var createRoleReq = _ref3.createRoleReq;

      return (0, _role._createRole)(createRoleReq).then(function (_ref4) {
        var scs = _ref4.scs,
            msg = _ref4.msg,
            role = _ref4.role;

        return { scs: scs, msg: msg, role: role };
      });
    },

    editRole: function editRole(parent, _ref5, context, info) {
      var editRoleReq = _ref5.editRoleReq;

      return (0, _role._editRole)(editRoleReq).then(function (_ref6) {
        var scs = _ref6.scs,
            msg = _ref6.msg,
            role = _ref6.role;

        return { scs: scs, msg: msg, role: role };
      });
    },

    deleteRole: function deleteRole(parent, _ref7, context, info) {
      var id = _ref7.id;

      return (0, _role._deleteRole)(id).then(function (_ref8) {
        var scs = _ref8.scs,
            msg = _ref8.msg,
            role = _ref8.role;

        return { scs: scs, msg: msg, role: role };
      });
    }
  }
};