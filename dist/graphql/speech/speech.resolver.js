"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _speech = require("../../model/actions/speech.action");

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/speech.graphql", "utf8");

var resolvers = exports.resolvers = {

	Query: {

		speechCategories: function speechCategories(parent, _ref, context, info) {
			var paginateReq = _ref.paginateReq;

			return (0, _speech._speechCategories)(paginateReq).then(function (_ref2) {
				var categories = _ref2.categories,
				    totalCount = _ref2.totalCount;

				return { categories: categories, totalCount: totalCount };
			});
		},

		speechCategoryById: function speechCategoryById(parent, _ref3, context, info) {
			var id = _ref3.id;

			return (0, _speech._speechCategoryById)(id).then(function (category) {
				return category;
			});
		}
	},

	Mutation: {

		createSpeechCategory: function createSpeechCategory(parent, _ref4, context, info) {
			var createSpeechReq = _ref4.createSpeechReq;

			return (0, _speech._createSpeechCategory)(createSpeechReq).then(function (_ref5) {
				var scs = _ref5.scs,
				    msg = _ref5.msg;

				return { scs: scs, msg: msg };
			});
		},

		editSpeechCategory: function editSpeechCategory(parent, _ref6, context, info) {
			var editSpeechReq = _ref6.editSpeechReq;

			return (0, _speech._editSpeechCategory)(editSpeechReq).then(function (_ref7) {
				var scs = _ref7.scs,
				    msg = _ref7.msg;

				return { scs: scs, msg: msg };
			});
		},

		deleteSpeechCategory: function deleteSpeechCategory(parent, _ref8, context, info) {
			var id = _ref8.id;

			return (0, _speech._deleteSpeechCategory)(id).then(function (_ref9) {
				var scs = _ref9.scs,
				    msg = _ref9.msg;

				return { scs: scs, msg: msg };
			});
		}
	}
};