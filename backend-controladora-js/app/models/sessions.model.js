module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("sessions", {
    id_user: {
      type: Sequelize.BIGINT,
      unique: true,
    },
    session: {
      type: Sequelize.STRING
    }
  });

  return Users;
};
