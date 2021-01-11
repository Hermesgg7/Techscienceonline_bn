"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteShape = exports._createShape = exports._shapes = undefined;

var _orms = require("../orms");

var _fileHander = require("../../middlewares/fileHander");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _shapes = exports._shapes = function _shapes(_ref) {
  var skip = _ref.skip,
      limit = _ref.limit,
      order = _ref.order,
      sort = _ref.sort,
      filter = _ref.filter;
  return new Promise(function (resolve) {
    _orms.Shape.findAndCountAll({
      where: global.parseJson(filter),
      order: [[order, sort]],
      offset: skip,
      limit: limit
    }).then(function (_ref2) {
      var count = _ref2.count,
          rows = _ref2.rows;

      return resolve({ totalCount: count, shapes: rows });
    });
  });
};

var _createShape = exports._createShape = function _createShape(_ref3) {
  var image = _ref3.image,
      type = _ref3.type,
      userId = _ref3.userId;
  return new Promise(function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var _ref5, url, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fileHander.fileUploader)({ file: image, type: 'shape' });

            case 2:
              _ref5 = _context.sent;
              url = _ref5.url;
              error = _ref5.error;

              if (!error) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", resolve({ scs: false, msg: error }));

            case 7:

              _orms.Shape.create({ image: url, type: type, userId: userId }).then(function () {
                return resolve({ scs: true, msg: 'Shape Uploaded!' });
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }());
};

var _deleteShape = exports._deleteShape = function _deleteShape(_ref6) {
  var id = _ref6.id,
      userId = _ref6.userId;
  return new Promise(function (resolve) {
    _orms.Shape.findByPk(id).then(function (shape) {
      if (!shape) return resolve({ scs: false, msg: 'What are you going to delete?' });

      (0, _fileHander.fileRemover)({ filePath: shape.image, type: 'shape' });
      shape.destroy();
      return resolve({ scs: true, msg: 'Shape Deleted!' });
    });
  });
};