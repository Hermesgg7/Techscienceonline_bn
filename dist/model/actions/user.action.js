"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteUser = exports._editUser = exports._createUser = exports._userById = exports._users = exports._resetPassword = exports._forgotPassword = exports._changePassword = exports._signup = exports._signin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelize = require("sequelize");

var _bcrypt = require("bcrypt");

var _mailHandler = require("../../middlewares/mailHandler");

var _tokenHandler = require("../../middlewares/tokenHandler");

var _orms = require("../orms");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _signin = exports._signin = function _signin(_ref) {
  var username = _ref.username,
      password = _ref.password;
  return new Promise(function (resolve, reject) {
    _orms.User.findOne({
      where: {
        username: username
      },
      include: _orms.Account,
      nest: true
    }).then(function (user) {
      if (!user) return resolve({ scs: false, msg: 'Invalid Credential!' });

      if (!(0, _bcrypt.compareSync)(password, user.password)) return resolve({ scs: false, msg: 'Invalid Credential!' });

      if (!user.approved) return resolve({ scs: false, msg: 'You are not approved yet!' });

      if (!!user.lockedOut) return resolve({ scs: false, msg: 'You are locked out!' });

      var token = (0, _tokenHandler.makeToken)({
        payload: _extends({}, user.dataValues, {
          account: _extends({}, user.dataValues.account.dataValues)
        })
      });

      return resolve({ scs: true, msg: "Success! Hi " + user.username, token: token });
    });
  });
};

var _signup = exports._signup = function _signup(data) {
  return new Promise(function (resolve, reject) {
    var firstname = data.firstname,
        lastname = data.lastname,
        email = data.email,
        username = data.username,
        password = data.password,
        membershipId = data.membershipId,
        accountId = data.accountId;

    _orms.User.findOne({ where: { email: email } }).then(function (user) {
      if (!!user) return resolve({ scs: false, msg: 'That email already taken!' });

      _orms.User.findOne({ where: { username: username } }).then(function (user) {
        if (!!user) return resolve({ scs: false, msg: 'That username already taken!' });

        _orms.User.create({ firstname: firstname, lastname: lastname, email: email, username: username, password: password, membershipId: membershipId, accountId: accountId, approved: true }).then(function (user) {
          return resolve({ scs: true, msg: 'Sign up Success!', user: user.dataValues });
        });
      });
    });
  });
};

var _changePassword = exports._changePassword = function _changePassword(_ref2) {
  var id = _ref2.id,
      password = _ref2.password,
      newPassword = _ref2.newPassword;
  return new Promise(function (resolve, reject) {
    _orms.User.findByPk(id).then(function (user) {
      if (!user) return resolve({ scs: false, msg: 'We cant recognize you!' });

      if (!(0, _bcrypt.compareSync)(password, user.password)) return resolve({ scs: false, msg: 'Please provide right password' });

      user.password = newPassword;
      user.save();
      return resolve({ scs: true, msg: 'Password Changed Successfully!' });
    });
  });
};

var _forgotPassword = exports._forgotPassword = function _forgotPassword(_ref3) {
  var email = _ref3.email;
  return new Promise(function (resolve) {
    _orms.User.findOne({ where: { email: email } }).then(function (user) {
      if (!user) return resolve({ scs: true, msg: 'We sent an email to you with reset link.' });

      var resetToken = (0, _tokenHandler.makeToken)({
        payload: { email: user.email },
        expiresIn: '1h'
      });

      user.resetToken = resetToken;
      user.save();
      console.log('resetToken', resetToken);
      (0, _mailHandler.resetMailSender)({ receiver: user.email, resetToken: resetToken });

      return resolve({ scs: true, msg: 'We sent an email to you with reset link.' });
    });
  });
};

var _resetPassword = exports._resetPassword = function _resetPassword(_ref4) {
  var newPassword = _ref4.newPassword,
      confirmPassword = _ref4.confirmPassword,
      resetToken = _ref4.resetToken;
  return new Promise(function (resolve) {
    var email = (0, _tokenHandler.verifyResetToken)(resetToken);

    if (!email) return resolve({ scs: false, msg: 'Error! Invalid Token Provided!' });

    _orms.User.findOne({ where: { email: email } }).then(function (user) {
      if (!user) return resolve({ scs: false, msg: 'Error! Who are you?' });

      if (user.resetToken !== resetToken) return resolve({ scs: false, msg: 'Error! Invalid Token Provided.' });

      user.password = newPassword;
      user.resetToken = null;
      user.save();
      return resolve({ scs: true, msg: 'Success! Password reseted.' });
    });
  });
};

