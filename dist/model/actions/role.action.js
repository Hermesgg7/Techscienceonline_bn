'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteRole = exports._editRole = exports._createRole = exports._roleById = exports._roles = undefined;

var _orms = require('../orms');

var _roles = exports._roles = function _roles(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve, reject) {
    _orms.Role.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ totalCount: count, roles: rows });
    });
  });
};

var _roleById = exports._roleById = function _roleById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Role.findByPk(id).then(function (role) {
      return resolve(role);
    });
  });
};

var _createRole = exports._createRole = function _createRole(_ref3) {
  var name = _ref3.name;
  return new Promise(function (resolve, reject) {
    _orms.Role.findOne({ where: { name: name } }).then(function (role) {
      if (!!role) return resolve({ scs: false, msg: 'That Role already exists!' });

      _orms.Role.create({ name: name }).then(function (role) {
        return resolve({ scs: true, msg: 'Role Created!', role: role.dataValues });
      });
    });
  });
};

var _editRole = exports._editRole = function _editRole(_ref4) {
  var id = _ref4.id,
      name = _ref4.name;
  return new Promise(function (resolve, reject) {
    _orms.Role.findByPk(id).then(function (role) {
      if (!role) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Role.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist) return resolve({ scs: false, msg: 'That Role already exists' });

        role.name = name;
        role.save();
        return resolve({ scs: true, msg: 'Role Updated!', role: role.dataValues });
      });
    });
  });
};

var _deleteRole = exports._deleteRole = function _deleteRole(id) {
  return new Promise(function (resolve, reject) {
    _orms.Role.findByPk(id).then(function (role) {
      if (!role) return resolve({ scs: false, msg: 'What are you going to delete?' });

      role.destroy();
      return resolve({ scs: true, msg: 'Role Deleted!', role: role.dataValues });
    });
  });
};