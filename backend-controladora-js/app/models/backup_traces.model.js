module.exports = (sequelize, Sequelize) => {
  const Backup_traces = sequelize.define("backup_traces", {
    id_backup: {
      type: Sequelize.INTEGER
    },
    last_status: {
      type: Sequelize.STRING
    }
  });

  return Backup_traces;
};
