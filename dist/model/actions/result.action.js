'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteResult = exports._acceptResult = exports._gradeResult = exports._saveResult = exports._answers = exports._results = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelize = require('sequelize');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _orms = require('../orms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _results = exports._results = function _results(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      isStudent = _ref.isStudent,
      userId = _ref.userId,
      accountId = _ref.accountId;
  return new Promise(function (resolve) {
    var data = {};
    var orderBy = [order, sort];

    switch (order) {
      case 'exam.name':
        orderBy = [_orms.Exam, 'name', sort];
        break;

      case 'user.fullname':
        orderBy = [_orms.User, 'firstname', sort];
        break;

      default:
        break;
    }

    var option = {
      where: isStudent ? {
        userId: userId
      } : {
        '$exam.accountId$': accountId
      },
      order: [[].concat(_toConsumableArray(orderBy))],
      offset: skip,
      limit: limit,
      include: [_orms.Exam, _orms.User],
      nest: true
    };

    _orms.Result.findAndCountAll(_extends({}, option, {
      where: _extends({}, option.where, {
        tookAt: _defineProperty({}, _sequelize.Op.not, null),
        grade: null
      })
    })).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      data = _extends({}, data, { pendings: { totalCount: count, results: rows } });

      _orms.Result.findAndCountAll(_extends({}, option, {
        where: _extends({}, option.where, {
          requestedAt: _defineProperty({}, _sequelize.Op.not, null),
          assignedAt: null
        })
      })).then(function (_ref3) {
        var count = _ref3.count,
            rows = _ref3.rows;

        data = _extends({}, data, { requesteds: { totalCount: count, results: rows } });

        _orms.Result.findAndCountAll(_extends({}, option, {
          where: _extends({}, option.where, {
            grade: _defineProperty({}, _sequelize.Op.not, null)
          })
        })).then(function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref5) {
            var count = _ref5.count,
                rows = _ref5.rows;
            var i, j;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    i = 0;

                  case 1:
                    if (!(i < rows.length)) {
                      _context.next = 20;
                      break;
                    }

                    _context.next = 4;
                    return rows[i].getAnswers();

                  case 4:
                    rows[i].answers = _context.sent;
                    j = 0;

                  case 6:
                    if (!(j < rows[i].answers.length)) {
                      _context.next = 17;
                      break;
                    }

                    _context.next = 9;
                    return rows[i].answers[j].getQuestion();

                  case 9:
                    rows[i].answers[j].question = _context.sent;

                    if (!(rows[i].answers[j].question.type === 'objective')) {
                      _context.next = 14;
                      break;
                    }

                    _context.next = 13;
                    return _orms.Choice.findByPk(Number(rows[i].answers[j].answer));

                  case 13:
                    rows[i].answers[j].answer = _context.sent.name;

                  case 14:
                    j++;
                    _context.next = 6;
                    break;

                  case 17:
                    i++;
                    _context.next = 1;
                    break;

                  case 20:

                    data = _extends({}, data, { gradeds: { totalCount: count, results: rows } });

                    _orms.Result.findAndCountAll(_extends({}, option, {
                      where: _extends({}, option.where, {
                        assignedAt: _defineProperty({}, _sequelize.Op.not, null),
                        tookAt: null
                      })
                    })).then(function (_ref6) {
                      var count = _ref6.count,
                          rows = _ref6.rows;

                      data = _extends({}, data, { assigneds: { totalCount: count, results: rows } });
                      return resolve(data);
                    });

                  case 22:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function (_x) {
            return _ref4.apply(this, arguments);
          };
        }());
      });
    });
  });
};

var _answers = exports._answers = function _answers(_ref7) {
  var skip = _ref7.skip,
      limit = _ref7.limit,
      order = _ref7.order,
      sort = _ref7.sort,
      filter = _ref7.filter;
  return new Promise(function (resolve) {
    _orms.Answer.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit,
      include: [{
        model: _orms.Result,
        include: [_orms.Exam, _orms.User]
      }, {
        model: _orms.Question,
        include: _orms.Choice
      }],
      nest: true
    }).then(function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref9) {
        var count = _ref9.count,
            rows = _ref9.rows;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', resolve({ answers: rows, totalCount: count }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x2) {
        return _ref8.apply(this, arguments);
      };
    }());
  });
};

