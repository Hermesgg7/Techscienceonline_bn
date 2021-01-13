"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._deleteSpeechCategory = exports._editSpeechCategory = exports._createSpeechCategory = exports._speechCategoryById = exports._speechCategories = undefined;

var _orms = require("../orms");

var _speechCategories = exports._speechCategories = function _speechCategories(_ref) {
	var skip = _ref.skip,
	    limit = _ref.limit,
	    order = _ref.order,
	    sort = _ref.sort,
	    filter = _ref.filter;
	return new Promise(function (resolve, reject) {
		_orms.SpeechCategory.findAndCountAll({
			where: global.parseJson(filter),
			order: [[order, sort]],
			offset: skip,
			limit: limit
		}).then(function (_ref2) {
			var count = _ref2.count,
			    rows = _ref2.rows;

			return resolve({ totalCount: count, speechCategories: rows });
		});
	});
};

var _speechCategoryById = exports._speechCategoryById = function _speechCategoryById(id) {
	return new Promise(function (resolve, reject) {
		_orms.SpeechCategory.findByPk(id).then(function (category) {
			return resolve(category);
		});
	});
};

var _createSpeechCategory = exports._createSpeechCategory = function _createSpeechCategory(_ref3) {
	var name = _ref3.name;
	return new Promise(function (resolve, reject) {
		_orms.SpeechCategory.findOne({ where: { name: name } }).then(function (category) {
			if (!!category) {
				return resolve({ scs: false, msg: "That Speech Category already exists!" });
			}

			_orms.SpeechCategory.create({ name: name }).then(function (category) {
				return resolve({ scs: true, msg: "Speech Created!", speechCategory: category.dataValues });
			});
		});
	});
};

var _editSpeechCategory = exports._editSpeechCategory = function _editSpeechCategory(_ref4) {
	var id = _ref4.id,
	    name = _ref4.name;
	return new Promise(function (resolve, reject) {
		_orms.SpeechCategory.findByPk(id).then(function (category) {
			if (!category) {
				return resolve({ scs: false, msg: "What are you going to edit?" });
			}

			_orms.SpeechCategory.findOne({ where: { name: name } }).then(function (exist) {
				if (!!exist) {
					return resolve({ scs: false, msg: "That Speech category already exists" });
				}

				category.name = name;
				category.save();
				return resolve({ scs: true, msg: "Speech Updated!", speechCategory: category.dataValues });
			});
		});
	});
};

var _deleteSpeechCategory = exports._deleteSpeechCategory = function _deleteSpeechCategory(id) {
	return new Promise(function (resolve, reject) {
		_orms.SpeechCategory.findByPk(id).then(function (category) {
			if (!category) {
				return resolve({ scs: false, msg: "What are you going to delete?" });
			}

			category.destroy();
			return resolve({ scs: true, msg: "Speech Deleted!", speechCategory: category.dataValues });
		});
	});
};