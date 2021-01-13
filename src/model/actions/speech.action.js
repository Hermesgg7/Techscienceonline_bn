import { SpeechCategory } from "../orms";


export const _speechCategories = ({ skip, limit, order, sort, filter }) => new Promise((resolve, reject) => {
	SpeechCategory.findAndCountAll({
		where: global.parseJson(filter),
		order: [
			[order, sort],
		],
		offset: skip,
		limit,
	}).then(({ count, rows }) => {
		return resolve({ totalCount: count, speechCategories: rows });
	});
});

export const _speechCategoryById = id => new Promise((resolve, reject) => {
	SpeechCategory.findByPk(id).then(category => resolve(category));
});

export const _createSpeechCategory = ({ name }) => new Promise((resolve, reject) => {
	SpeechCategory.findOne({ where: { name } }).then(category => {
		if (!!category) {
			return resolve({ scs: false, msg: "That Speech Category already exists!" });
		}

		SpeechCategory.create({ name }).then(category => {
			return resolve({ scs: true, msg: "Speech Created!", speechCategory: category.dataValues });
		});
	});
});

export const _editSpeechCategory = ({ id, name }) => new Promise((resolve, reject) => {
	SpeechCategory.findByPk(id).then(category => {
		if (!category) {
			return resolve({ scs: false, msg: "What are you going to edit?" });
		}

		SpeechCategory.findOne({ where: { name } }).then(exist => {
			if (!!exist) {
				return resolve({ scs: false, msg: "That Speech category already exists" });
			}

			category.name = name;
			category.save();
			return resolve({ scs: true, msg: "Speech Updated!", speechCategory: category.dataValues });
		});
	});
});

export const _deleteSpeechCategory = id => new Promise((resolve, reject) => {
	SpeechCategory.findByPk(id).then(category => {
		if (!category) {
			return resolve({ scs: false, msg: "What are you going to delete?" });
		}

		category.destroy();
		return resolve({ scs: true, msg: "Speech Deleted!", speechCategory: category.dataValues });
	});
});