var _saveResult = exports._saveResult = function _saveResult(_ref10) {
  var id = _ref10.id,
      totalQuestion = _ref10.totalQuestion,
      attempedQuestion = _ref10.attempedQuestion,
      tookAt = _ref10.tookAt,
      answers = _ref10.answers;
  return new Promise(function (resolve) {
    _orms.Result.findByPk(id).then(function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(result) {
        var objGrade, i, answer, choice;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (result) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', resolve({ scs: false, msg: 'What are u going to save?' }));

              case 2:

                result.totalQuestion = totalQuestion;
                result.attempedQuestion = attempedQuestion;
                result.tookAt = tookAt;

                objGrade = {
                  count: 0,
                  grade: 0
                };
                i = 0;

              case 7:
                if (!(i < answers.length)) {
                  _context3.next = 20;
                  break;
                }

                answer = new _orms.Answer({
                  resultId: id,
                  questionId: answers[i].questionId,
                  answer: answers[i].answer
                });

                if (!(answers[i].questionType === 'objective')) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 12;
                return _orms.Choice.findByPk(Number(answers[i].answer));

              case 12:
                choice = _context3.sent;

                if (!!choice.correct) answer.grade = 5;else answer.grade = 0;

                objGrade.count = objGrade.count + 1;
                objGrade.grade = objGrade.grade + answer.grade;

              case 16:

                answer.save();

              case 17:
                i++;
                _context3.next = 7;
                break;

              case 20:

                if (objGrade.count === answers.length) result.grade = Math.round(objGrade.grade / objGrade.count);

                result.save();
                return _context3.abrupt('return', resolve({ scs: true, msg: 'Result saved!' }));

              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x3) {
        return _ref11.apply(this, arguments);
      };
    }());
  });
};

var _gradeResult = exports._gradeResult = function _gradeResult(_ref12) {
  var id = _ref12.id,
      grades = _ref12.grades;
  return new Promise(function (resolve) {
    _orms.Result.findByPk(id).then(function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(result) {
        var i, answer, grade;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (result) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', resolve({ scs: false, msg: 'What are you going to grade?' }));

              case 2:
                i = 0;

              case 3:
                if (!(i < grades.length)) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 6;
                return _orms.Answer.findOne({ where: { id: grades[i].id, resultId: id } });

              case 6:
                answer = _context4.sent;

                if (answer) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt('return', resolve({ scs: true, msg: 'What are you going to grade?' }));

              case 9:

                answer.grade = grades[i].grade;
                answer.comment = grades[i].comment;
                _context4.next = 13;
                return answer.save();

              case 13:
                i++;
                _context4.next = 3;
                break;

              case 16:
                _context4.next = 18;
                return _orms.Answer.sum('grade', {
                  where: { resultId: id }
                });

              case 18:
                grade = _context4.sent;


                result.grade = Math.round(grade / result.attempedQuestion);
                result.save();

                return _context4.abrupt('return', resolve({ scs: true, msg: 'Result Graded!' }));

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function (_x4) {
        return _ref13.apply(this, arguments);
      };
    }());
  });
};

var _acceptResult = exports._acceptResult = function _acceptResult(id) {
  return new Promise(function (resolve, reject) {
    _orms.Result.findByPk(id).then(function (result) {
      if (!result) return resolve({ scs: false, msg: 'What are you going to accept?' });

      result.assignedAt = (0, _moment2.default)().format('YYYY-MM-DD h:mm:ss');
      result.save();
      return resolve({ scs: true, msg: 'Request Accepted!' });
    });
  });
};

var _deleteResult = exports._deleteResult = function _deleteResult(id) {
  return new Promise(function (resolve, reject) {
    _orms.Result.findByPk(id).then(function (result) {
      if (!result) return resolve({ scs: false, msg: 'What are you going to delete?' });

      result.destroy();
      return resolve({ scs: true, msg: 'Request Declined!' });
    });
  });
};