module.exports = (sequelize, Sequelize) => {
  const Backups = sequelize.define("backups", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Backups;
};
