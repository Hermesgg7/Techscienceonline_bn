'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteChoice = exports._editChoice = exports._createChoice = exports._choices = undefined;

var _orms = require('../orms');

var _choices = exports._choices = function _choices(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve, reject) {
    _orms.Choice.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ choices: rows, totalCount: count });
    });
  });
};

var _createChoice = exports._createChoice = function _createChoice(_ref3) {
  var name = _ref3.name,
      questionId = _ref3.questionId,
      correct = _ref3.correct,
      comment = _ref3.comment;
  return new Promise(function (resolve, reject) {
    _orms.Question.findOne({
      where: {
        id: questionId,
        type: 'objective'
      }
    }).then(function (question) {
      if (!question) return resolve({ scs: false, msg: 'We dont have such question.' });

      // Choice.findOne({ where: { questionId } }).then(choice => {
      //   if (!!choice)
      //     return resolve({ scs: false, msg: 'That Choice already exists!' })

      _orms.Choice.create({ name: name, questionId: questionId, correct: correct, comment: comment }).then(function (choice) {
        return resolve({ scs: true, msg: 'Choice Created!' });
      }).catch(function (err) {
        return resolve({ scs: true, msg: 'Oops! something went wrong.' });
      });

      // })
    });
  });
};

var _editChoice = exports._editChoice = function _editChoice(_ref4) {
  var id = _ref4.id,
      questionId = _ref4.questionId,
      name = _ref4.name,
      correct = _ref4.correct,
      comment = _ref4.comment;
  return new Promise(function (resolve, reject) {
    _orms.Choice.findByPk(id).then(function (choice) {
      if (!choice) return resolve({ scs: false, msg: 'What are you going to edit?' });

      // Choice.findOne({ where: { questionId } }).then(exist => {
      //   if (!!exist && choice.name !== name)
      //     return resolve({ scs: false, msg: 'That Choice already exists' })

      choice.name = name;
      choice.correct = correct;
      choice.comment = comment;
      choice.save();
      return resolve({ scs: true, msg: 'Choice Updated!' });
      // })
    });
  });
};

var _deleteChoice = exports._deleteChoice = function _deleteChoice(id) {
  return new Promise(function (resolve, reject) {
    _orms.Choice.findByPk(id).then(function (choice) {
      if (!choice) return resolve({ scs: false, msg: 'What are you going to delete?' });

      choice.destroy();
      return resolve({ scs: true, msg: 'Choice Deleted!' });
    });
  });
};