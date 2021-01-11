'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var sequelize = new _sequelize.Sequelize('TechScienceMVC', 'sa', 'Brutarwt@85', {
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