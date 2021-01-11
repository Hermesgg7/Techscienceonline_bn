'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteAccount = exports._editAccountImage = exports._editAccount = exports._createAccount = exports._accountById = exports._accounts = undefined;

var _regeneratorRuntime = require('regenerator-runtime');

var _sequelize = require('sequelize');

var _orms = require('../orms');

var _fileHander = require('../../middlewares/fileHander');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _accounts = exports._accounts = function _accounts(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve, reject) {
    _orms.Account.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var count = _ref3.count,
            rows = _ref3.rows;
        var i, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < rows.length)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return _orms.User.findByPk(rows[i].userId);

              case 4:
                user = _context.sent;

                rows[i].user = user;

              case 6:
                i++;
                _context.next = 1;
                break;

              case 9:
                return _context.abrupt('return', resolve({ accounts: rows, totalCount: count }));

              case 10:
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

var _accountById = exports._accountById = function _accountById(id) {
  return new Promise(function (resolve, reject) {
    _orms.Account.findByPk(id).then(function (account) {
      _orms.User.findByPk(account.userId).then(function (user) {
        account.user = user;
        return resolve(account);
      });
    });
  });
};

var _createAccount = exports._createAccount = function _createAccount(_ref4) {
  var name = _ref4.name,
      userId = _ref4.userId;
  return new Promise(function (resolve, reject) {
    _orms.Account.findOne({ where: { name: name } }).then(function (account) {
      if (!!account) return resolve({ scs: false, msg: 'That account already exists!' });

      if (!!userId) {
        return _orms.User.findByPk(userId).then(function (user) {
          if (!user) return resolve({ scs: false, msg: 'That user doesnt exists!' });

          _orms.Account.create({ name: name, userId: userId }).then(function (account) {
            return resolve({ scs: true, msg: 'Account Created!', account: account.dataValues });
          });
        });
      }

      return _orms.Account.create({ name: name }).then(function (account) {
        return resolve({ scs: true, msg: 'Account Created!', account: account.dataValues });
      });
    });
  });
};

var _editAccount = exports._editAccount = function _editAccount(_ref5) {
  var id = _ref5.id,
      name = _ref5.name,
      userId = _ref5.userId;
  return new Promise(function (resolve, reject) {
    _orms.Account.findByPk(id).then(function (account) {
      if (!account) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.Account.findOne({ where: { name: name } }).then(function (exist) {
        if (!!exist && account.name != name) return resolve({ scs: false, msg: 'That account already exists' });

        if (!!userId) return _orms.User.findByPk(userId).then(function (user) {
          if (!user) return resolve({ scs: false, msg: 'That user doesnt exist' });

          account.name = name;
          account.userId = userId;
          account.save();
          return resolve({ scs: true, msg: 'Account Updated!', account: account.dataValues });
        });

        account.name = name;
        account.userId = userId;
        account.save();
        return resolve({ scs: true, msg: 'Account Updated!', account: account.dataValues });
      });
    });
  });
};

var _editAccountImage = exports._editAccountImage = function _editAccountImage(_ref6) {
  var image = _ref6.image,
      user = _ref6.user;
  return new Promise(function (resolve) {
    if (user.id !== user.account.userId) return resolve({ scs: false, msg: 'Error! You are not account admin.' });

    _orms.Account.findByPk(user.account.id).then(function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(account) {
        var _ref8, url, error;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (account) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', resolve({ scs: false, msg: 'Error! where are you from?' }));

              case 2:
                _context2.next = 4;
                return (0, _fileHander.fileUploader)({ file: image, type: 'account' });

              case 4:
                _ref8 = _context2.sent;
                url = _ref8.url;
                error = _ref8.error;

                if (!error) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', resolve({ scs: false, msg: error }));

              case 9:

                account.image = url;
                account.save();
                return _context2.abrupt('return', resolve({ scs: true, msg: 'Success! School Logo Updated. Please sign in again to see change. ' }));

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }());
  });
};

var _deleteAccount = exports._deleteAccount = function _deleteAccount(id) {
  return new Promise(function (resolve, reject) {
    _orms.Account.findByPk(id).then(function (account) {
      if (!account) return resolve({ scs: false, msg: 'What are you going to delete?' });

      account.destroy();
      return resolve({ scs: true, msg: 'Success! Account Deleted.', account: account.dataValues });
    });
  });
};