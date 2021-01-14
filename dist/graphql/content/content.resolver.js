"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _content = require("../../model/actions/content.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/content.graphql", "utf8");

var resolvers = exports.resolvers = {

	Query: {

		contents: function contents(parent, _ref, context, info) {
			var paginateReq = _ref.paginateReq;

			return (0, _content._contents)(paginateReq).then(function (_ref2) {
				var contents = _ref2.contents,
				    totalCount = _ref2.totalCount;

				return { contents: contents, totalCount: totalCount };
			});
		},

		contentById: function contentById(parent, _ref3, context, info) {
			var id = _ref3.id;

			return (0, _content._contentById)(id).then(function (content) {
				return content;
			});
		}
	},

	Mutation: {

		createContent: function createContent(parent, _ref4, context, info) {
			var createContentReq = _ref4.createContentReq;

			return (0, _content._createContent)(createContentReq).then(function (_ref5) {
				var scs = _ref5.scs,
				    msg = _ref5.msg;

				return { scs: scs, msg: msg };
			});
		},

		editContent: function editContent(parent, _ref6, context, info) {
			var editContentReq = _ref6.editContentReq;

			return (0, _content._editContent)(editContentReq).then(function (_ref7) {
				var scs = _ref7.scs,
				    msg = _ref7.msg;

				return { scs: scs, msg: msg };
			});
		},

		deleteContent: function deleteContent(parent, _ref8, context, info) {
			var id = _ref8.id;

			return (0, _content._deleteContent)(id).then(function (_ref9) {
				var scs = _ref9.scs,
				    msg = _ref9.msg;

				return { scs: scs, msg: msg };
			});
		}
	}
};