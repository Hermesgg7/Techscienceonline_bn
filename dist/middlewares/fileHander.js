"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileRemover = exports.fileUploader = undefined;

var _fs = require("fs");

var _path = require("path");

var _cryptoRandomString = require("crypto-random-string");

var _cryptoRandomString2 = _interopRequireDefault(_cryptoRandomString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var uploadDir = (0, _path.join)(__dirname, '../../public/upload/images');
var questionDir = (0, _path.join)(uploadDir, 'questions');
var shapeDir = (0, _path.join)(uploadDir, 'shapes');
var accountDir = (0, _path.join)(uploadDir, 'logos');

var fileUploader = exports.fileUploader = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var file = _ref2.file,
        oldFile = _ref2.oldFile,
        type = _ref2.type;

    var _ref3, createReadStream, filename, mimetype, _getWritePath, fileName, writePath, writeStream;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (file) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", { url: null });

          case 2:
            _context.next = 4;
            return file;

          case 4:
            _ref3 = _context.sent;
            createReadStream = _ref3.createReadStream;
            filename = _ref3.filename;
            mimetype = _ref3.mimetype;

            if (!(mimetype.indexOf('image') < 0)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", { error: 'Error! You must provide only image file' });

          case 10:

            if (!!oldFile) fileRemover(oldFile);

            _getWritePath = getWritePath({ filename: filename, type: type }), fileName = _getWritePath.fileName, writePath = _getWritePath.writePath;
            writeStream = (0, _fs.createWriteStream)(writePath);

            createReadStream().pipe(writeStream);
            return _context.abrupt("return", { url: fileName });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fileUploader(_x) {
    return _ref.apply(this, arguments);
  };
}();

var fileRemover = exports.fileRemover = function fileRemover(_ref4) {
  var filePath = _ref4.filePath,
      type = _ref4.type;

  if (!filePath) return;

  var realPath = getRemovePath({ filePath: filePath, type: type });

  try {
    if (!(0, _fs.existsSync)(realPath)) return;

    return (0, _fs.unlinkSync)(realPath);
  } catch (error) {
    console.log('file remove err', error);
    return;
  }
};

var fileNameGenrator = function fileNameGenrator(filename) {
  var extension = filename.split('.').pop();
  var randomString = (0, _cryptoRandomString2.default)({ length: 20 });
  return randomString + "." + extension;
};

var getWritePath = function getWritePath(_ref5) {
  var filename = _ref5.filename,
      type = _ref5.type;

  var fileName = fileNameGenrator(filename);
  var writePath = '';

  switch (type) {
    case 'question':
      writePath = (0, _path.join)(questionDir, fileName);
      break;

    case 'shape':
      writePath = (0, _path.join)(shapeDir, fileName);
      break;

    case 'account':
      writePath = (0, _path.join)(accountDir, fileName);
      break;

    default:
      writePath = (0, _path.join)(questionDir, fileName);
      break;
  }

  return { fileName: fileName, writePath: writePath };
};

var getRemovePath = function getRemovePath(_ref6) {
  var filePath = _ref6.filePath,
      type = _ref6.type;

  switch (type) {
    case 'question':
      return (0, _path.join)(questionDir, filePath);

    case 'shape':
      return (0, _path.join)(shapeDir, filePath);

    default:
      return (0, _path.join)(questionDir, filePath);
  }
};