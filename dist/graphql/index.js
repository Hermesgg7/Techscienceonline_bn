"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require("apollo-server-express");

var _graphqlDepthLimit = require("graphql-depth-limit");

var _graphqlDepthLimit2 = _interopRequireDefault(_graphqlDepthLimit);

var _graphqlValidationComplexity = require("graphql-validation-complexity");

var _graphqlTools = require("graphql-tools");

var _graphqlMiddleware = require("graphql-middleware");

var _graphqlShield = require("graphql-shield");

var _tokenHandler = require("../middlewares/tokenHandler");

var _typeDefs = require("./typeDefs");

var _resolvers = require("./resolvers");

var _validators = require("./validators");

var _permissions = require("./permissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = (0, _graphqlMiddleware.applyMiddleware)((0, _graphqlTools.makeExecutableSchema)({ typeDefs: _typeDefs.typeDefs, resolvers: _resolvers.resolvers }), _validators.validators, (0, _graphqlShield.shield)(_permissions.permissions, {
  allowExternalErrors: true,
  fallbackError: new _apolloServerExpress.ForbiddenError('Not Authorized!')
}));

var server = new _apolloServerExpress.ApolloServer({
  schema: schema,
  context: function context(_ref) {
    var req = _ref.req,
        res = _ref.res;

    var ctx = {};
    ctx.user = (0, _tokenHandler.verifyToken)(req);
    return ctx;
  },
  introspection: true,
  validationRules: [(0, _graphqlDepthLimit2.default)(10), (0, _graphqlValidationComplexity.createComplexityLimitRule)(10000)]
});

exports.default = server;