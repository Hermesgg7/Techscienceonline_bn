'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _graphql = require('./graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _dbInstance = require('./middlewares/dbInstance');

var _dbInstance2 = _interopRequireDefault(_dbInstance);

var _appMiddleware = require('./middlewares/appMiddleware');

var _appMiddleware2 = _interopRequireDefault(_appMiddleware);

var _web = require('./routes/web');

var _web2 = _interopRequireDefault(_web);

var _parseJson = require('./middlewares/parseJson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
global.parseJson = _parseJson.parseJson;

var app = new _express2.default();
app.use(_appMiddleware2.default);
app.use('/', _express2.default.static('public/main'));
app.use('/upload', _express2.default.static('public/upload'));
app.use('/techscratch', _express2.default.static('public/techscratch'));
app.use('*', _web2.default);

_dbInstance2.default.authenticate().then(function () {
  console.log('database connected');
}).catch(function (err) {
  return console.log(err);
});

_graphql2.default.applyMiddleware({
  app: app,
  path: '/api'
});

var PORT = process.env.PORT || 3333;
app.listen(PORT, function () {
  console.log('server is running on port : ' + PORT + ', ' + _graphql2.default.graphqlPath);
});