module.exports = (sequelize, Sequelize) => {
  const File_traces = sequelize.define("file_traces", {
    id_backup: {
      type: Sequelize.INTEGER
    },
    file: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.INTEGER
    },
    id_backup: {
      type: Sequelize.BIGINT
    }
  });

  return File_traces;
};
