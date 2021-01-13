"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._deleteSpeech = exports._editSpeech = exports._createSpeech = exports._speechById = exports._speeches = undefined;

var _orms = require("../orms");

var _speeches = exports._speeches = function _speeches(_ref) {
	var skip = _ref.skip,
	    limit = _ref.limit,
	    order = _ref.order,
	    sort = _ref.sort,
	    filter = _ref.filter;
	return new Promise(function (resolve, reject) {
		_orms.Speech.findAndCountAll({
			where: global.parseJson(filter),
			order: [[order, sort]],
			offset: skip,
			limit: limit
		}).then(function (_ref2) {
			var count = _ref2.count,
			    rows = _ref2.rows;

			return resolve({ totalCount: count, speeches: rows });
		});
	});
};

var _speechById = exports._speechById = function _speechById(id) {
	return new Promise(function (resolve, reject) {
		_orms.Speech.findByPk(id).then(function (speech) {
			return resolve(speech);
		});
	});
};

var _createSpeech = exports._createSpeech = function _createSpeech(_ref3) {
	var name = _ref3.name;
	return new Promise(function (resolve, reject) {
		_orms.Speech.findOne({ where: { name: name } }).then(function (speech) {
			if (!!speech) {
				return resolve({ scs: false, msg: "That Speech Category already exists!" });
			}

			_orms.Speech.create({ name: name }).then(function (role) {
				return resolve({ scs: true, msg: "Speech Created!", role: speech.dataValues });
			});
		});
	});
};

var _editSpeech = exports._editSpeech = function _editSpeech(_ref4) {
	var id = _ref4.id,
	    name = _ref4.name;
	return new Promise(function (resolve, reject) {
		_orms.Speech.findByPk(id).then(function (speech) {
			if (!speech) {
				return resolve({ scs: false, msg: "What are you going to edit?" });
			}

			_orms.Speech.findOne({ where: { name: name } }).then(function (exist) {
				if (!!exist) {
					return resolve({ scs: false, msg: "That Speech category already exists" });
				}

				speech.name = name;
				speech.save();
				return resolve({ scs: true, msg: "Speech Updated!", speech: speech.dataValues });
			});
		});
	});
};

var _deleteSpeech = exports._deleteSpeech = function _deleteSpeech(id) {
	return new Promise(function (resolve, reject) {
		_orms.Speech.findByPk(id).then(function (speech) {
			if (!speech) {
				return resolve({ scs: false, msg: "What are you going to delete?" });
			}

			speech.destroy();
			return resolve({ scs: true, msg: "Speech Deleted!", speech: speech.dataValues });
		});
	});
};