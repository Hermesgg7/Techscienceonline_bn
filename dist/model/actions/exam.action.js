'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteExam = exports._editExamQuestion = exports._requestExam = exports._assignExam = exports._editExam = exports._createExam = exports._examById = exports._exams = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelize = require('sequelize');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _orms = require('../orms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _exams = exports._exams = function _exams(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      accountId = _ref.accountId,
      filter = _ref.filter;
  return new Promise(function (resolve) {
    var orderBy = [order, sort];

    switch (order) {
      case 'subject.name':
        orderBy = [_orms.Subject, 'name', sort];
        break;

      case 'course.name':
        orderBy = [_orms.Course, 'name', sort];
        break;

      case 'level.name':
        orderBy = [_orms.Level, 'name', sort];
        break;

      default:
        break;
    }

    _orms.Exam.findAndCountAll({
      where: _extends({}, global.parseJson(filter), { accountId: accountId }),
      order: [[].concat(_toConsumableArray(orderBy))],
      offset: skip,
      limit: limit,
      include: [{
        model: _orms.Question,
        include: _orms.Choice
      }, {
        model: _orms.Result,
        include: _orms.User
      }, _orms.Account, _orms.Subject, _orms.Course, _orms.Level],
      nest: true
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      var exams = rows;
      exams = exams.map(function (exam) {
        exam.students = [];
        exam.results.map(function (result) {
          exam.students.push(result.user);
        });
        return exam;
      });
      return resolve({ exams: exams, totalCount: rows.length });
    });
  });
};

var _examById = exports._examById = function _examById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Exam.findByPk(id, {
      include: [{
        model: _orms.Question,
        include: _orms.Choice
      }, {
        model: _orms.Result,
        include: _orms.User
      }],
      nest: true
    }).then(function (exam) {
      exam.students = [];
      exam.results.map(function (result) {
        exam.students.push(result.user);
      });
      return resolve(exam);
    });
  });
};

var _createExam = exports._createExam = function _createExam(_ref3) {
  var accountId = _ref3.accountId,
      subjectId = _ref3.subjectId,
      courseId = _ref3.courseId,
      name = _ref3.name,
      type = _ref3.type,
      levelId = _ref3.levelId,
      genre = _ref3.genre,
      students = _ref3.students;
  return new Promise(function (resolve, reject) {
    _orms.Exam.findOne({ where: { name: name } }).then(function (exam) {
      if (!!exam) return resolve({ scs: false, msg: 'That Exam already exists!' });

      _orms.Account.findByPk(accountId).then(function (account) {
        if (!account) return resolve({ scs: false, msg: 'We dont have such account!' });

        _orms.Subject.findByPk(subjectId).then(function (subject) {
          if (!subject) return resolve({ scs: false, msg: 'We dont have such subject!' });

          _orms.Course.findByPk(courseId).then(function (course) {
            if (!course) return resolve({ scs: false, msg: 'We dont have such course!' });

            if (!students || genre === 'class') {
              _orms.Exam.create({ accountId: accountId, subjectId: subjectId, courseId: courseId, name: name, type: type, levelId: levelId, genre: genre });
              return resolve({ scs: true, msg: 'Exam Created!' });
            }

            _orms.User.findAll({
              where: {
                id: _defineProperty({}, _sequelize.Op.in, students)
              }
            }).then(function (users) {
              if (!users) return resolve({ scs: false, msg: 'We dont have such students!' });
              if (users.length !== students.length) return resolve({ scs: false, msg: 'We dont have such students!' });

              _orms.Exam.create({ accountId: accountId, subjectId: subjectId, courseId: courseId, name: name, type: type, levelId: levelId, genre: genre }).then(function (exam) {
                students.map(function (student) {
                  _orms.Result.create({ examId: exam.getDataValue('id'), userId: student, assignedAt: (0, _moment2.default)().format('YYYY-MM-DD h:mm:ss') });
                });

                return resolve({ scs: true, msg: 'Exam Created!' });
              });
            });
          });
        });
      });
    });
  });
};

