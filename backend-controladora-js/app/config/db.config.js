module.exports = {
  HOST: process.env.ABKP_DB_HOST,
  USER: process.env.ABKP_DB_USER,
  PASSWORD: process.env.ABKP_DB_PASS,
  DB: process.env.ABKP_DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
