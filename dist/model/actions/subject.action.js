'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteSubject = exports._editSubject = exports._createSubject = exports._subjectById = exports._subjects = undefined;

var _orms = require('../orms');

var _subjects = exports._subjects = function _subjects(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve, reject) {
    _orms.Subject.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ subjects: rows, totalCount: count });
    });
  });
};

var _subjectById = exports._subjectById = function _subjectById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Subject.findByPk(id).then(function (subject) {
      return resolve(subject);
    });
  });
};

var _createSubject = exports._createSubject = function _createSubject(_ref3) {
  var name = _ref3.name;
  return new Promise(function (resolve, reject) {
    _orms.Subject.findOne({ where: { name: name } }).then(function (subject) {
      if (!!subject) return resolve({ scs: false, msg: 'That Subject already exists!' });

      _orms.Subject.create({ name: name }).then(function (subject) {
        return resolve({ scs: true, msg: 'Subject Created!', subject: subject.dataValues });
      });
    });
  });
};

var _editSubject = exports._editSubject = function _editSubject(_ref4) {
  var id = _ref4.id,
      name = _ref4.name;
  return new Promise(function (resolve, reject) {
    _orms.Subject.findByPk(id).then(function (subject) {
      if (!subject) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Subject.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist) return resolve({ scs: false, msg: 'That Subject already exists' });

        subject.name = name;
        subject.save();
        return resolve({ scs: true, msg: 'Subject Updated!', subject: subject.dataValues });
      });
    });
  });
};

var _deleteSubject = exports._deleteSubject = function _deleteSubject(id) {
  return new Promise(function (resolve, reject) {
    _orms.Subject.findByPk(id).then(function (subject) {
      if (!subject) return resolve({ scs: false, msg: 'What are you going to delete?' });

      subject.destroy();
      return resolve({ scs: true, msg: 'Subject Deleted!', subject: subject.dataValues });
    });
  });
};