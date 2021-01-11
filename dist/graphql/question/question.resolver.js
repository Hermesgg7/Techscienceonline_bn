"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _fs = require("fs");

var _question = require("../../model/actions/question.action");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var typeDefs = exports.typeDefs = (0, _fs.readFileSync)(__dirname + "/question.graphql", 'utf8');

var resolvers = exports.resolvers = {

  Query: {

    questions: function questions(parent, _ref, ctx, info) {
      var paginateReq = _ref.paginateReq;

      return (0, _question._questions)(paginateReq).then(function (_ref2) {
        var questions = _ref2.questions,
            totalCount = _ref2.totalCount;

        return { questions: questions, totalCount: totalCount };
      });
    }
  },

  Mutation: {

    createQuestion: function createQuestion(parent, _ref3, ctx, info) {
      var createQuestionReq = _ref3.createQuestionReq;

      return (0, _question._createQuestion)(createQuestionReq).then(function (_ref4) {
        var scs = _ref4.scs,
            msg = _ref4.msg;

        return { scs: scs, msg: msg };
      });
    },

    createQuestions: function createQuestions(parent, _ref5, ctx, info) {
      var createQuestionsReq = _ref5.createQuestionsReq;

      return (0, _question._createQuestions)(createQuestionsReq).then(function (result) {
        return result;
      });
    },

    editQuestion: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref7, ctx, info) {
        var editQuestionReq = _ref7.editQuestionReq;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", (0, _question._editQuestion)(editQuestionReq).then(function (_ref8) {
                  var scs = _ref8.scs,
                      msg = _ref8.msg;

                  return { scs: scs, msg: msg };
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function editQuestion(_x, _x2, _x3, _x4) {
        return _ref6.apply(this, arguments);
      };
    }(),

    deleteQuestion: function deleteQuestion(parent, _ref9, ctx, info) {
      var id = _ref9.id;

      return (0, _question._deleteQuestion)(id).then(function (_ref10) {
        var scs = _ref10.scs,
            msg = _ref10.msg;

        return { scs: scs, msg: msg };
      });
    }
  }
};