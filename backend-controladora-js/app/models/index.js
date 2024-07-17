const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.codigo = require("./codigos.model.js")(sequelize, Sequelize);
db.backup = require("./backups.model.js")(sequelize, Sequelize);
db.metadata = require("./metadatas.model.js")(sequelize, Sequelize);
db.file_trace = require("./file_traces.model.js")(sequelize, Sequelize);
db.backup_trace = require("./backup_traces.model.js")(sequelize, Sequelize);
db.user = require("./users.model.js")(sequelize, Sequelize);
db.session = require("./sessions.model.js")(sequelize, Sequelize);

module.exports = db;
