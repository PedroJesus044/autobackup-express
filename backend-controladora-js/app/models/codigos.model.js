module.exports = (sequelize, Sequelize) => {
  const Codigo = sequelize.define("codigos", {
    id_backup: {
      type: Sequelize.INTEGER
    },
    no_bloque: {
      type: Sequelize.INTEGER
    },
    no_linea: {
      type: Sequelize.INTEGER
    },
    linea: {
      type: Sequelize.STRING
    },
    run_as_sudo: {
      type: Sequelize.BOOLEAN
    },
    paralelo: {
      type: Sequelize.BOOLEAN
    },
    fault_tolerant: {
      type: Sequelize.BOOLEAN
    }
  });

  return Codigo;
};