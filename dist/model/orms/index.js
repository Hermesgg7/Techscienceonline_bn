"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Book = exports.Answer = exports.Result = exports.Choice = exports.Question = exports.Exam = exports.Level = exports.Course = exports.Subject = exports.Role = exports.Membership = exports.User = exports.Account = undefined;

var _sequelize = require("sequelize");

var _bcrypt = require("bcrypt");

var _dbInstance = require("../../middlewares/dbInstance");

var _dbInstance2 = _interopRequireDefault(_dbInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define models
var Account = _dbInstance2.default.define('account', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  userId: {
    type: _sequelize.DataTypes.INTEGER
  },
  image: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: 'school-logo.png'
  }
}, {
  tableName: 'nAccounts'
});

var User = _dbInstance2.default.define('user', {
  firstname: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    set: function set(value) {
      this.setDataValue('password', (0, _bcrypt.hashSync)(value, (0, _bcrypt.genSaltSync)(10)));
    }
  },
  resetToken: _sequelize.DataTypes.STRING,
  approved: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  lockedOut: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  fullname: {
    type: _sequelize.DataTypes.VIRTUAL,
    get: function get() {
      return this.firstname + " " + this.lastname;
    },
    set: function set() {
      throw new Error('Cant set this value manually!');
    }
  }
}, {
  tableName: 'nUsers'
});

var Membership = _dbInstance2.default.define('membership', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'nMemberships',
  timestamps: false
});

var Role = _dbInstance2.default.define('role', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'nRoles',
  timestamps: false
});

var Subject = _dbInstance2.default.define('subject', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'nSubjects',
  timestamps: false
});

var Course = _dbInstance2.default.define('course', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'nCourses'
});

var Level = _dbInstance2.default.define('level', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'nLevels',
  timestamps: false
});

var Exam = _dbInstance2.default.define('exam', {
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'nExams'
});

var Question = _dbInstance2.default.define('question', {
  name: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  free: {
    type: _sequelize.DataTypes.BOOLEAN
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  tableName: 'nQuestions'
});

var Choice = _dbInstance2.default.define('choice', {
  name: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  comment: {
    type: _sequelize.DataTypes.STRING
  },
  correct: {
    type: _sequelize.DataTypes.BOOLEAN
  }
}, {
  tableName: 'nChoices'
});

var Result = _dbInstance2.default.define('result', {
  totalQuestion: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 0
  },
  attempedQuestion: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 0
  },
  requestedAt: {
    type: _sequelize.DataTypes.DATE
  },
  assignedAt: {
    type: _sequelize.DataTypes.DATE
  },
  tookAt: {
    type: _sequelize.DataTypes.DATE
  },
  grade: {
    type: _sequelize.DataTypes.INTEGER
  }
}, {
  tableName: 'nResults',
  timestamps: false
});

var Answer = _dbInstance2.default.define('answer', {
  answer: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  grade: _sequelize.DataTypes.INTEGER,
  comment: _sequelize.DataTypes.STRING
}, {
  tableName: 'nAnswers',
  timestamps: false
});

var Book = _dbInstance2.default.define('book', {
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  matter: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'nBooks'
});

// define relations
Account.hasMany(User);
User.belongsTo(Account);

Membership.hasMany(User);
User.belongsTo(Membership);

Role.hasMany(User);
User.belongsTo(Role, {
  foreignKey: {
    defaultValue: 3,
    allowNull: false
  }
});

Subject.hasMany(Course);
Course.belongsTo(Subject);

Subject.hasMany(Exam);
Course.hasMany(Exam);
Level.hasMany(Exam);
Account.hasMany(Exam);
Exam.belongsTo(Subject);
Exam.belongsTo(Course);
Exam.belongsTo(Level);
Exam.belongsTo(Account);

Exam.hasMany(Question);
Question.belongsTo(Exam);

Question.hasMany(Choice);
Choice.belongsTo(Question);

Exam.hasMany(Result);
User.hasMany(Result);
Result.belongsTo(Exam);
Result.belongsTo(User);

Result.hasMany(Answer);
Question.hasMany(Answer);
Answer.belongsTo(Result);
Answer.belongsTo(Question);

User.hasMany(Book);
Book.belongsTo(User);

exports.Account = Account;
exports.User = User;
exports.Membership = Membership;
exports.Role = Role;
exports.Subject = Subject;
exports.Course = Course;
exports.Level = Level;
exports.Exam = Exam;
exports.Question = Question;
exports.Choice = Choice;
exports.Result = Result;
exports.Answer = Answer;
exports.Book = Book;