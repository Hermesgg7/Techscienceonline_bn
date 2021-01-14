"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._deleteContent = exports._editContent = exports._createContent = exports._contentById = exports._contents = undefined;

var _orms = require("../orms");

var _contents = exports._contents = function _contents(_ref) {
	var skip = _ref.skip,
	    limit = _ref.limit,
	    order = _ref.order,
	    sort = _ref.sort,
	    filter = _ref.filter;
	return new Promise(function (resolve, reject) {
		_orms.Content.findAndCountAll({
			where: global.parseJson(filter),
			order: [[order, sort]],
			offset: skip,
			limit: limit
		}).then(function (_ref2) {
			var count = _ref2.count,
			    rows = _ref2.rows;

			return resolve({ totalCount: count, contents: rows });
		});
	});
};

var _contentById = exports._contentById = function _contentById(id) {
	return new Promise(function (resolve, reject) {
		_orms.Content.findByPk(id).then(function (content) {
			return resolve(content);
		});
	});
};

var _createContent = exports._createContent = function _createContent(_ref3) {
	var speechId = _ref3.speechId,
	    text = _ref3.text;
	return new Promise(function (resolve, reject) {
		_orms.Content.findOne({ where: { speechId: speechId } }).then(function (content) {
			if (!!content) {
				return resolve({ scs: false, msg: "That Speech Text already exists!" });
			}

			_orms.Content.create({ speechId: speechId, text: text }).then(function (content) {
				return resolve({ scs: true, msg: "Speech Text Created!", content: content.dataValues });
			});
		});
	});
};

var _editContent = exports._editContent = function _editContent(_ref4) {
	var id = _ref4.id,
	    speechId = _ref4.speechId,
	    text = _ref4.text;
	return new Promise(function (resolve, reject) {
		_orms.Content.findByPk(id).then(function (content) {
			if (!content) {
				return resolve({ scs: false, msg: "What are you going to edit?" });
			}

			_orms.Content.findOne({ where: { text: text } }).then(function (exist) {
				if (!!exist) {
					return resolve({ scs: false, msg: "That Speech Text already exists" });
				}

				content.text = text;
				content.save();
				return resolve({ scs: true, msg: "Speech Text Updated!", content: content.dataValues });
			});
		});
	});
};

var _deleteContent = exports._deleteContent = function _deleteContent(id) {
	return new Promise(function (resolve, reject) {
		_orms.Content.findByPk(id).then(function (content) {
			if (!content) {
				return resolve({ scs: false, msg: "What are you going to delete?" });
			}

			content.destroy();
			return resolve({ scs: true, msg: "Speech Text Deleted!", content: content.dataValues });
		});
	});
};