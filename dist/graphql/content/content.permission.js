'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

	Query: {
		contents: _graphqlShield.allow,
		contentById: _graphqlShield.allow
	},

	Mutation: {

		createContent: _graphqlShield.allow,

		editContent: _graphqlShield.allow,

		deleteContent: _graphqlShield.allow
	}
};