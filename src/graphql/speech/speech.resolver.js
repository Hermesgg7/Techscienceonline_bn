import { readFileSync } from "fs";
import { _createSpeechCategory, _deleteSpeechCategory, _editSpeechCategory, _speechCategoryById, _speechCategories } from "../../model/actions/speech.action";

export const typeDefs = readFileSync(`${__dirname}/speech.graphql`, "utf8");

export const resolvers = {

	Query: {

		speechCategories: (parent, { paginateReq }, context, info) => {
			return _speechCategories(paginateReq).then(({ categories, totalCount }) => {
				return { categories, totalCount };
			});
		},

		speechCategoryById: (parent, { id }, context, info) => {
			return _speechCategoryById(id).then(category => {
				return category;
			});
		},
	},

	Mutation: {

		createSpeechCategory: (parent, { createSpeechReq }, context, info) => {
			return _createSpeechCategory(createSpeechReq).then(({ scs, msg }) => {
				return { scs, msg };
			});
		},

		editSpeechCategory: (parent, { editSpeechReq }, context, info) => {
			return _editSpeechCategory(editSpeechReq).then(({ scs, msg }) => {
				return { scs, msg };
			});
		},

		deleteSpeechCategory: (parent, { id }, context, info) => {
			return _deleteSpeechCategory(id).then(({ scs, msg }) => {
				return { scs, msg };
			});
		},
	},
};