"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _membership = require("../../model/actions/membership.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/membership.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    memberships: function memberships(parent, _ref, context, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _membership._memberships)(paginateReq).then(function (memberships) {
        return memberships;
      });
    },

    membershipById: function membershipById(parent, _ref2, context, info) {
      var id = _ref2.id;

      return (0, _membership._membershipById)(id).then(function (membership) {
        return membership;
      });
    }
  },

  Mutation: {

    createMembership: function createMembership(parent, _ref3, context, info) {
      var createMembershipReq = _ref3.createMembershipReq;

      return (0, _membership._createMembership)(createMembershipReq).then(function (_ref4) {
        var scs = _ref4.scs,
            msg = _ref4.msg,
            membership = _ref4.membership;

        return { scs: scs, msg: msg, membership: membership };
      });
    },

    editMembership: function editMembership(parent, _ref5, context, info) {
      var editMembershipReq = _ref5.editMembershipReq;

      return (0, _membership._editMembership)(editMembershipReq).then(function (_ref6) {
        var scs = _ref6.scs,
            msg = _ref6.msg,
            membership = _ref6.membership;

        return { scs: scs, msg: msg, membership: membership };
      });
    },

    deleteMembership: function deleteMembership(parent, _ref7, context, info) {
      var id = _ref7.id;

      return (0, _membership._deleteMembership)(id).then(function (_ref8) {
        var scs = _ref8.scs,
            msg = _ref8.msg,
            membership = _ref8.membership;

        return { scs: scs, msg: msg, membership: membership };
      });
    }
  }
};