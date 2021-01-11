'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteMembership = exports._editMembership = exports._createMembership = exports._membershipById = exports._memberships = undefined;

var _regeneratorRuntime = require('regenerator-runtime');

var _orms = require('../orms');

var _memberships = exports._memberships = function _memberships(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve, reject) {
    _orms.Membership.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ totalCount: count, memberships: rows });
    });
  });
};

var _membershipById = exports._membershipById = function _membershipById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Membership.findByPk(id).then(function (membership) {
      return resolve(membership);
    });
  });
};

var _createMembership = exports._createMembership = function _createMembership(_ref3) {
  var name = _ref3.name;
  return new Promise(function (resolve, reject) {
    _orms.Membership.findOne({ where: { name: name } }).then(function (membership) {
      if (!!membership) return resolve({ scs: false, msg: 'That membership already exists!' });

      _orms.Membership.create({ name: name }).then(function (membership) {
        return resolve({ scs: true, msg: 'Membership Created!', membership: membership.dataValues });
      });
    });
  });
};

var _editMembership = exports._editMembership = function _editMembership(_ref4) {
  var id = _ref4.id,
      name = _ref4.name;
  return new Promise(function (resolve, reject) {
    _orms.Membership.findByPk(id).then(function (membership) {
      if (!membership) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Membership.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist) return resolve({ scs: false, msg: 'That Membership already exists' });

        membership.name = name;
        membership.save();
        return resolve({ scs: true, msg: 'Membership Updated!', membership: membership.dataValues });
      });
    });
  });
};

var _deleteMembership = exports._deleteMembership = function _deleteMembership(id) {
  return new Promise(function (resolve, reject) {
    _orms.Membership.findByPk(id).then(function (membership) {
      if (!membership) return resolve({ scs: false, msg: 'What are you going to delete?' });

      membership.destroy();
      return resolve({ scs: true, msg: 'Membership Deleted!', membership: membership.dataValues });
    });
  });
};