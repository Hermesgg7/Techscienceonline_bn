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

var passwordSchema = new _passwordValidator2.default().is().min(6).has().uppercase().has().letters().has().digits().has().symbols().has().not().spaces();

var validators = exports.validators = {

  Mutation: {

    signup: function signup(resolve, obj, _ref, ctx) {
      var signupReq = _ref.signupReq;
      var email = signupReq.email,
          password = signupReq.password,
          confirmPassword = signupReq.confirmPassword;


      if (!(0, _validator.isEmail)(email)) throw new _apolloServerExpress.UserInputError('You must provide exact email address!');

      if (password != confirmPassword) throw new _apolloServerExpress.UserInputError('Password not match!');

      if (!passwordSchema.validate(password)) throw new _apolloServerExpress.UserInputError('Password is not strong enough!');

      return resolve(obj, { signupReq: signupReq }, ctx);
    },

    changePassword: function changePassword(resolve, obj, _ref2, ctx) {
      var changePasswordReq = _ref2.changePasswordReq;
      var newPassword = changePasswordReq.newPassword,
          confirmPassword = changePasswordReq.confirmPassword;


      if (newPassword !== confirmPassword) throw new _apolloServerExpress.UserInputError('Password not match!');

      if (!passwordSchema.validate(newPassword)) throw new _apolloServerExpress.UserInputError('Password is not strong enough!');

      return resolve(obj, { changePasswordReq: changePasswordReq }, ctx);
    },

    forgotPassword: function forgotPassword(resolve, obj, _ref3, ctx) {
      var forgotPasswordReq = _ref3.forgotPasswordReq;
      var email = forgotPasswordReq.email;


      if (!(0, _validator.isEmail)(email)) throw new _apolloServerExpress.UserInputError('You must provide exact email address!');

      return resolve(obj, { forgotPasswordReq: forgotPasswordReq }, ctx);
    },

    resetPassword: function resetPassword(resolve, obj, _ref4, ctx) {
      var resetPasswordReq = _ref4.resetPasswordReq;
      var newPassword = resetPasswordReq.newPassword,
          confirmPassword = resetPasswordReq.confirmPassword;


      if (newPassword !== confirmPassword) throw new _apolloServerExpress.UserInputError('Password not match!');

      if (!passwordSchema.validate(newPassword)) throw new _apolloServerExpress.UserInputError('Password is not strong enough!');

      return resolve(obj, { resetPasswordReq: resetPasswordReq }, ctx);
    }
  }
};