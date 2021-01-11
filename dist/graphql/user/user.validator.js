"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = undefined;

var _apolloServerExpress = require("apollo-server-express");

var _passwordValidator = require("password-validator");

var _passwordValidator2 = _interopRequireDefault(_passwordValidator);

var _validator = require("validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passwordSchema = new _passwordValidator2.default().is().min(6).has().letters().has().digits().has().symbols().has().not().spaces();

var validators = exports.validators = {

  Mutation: {

    createUser: function createUser(resolve, parent, _ref, context) {
      var createUserReq = _ref.createUserReq;
      var email = createUserReq.email,
          password = createUserReq.password,
          confirmPassword = createUserReq.confirmPassword;


      if (!(0, _validator.isEmail)(email)) throw new _apolloServerExpress.UserInputError('You must provide exact email address!');

      if (password != confirmPassword) throw new _apolloServerExpress.UserInputError('Password not match!');

      if (!passwordSchema.validate(password)) throw new _apolloServerExpress.UserInputError('Password is not strong enough!');

      return resolve(parent, { createUserReq: createUserReq }, context);
    },

    editUser: function editUser(resolve, parent, _ref2, context) {
      var editUserReq = _ref2.editUserReq;
      var email = editUserReq.email;


      if (!(0, _validator.isEmail)(email)) throw new _apolloServerExpress.UserInputError('You must provide exact email address!');

      return resolve(parent, { editUserReq: editUserReq }, context);
    }
  }
};