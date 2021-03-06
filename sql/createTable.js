import dotenv from 'dotenv';
const Sequelize = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(process.env.sqlUrl, {
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const tables = {
  userdata: {},
  sitedata: {},
  comments: {},
  tags: {},
  taglinks: {},
};

var createTable = (tableName = 'userdata') => {
  const Table = sequelize.define(tableName, tables[tableName], {});
  return Table;
};

tables.userdata = {
  id: {
    type: Sequelize.STRING(30),
    allowNull: false,
    primaryKey: true,
  },
  nickname: {
    type: Sequelize.STRING(20),
    unique: true,
  },
  password: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },
};
const userdata = createTable('userdata');
userdata.sync({ force: false });

tables.sitedata = {
  siteid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sitename: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  imagelink: {
    type: Sequelize.STRING(255),
  },
};
const sitedata = createTable('sitedata');
sitedata.sync({ force: false });

tables.tags = {
  tagid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tagname: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true,
  },
};
const tags = createTable('tags');
tags.sync({ force: false });

tables.comments = {
  commentid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  posttime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
  },
  id: {
    type: Sequelize.STRING(30),
    references: {
      model: userdata,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  siteid: {
    type: Sequelize.INTEGER,
    references: {
      model: sitedata,
      key: 'siteid',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
};
const comments = createTable('comments');
comments.sync({ force: false });

tables.taglinks = {
  taglinkid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tagid: {
    type: Sequelize.INTEGER,
    references: {
      model: tags,
      key: 'tagid',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  siteid: {
    type: Sequelize.INTEGER,
    references: {
      model: sitedata,
      key: 'siteid',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
};
const taglinks = createTable('taglinks');
taglinks.sync({ force: false });

tables.linkdata = {
  tagname: {
    type: Sequelize.STRING(30),
    primaryKey: true,
  },
  sitename: {
    type: Sequelize.STRING(30),
  },
  link: {
    type: Sequelize.STRING(255),
  },
  description: {
    type: Sequelize.STRING(255),
  },
  imagelink: {
    type: Sequelize.STRING(255),
  },
};
const linkdata = createTable('linkdata');
linkdata.sync();

tables.tagdata = {
  sitename: {
    type: Sequelize.STRING(30),
    primaryKey: true,
  },
  link: {
    type: Sequelize.STRING(255),
  },
  description: {
    type: Sequelize.STRING(255),
  },
  imagelink: {
    type: Sequelize.STRING(255),
  },
  tags: {
    type: Sequelize.JSON,
  },
};
const tagdata = createTable('tagdata');
tagdata.sync();

const tableList = {
  userdata: userdata,
  sitedata: sitedata,
  tags: tags,
  comments: comments,
  taglinks: taglinks,
  linkdata: linkdata,
  tagdata: tagdata,
};

export default tableList;
