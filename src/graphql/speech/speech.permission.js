import { allow } from 'graphql-shield';

export const permissions = {

	Query: {
		speechCategories:  allow,
		speechCategoryById: allow
	},

	Mutation: {

		createSpeechCategory: allow,

		editSpeechCategory: allow,

		deleteSpeechCategory: allow
	}
};
