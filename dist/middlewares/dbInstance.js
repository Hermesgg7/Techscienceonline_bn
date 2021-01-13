'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var sequelize = new _sequelize.Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'WTINSTANCE',
    options: {
      useUTC: false,
      dateFirst: 1
    }
  },
  logging: false
});

exports.default = sequelize;