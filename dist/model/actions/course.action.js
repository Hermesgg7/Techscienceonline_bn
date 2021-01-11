'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteCourse = exports._editCourse = exports._createCourse = exports._courseById = exports._courses = undefined;

var _orms = require('../orms');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _courses = exports._courses = function _courses(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve) {
    var orderBy = [order, sort];

    switch (order) {
      case 'subject.name':
        orderBy = [_orms.Subject, 'name', sort];
        break;

      default:
        break;
    }

    _orms.Course.findAndCountAll({
      where: global.parseJson(filter),
      order: [[].concat(_toConsumableArray(orderBy))],
      offset: skip,
      limit: limit,
      include: _orms.Subject
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ courses: rows, totalCount: count });
    });
  });
};

var _courseById = exports._courseById = function _courseById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Course.findByPk(id).then(function (course) {
      return resolve(course);
    });
  });
};

var _createCourse = exports._createCourse = function _createCourse(_ref3) {
  var name = _ref3.name,
      subjectId = _ref3.subjectId;
  return new Promise(function (resolve, reject) {
    _orms.Course.findOne({ where: { name: name } }).then(function (course) {
      if (!!course) return resolve({ scs: false, msg: 'That Course already exists!' });

      _orms.Subject.findByPk(subjectId).then(function (subject) {
        if (!subject) return resolve({ scs: false, msg: 'That Subject doesnt exists!' });

        _orms.Course.create({ name: name, subjectId: subjectId }).then(function (course) {
          return resolve({ scs: true, msg: 'Course Created!', course: course.dataValues });
        });
      });
    });
  });
};

var _editCourse = exports._editCourse = function _editCourse(_ref4) {
  var id = _ref4.id,
      name = _ref4.name,
      subjectId = _ref4.subjectId;
  return new Promise(function (resolve, reject) {
    _orms.Course.findByPk(id).then(function (course) {
      if (!course) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Course.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist && course.name !== name) return resolve({ scs: false, msg: 'That Course already exists' });

        _orms.Subject.findByPk(subjectId).then(function (subject) {
          if (!subject) return resolve({ scs: false, msg: 'That Subject doesnt exist' });

          course.name = name;
          course.subjectId = subjectId;
          course.save();
          return resolve({ scs: true, msg: 'Course Updated!', course: course.dataValues });
        });
      });
    });
  });
};

var _deleteCourse = exports._deleteCourse = function _deleteCourse(id) {
  return new Promise(function (resolve, reject) {
    _orms.Course.findByPk(id).then(function (course) {
      if (!course) return resolve({ scs: false, msg: 'What are you going to delete?' });

      course.destroy();
      return resolve({ scs: true, msg: 'Course Deleted!', course: course.dataValues });
    });
  });
};