'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteQuestion = exports._editQuestion = exports._createQuestions = exports._createQuestion = exports._questions = undefined;

var _orms = require('../orms');

var _fileHander = require('../../middlewares/fileHander');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _questions = exports._questions = function _questions(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve) {
    _orms.Question.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit,
      include: _orms.Choice,
      nest: true
    }).then(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var count = _ref3.count,
            rows = _ref3.rows;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', resolve({ questions: rows, totalCount: count }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

var _createQuestion = exports._createQuestion = function _createQuestion(_ref4) {
  var name = _ref4.name,
      examId = _ref4.examId,
      type = _ref4.type,
      free = _ref4.free,
      image = _ref4.image;
  return new Promise(function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
      var _ref6, url, error;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _fileHander.fileUploader)({ file: image, type: 'question' });

            case 2:
              _ref6 = _context2.sent;
              url = _ref6.url;
              error = _ref6.error;

              if (!error) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', resolve({ scs: false, msg: error }));

            case 7:

              _orms.Question.create({ name: name, examId: examId, free: free, type: type, image: url });
              return _context2.abrupt('return', resolve({ scs: true, msg: 'Question Created!' }));

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var _createQuestions = exports._createQuestions = function _createQuestions(_ref7) {
  var examId = _ref7.examId,
      questions = _ref7.questions;
  return new Promise(function (resolve) {
    _orms.Exam.findByPk(examId).then(function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(exam) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (exam) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', resolve({ scs: false, msg: 'Error! We dont have such exam.' }));

              case 2:

                Promise.all(questions.map(function (name) {
                  _orms.Question.create({ name: name, examId: examId, free: true, type: 'subjective' });
                })).then(function () {
                  return resolve({ scs: true, msg: 'Success! Questions Created.' });
                }).catch(function () {
                  return resolve({ scs: false, msg: 'Error! Something Went Wrong.' });
                });

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x3) {
        return _ref8.apply(this, arguments);
      };
    }());
  });
};

var _editQuestion = exports._editQuestion = function _editQuestion(_ref9) {
  var id = _ref9.id,
      examId = _ref9.examId,
      name = _ref9.name,
      type = _ref9.type,
      free = _ref9.free,
      image = _ref9.image;
  return new Promise(function (resolve) {
    _orms.Question.findByPk(id).then(function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(question) {
        var _ref11, url, error;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (question) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', resolve({ scs: false, msg: 'What are you going to edit?' }));

              case 2:
                _context4.next = 4;
                return (0, _fileHander.fileUploader)({ file: image, oldFile: question.image, type: 'question' });

              case 4:
                _ref11 = _context4.sent;
                url = _ref11.url;
                error = _ref11.error;

                if (!error) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt('return', resolve({ scs: false, msg: error }));

              case 9:

                question.name = name;
                question.type = type;
                question.free = free;
                question.image = url;
                question.save();
                return _context4.abrupt('return', resolve({ scs: true, msg: 'Question Updated!' }));

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function (_x4) {
        return _ref10.apply(this, arguments);
      };
    }()
    // })
    );
  });
};

var _deleteQuestion = exports._deleteQuestion = function _deleteQuestion(id) {
  return new Promise(function (resolve) {
    _orms.Question.findByPk(id).then(function (question) {
      if (!question) return resolve({ scs: false, msg: 'What are you going to delete?' });

      (0, _fileHander.fileRemover)({ filePath: question.image, type: 'question' });
      question.destroy();
      return resolve({ scs: true, msg: 'Question Deleted!' });
    });
  });
};