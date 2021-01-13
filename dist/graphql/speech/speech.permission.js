'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.permissions = undefined;

var _graphqlShield = require('graphql-shield');

var permissions = exports.permissions = {

	Query: {
		speechCategories: _graphqlShield.allow,
		speechCategoryById: _graphqlShield.allow
	},

	Mutation: {

		createSpeechCategory: _graphqlShield.allow,

		editSpeechCategory: _graphqlShield.allow,

		deleteSpeechCategory: _graphqlShield.allow
	}
};