const { or } = require("sequelize");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_backup || !req.body.port || !req.body.reintentos_maximos) {
    res.status(400).send({
      message: "Faltan argumentos"
    });
    return;
  }

  // Create a Tutorial
  const metadata = {
    id_backup: req.body.id_backup,
    ruta_respaldo: req.body.ruta_respaldo,
    ip_servidor: req.body.ip_servidor,
    ip_nas: req.body.ip_nas,
    rash: req.body.rash,
    user_servidor: req.body.user_servidor,
    pw_servidor: req.body.pw_servidor,
    port: req.body.port,
    reintentos_maximos: req.body.reintentos_maximos
  };

  // Save Tutorial in the database
  User.create(metadata)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No encontramos una línea de código con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error línea de código con id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.getMetadataFromBackup = (req, res) => {
  console.log(req.query)
  // Validate request
  if (!req.query.id_backup) {
    res.status(400).send({
      message: "Content can not be empty! - Code from Backup"
    });
    return;
  }

  User.findOne({ where: { id_backup: req.query.id_backup } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

/*// find all published Tutorial
exports.getAllCodeFromBackupBlock = (req, res) => {
  // Validate request
  if (!req.body.id_backup || !req.body.no_bloque) {
    res.status(400).send({
      message: "Content can not be empty! - Code from BackupBlock"
    });
    return;
  }

  Metadata.findAll({ where: { id_backup: req.body.id_backup, no_bloque: req.body.no_bloque} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
*/