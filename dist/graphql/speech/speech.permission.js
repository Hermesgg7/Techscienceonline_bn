'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

	Query: {
		speeches: _graphqlShield.allow,
		speechById: _graphqlShield.allow
	},

	Mutation: {

		createSpeech: _graphqlShield.allow,

		editSpeech: _graphqlShield.allow,

		deleteSpeech: _graphqlShield.allow
	}
};