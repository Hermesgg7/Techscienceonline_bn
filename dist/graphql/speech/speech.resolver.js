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

		speeches: function speeches(parent, _ref, context, info) {
			var paginateReq = _ref.paginateReq;

			return (0, _speech._speeches)(paginateReq).then(function (_ref2) {
				var speeches = _ref2.speeches,
				    totalCount = _ref2.totalCount;

				return { speeches: speeches, totalCount: totalCount };
			});
		},

		speechById: function speechById(parent, _ref3, context, info) {
			var id = _ref3.id;

			return (0, _speech._speechById)(id).then(function (speech) {
				return speech;
			});
		}
	},

	Mutation: {

		createSpeech: function createSpeech(parent, _ref4, context, info) {
			var createSpeechReq = _ref4.createSpeechReq;

			return (0, _speech._createSpeech)(createSpeechReq).then(function (_ref5) {
				var scs = _ref5.scs,
				    msg = _ref5.msg;

				return { scs: scs, msg: msg };
			});
		},

		editSpeech: function editSpeech(parent, _ref6, context, info) {
			var editSpeechReq = _ref6.editSpeechReq;

			return (0, _speech._editSpeech)(editSpeechReq).then(function (_ref7) {
				var scs = _ref7.scs,
				    msg = _ref7.msg;

				return { scs: scs, msg: msg };
			});
		},

		deleteSpeech: function deleteSpeech(parent, _ref8, context, info) {
			var id = _ref8.id;

			return (0, _speech._deleteSpeech)(id).then(function (_ref9) {
				var scs = _ref9.scs,
				    msg = _ref9.msg;

				return { scs: scs, msg: msg };
			});
		}
	}
};