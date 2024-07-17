module.exports = (sequelize, Sequelize) => {
  const Codigo = sequelize.define("metadatas", {
    id_backup: {
      type: Sequelize.INTEGER
    },
    ruta_respaldo: {
      type: Sequelize.STRING
    },
    ip_servidor: {
      type: Sequelize.STRING
    },
    ip_nas: {
      type: Sequelize.STRING
    },
    rash: {
      type: Sequelize.STRING
    },
    user_servidor: {
      type: Sequelize.STRING
    },
    pw_servidor: {
      type: Sequelize.STRING
    },
    port: {
      type: Sequelize.INTEGER
    },
    reintentos_maximos: {
      type: Sequelize.INTEGER
    }
  });

  return Codigo;
};