var _editExam = exports._editExam = function _editExam(_ref4) {
  var id = _ref4.id,
      accountId = _ref4.accountId,
      subjectId = _ref4.subjectId,
      courseId = _ref4.courseId,
      name = _ref4.name,
      type = _ref4.type,
      levelId = _ref4.levelId,
      genre = _ref4.genre,
      students = _ref4.students;
  return new Promise(function (resolve, reject) {
    _orms.Exam.findByPk(id).then(function (exam) {
      if (!exam) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Exam.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist && exam.name !== name) return resolve({ scs: false, msg: 'That name of Exam already exists' });

        _orms.Account.findByPk(accountId).then(function (account) {
          if (!account) return resolve({ scs: false, msg: 'We dont have such account!' });

          _orms.Subject.findByPk(subjectId).then(function (subject) {
            if (!subject) return resolve({ scs: false, msg: 'We dont have such subject!' });

            _orms.Course.findByPk(courseId).then(function (course) {
              if (!course) return resolve({ scs: false, msg: 'We dont have such course!' });

              if (!students || genre === 'class') {
                exam.accountId = accountId;
                exam.subjectId = subjectId;
                exam.courseId = courseId;
                exam.name = name;
                exam.type = type;
                exam.levelId = levelId;
                exam.genre = genre;
                exam.save();

                return resolve({ scs: true, msg: 'Exam Created!' });
              }

              _orms.User.findAll({
                where: {
                  id: _defineProperty({}, _sequelize.Op.in, students)
                }
              }).then(function (users) {
                if (!users) return resolve({ scs: false, msg: 'We dont have such students!' });
                if (users.length !== students.length) return resolve({ scs: false, msg: 'We dont have such students!' });

                exam.accountId = accountId;
                exam.subjectId = subjectId;
                exam.courseId = courseId;
                exam.name = name;
                exam.type = type;
                exam.levelId = levelId;
                exam.genre = genre;
                exam.save();

                _orms.Result.destroy({
                  where: {
                    examId: id,
                    tookAt: null,
                    userId: _defineProperty({}, _sequelize.Op.notIn, students)
                  }
                });

                students.map(function (student) {
                  _orms.Result.findOne({
                    where: { examId: id, userId: student }
                  }).then(function (result) {
                    if (!result) _orms.Result.create({ examId: id, userId: student, assignedAt: (0, _moment2.default)().format('YYYY-MM-DD h:mm:ss') });
                  });
                });

                return resolve({ scs: true, msg: 'Exam Updated!' });
              });
            });
          });
        });
      });
    });
  });
};

var _assignExam = exports._assignExam = function _assignExam(_ref5) {
  var examId = _ref5.examId,
      students = _ref5.students,
      accountId = _ref5.accountId;
  return new Promise(function (resolve, reject) {
    _orms.Exam.findOne({
      where: {
        id: examId,
        accountId: accountId
      }
    }).then(function (exam) {
      if (!exam) return resolve({ scs: false, msg: 'What are you going to assign?' });

      _orms.User.findAll({
        where: {
          id: _defineProperty({}, _sequelize.Op.in, students),
          accountId: accountId,
          roleId: 3
        }
      }).then(function (users) {
        if (!users) return resolve({ scs: false, msg: 'We dont have such students!' });
        if (users.length !== students.length) return resolve({ scs: false, msg: 'We dont have such students!' });

        students.map(function (student) {
          _orms.Result.findOne({
            where: { examId: examId, userId: student }
          }).then(function (result) {
            if (!result) _orms.Result.create({ examId: examId, userId: student, assignedAt: (0, _moment2.default)().format('YYYY-MM-DD h:mm:ss') });
          });
        });

        return resolve({ scs: true, msg: 'Exam Assigned!' });
      });
    });
  });
};

var _requestExam = exports._requestExam = function _requestExam(_ref6) {
  var id = _ref6.id,
      user = _ref6.user;
  return new Promise(function (resolve, reject) {
    _orms.Exam.findOne({
      where: {
        id: id, accountId: user.accountId
      }
    }).then(function (exam) {
      if (!exam) return resolve({ scs: false, msg: 'What are you going to request?' });

      _orms.Result.findOne({
        where: {
          examId: id,
          userId: user.id
        }
      }).then(function (result) {
        if (!!result) return resolve({ scs: false, msg: 'You already have mutual action with this exam.' });

        _orms.Result.create({ examId: id, userId: user.id, requestedAt: (0, _moment2.default)().format('YYYY-MM-DD h:mm:ss') });

        return resolve({ scs: true, msg: 'Request sent!' });
      });
    });
  });
};

var _editExamQuestion = exports._editExamQuestion = function _editExamQuestion(_ref7) {
  var id = _ref7.id,
      questions = _ref7.questions;

  _orms.Exam.findByPk(id).then(function (exam) {
    if (!exam) return resolve({ scs: false, msg: 'What are you going to edit?' });

    questions.map(function (questionItem) {
      if (!!questionItem.id) {
        _orms.Question.update({ name: questionItem.name }, {
          where: { id: questionItem.id, examId: id }
        });
        return questionItem.choices.map(function (choiceItem) {
          if (!!choiceItem.id) return _orms.Choice.update({
            name: choice.name,
            comment: choice.comment,
            correct: choice.correct
          }, {
            where: { id: choiceItem.id, questionId: questionItem.id }
          });

          _orms.Choice.create({ questionId: questionItem.id, comment: choiceItem.comment, correct: choiceItem.correct });
        });
      }

      _orms.Question.create({ examId: id, name: questionItem.name });
      return questionItem.choices.map(function (choiceItem) {
        return _orms.Choice.create({ questionId: questionItem.id, comment: choiceItem.comment, correct: choiceItem.correct });
      });
    });
  });
};

var _deleteExam = exports._deleteExam = function _deleteExam(_ref8) {
  var id = _ref8.id,
      accountId = _ref8.accountId;
  return new Promise(function (resolve, reject) {
    _orms.Exam.findOne({
      where: { id: id, accountId: accountId }
    }).then(function (exam) {
      if (!exam) return resolve({ scs: false, msg: 'What are you going to delete?' });

      exam.destroy();
      return resolve({ scs: true, msg: 'Exam Deleted!', exam: exam.dataValues });
    });
  });
};