var _users = exports._users = function _users(_ref5) {
  var skip = _ref5.skip,
      limit = _ref5.limit,
      order = _ref5.order,
      sort = _ref5.sort,
      filter = _ref5.filter,
      userId = _ref5.userId,
      userAccountId = _ref5.userAccountId,
      isTeacher = _ref5.isTeacher;
  return new Promise(function (resolve, reject) {
    var where = _extends({}, global.parseJson(filter), {
      id: _defineProperty({}, _sequelize.Op.not, userId)
    });
    if (!!isTeacher) where = _extends({}, where, {
      accountId: userAccountId,
      roleId: 3
    });

    var orderBy = [order, sort];
    switch (order) {
      case 'fullname':
        orderBy = ['firstname', sort];
        break;

      case 'account.name':
        orderBy = [_orms.Account, 'name', sort];
        break;

      case 'role.name':
        orderBy = [_orms.Role, 'name', sort];
        break;

      default:
        break;
    }

    _orms.User.findAndCountAll({
      where: where,
      order: [[].concat(_toConsumableArray(orderBy))],
      offset: skip,
      limit: limit,
      include: [_orms.Membership, _orms.Account, _orms.Role],
      nest: true
    }).then(function (_ref6) {
      var count = _ref6.count,
          rows = _ref6.rows;

      return resolve({ users: rows, totalCount: count });
    });
  });
};

var _userById = exports._userById = function _userById(id) {
  return new Promise(function (resolve, reject) {
    _orms.User.findByPk(id).then(function (user) {
      return resolve(user);
    });
  });
};

var _createUser = exports._createUser = function _createUser(_ref7) {
  var firstname = _ref7.firstname,
      lastname = _ref7.lastname,
      username = _ref7.username,
      email = _ref7.email,
      password = _ref7.password,
      roleId = _ref7.roleId,
      accountId = _ref7.accountId,
      membershipId = _ref7.membershipId,
      approved = _ref7.approved,
      lockedOut = _ref7.lockedOut,
      userAccountId = _ref7.userAccountId,
      isTeacher = _ref7.isTeacher;
  return new Promise(function (resolve, reject) {
    _orms.User.findOne({ where: { email: email } }).then(function (user) {
      if (!!user) return resolve({ scs: false, msg: 'That email already taken!' });

      _orms.User.findOne({ where: { username: username } }).then(function (user) {
        if (!!user) return resolve({ scs: false, msg: 'That username already taken!' });

        _orms.User.create({
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          password: password,
          membershipId: membershipId,
          accountId: !isTeacher ? accountId : userAccountId,
          roleId: !isTeacher ? roleId : 3,
          approved: approved,
          lockedOut: lockedOut
        }).then(function (user) {
          return resolve({ scs: true, msg: 'User Created!' });
        });
      });
    });
  });
};

var _editUser = exports._editUser = function _editUser(_ref8) {
  var id = _ref8.id,
      firstname = _ref8.firstname,
      lastname = _ref8.lastname,
      username = _ref8.username,
      roleId = _ref8.roleId,
      membershipId = _ref8.membershipId,
      accountId = _ref8.accountId,
      approved = _ref8.approved,
      lockedOut = _ref8.lockedOut,
      userId = _ref8.userId,
      userAccountId = _ref8.userAccountId,
      isTeacher = _ref8.isTeacher;
  return new Promise(function (resolve, reject) {
    if (id === userId) return resolve({ scs: false, msg: 'You cant edit yourself!' });

    var where = { id: id };

    if (!!isTeacher) {
      where = _extends({}, where, {
        accountId: userAccountId,
        roleId: 3
      });

      accountId = userAccountId;
      roleId = 3;
    }

    _orms.User.findOne({ where: where }).then(function (user) {
      if (!user) return resolve({ scs: false, msg: 'What are you going to edit?' });

      _orms.User.findOne({ where: { username: username } }).then(function (exist) {
        if (!!exist && user.username !== username) return resolve({ scs: false, msg: 'That username already exists!' });

        _orms.Membership.findByPk(membershipId).then(function (membership) {
          if (!membership) return resolve({ scs: false, msg: 'We dont have such membership!' });

          _orms.Account.findByPk(accountId).then(function (account) {
            if (!account) return resolve({ scs: false, msg: 'We dont have such account!' });

            _orms.Role.findByPk(roleId).then(function (role) {
              if (!roleId) return resolve({ scs: false, msg: 'We dont have such role!' });

              _orms.User.update(_defineProperty({
                firstname: firstname,
                lastname: lastname,
                username: username,
                roleId: roleId,
                membershipId: membershipId,
                accountId: !isTeacher ? accountId : userAccountId,
                approved: approved,
                lockedOut: lockedOut
              }, "roleId", !isTeacher ? roleId : 3), {
                where: { id: id }
              }).then(function (user) {
                return resolve({ scs: true, msg: 'User updated!' });
              });
            });
          });
        });
      });
    });
  });
};

var _deleteUser = exports._deleteUser = function _deleteUser(_ref9) {
  var id = _ref9.id,
      userId = _ref9.userId,
      userAccountId = _ref9.userAccountId,
      isTeacher = _ref9.isTeacher;
  return new Promise(function (resolve, reject) {
    if (id === userId) return resolve({ scs: false, msg: 'You cant delete yourself!' });

    var where = { id: id };

    if (!!isTeacher) where = _extends({}, where, {
      accountId: userAccountId,
      roleId: 3
    });

    _orms.User.findOne({ where: where }).then(function (user) {
      if (!user) return resolve({ scs: false, msg: 'What are you going to delete?' });

      user.destroy();
      return resolve({ scs: true, msg: 'User Deleted!', user: user.dataValues });
    });
  });
};