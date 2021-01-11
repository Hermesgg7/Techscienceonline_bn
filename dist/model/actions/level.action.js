'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteLevel = exports._editLevel = exports._createLevel = exports._levelById = exports._levels = undefined;

var _orms = require('../orms');

var _levels = exports._levels = function _levels(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve, reject) {
    _orms.Level.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ levels: rows, totalCount: count });
    });
  });
};

var _levelById = exports._levelById = function _levelById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Level.findByPk(id).then(function (level) {
      return resolve(level);
    });
  });
};

var _createLevel = exports._createLevel = function _createLevel(_ref3) {
  var name = _ref3.name;
  return new Promise(function (resolve, reject) {
    _orms.Level.findOne({ where: { name: name } }).then(function (level) {
      if (!!level) return resolve({ scs: false, msg: 'That Level already exists!' });

      _orms.Level.create({ name: name }).then(function (level) {
        return resolve({ scs: true, msg: 'Level Created!', level: level.dataValues });
      });
    });
  });
};

var _editLevel = exports._editLevel = function _editLevel(_ref4) {
  var id = _ref4.id,
      name = _ref4.name;
  return new Promise(function (resolve, reject) {
    _orms.Level.findByPk(id).then(function (level) {
      if (!level) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Level.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist) return resolve({ scs: false, msg: 'That Level already exists' });

        level.name = name;
        level.save();
        return resolve({ scs: true, msg: 'Level Updated!', level: level.dataValues });
      });
    });
  });
};

var _deleteLevel = exports._deleteLevel = function _deleteLevel(id) {
  return new Promise(function (resolve, reject) {
    _orms.Level.findByPk(id).then(function (level) {
      if (!level) return resolve({ scs: false, msg: 'What are you going to delete?' });

      level.destroy();
      return resolve({ scs: true, msg: 'Level Deleted!', level: level.dataValues });
    });
  });
};