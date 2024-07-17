const db = require("../models");
const Codigo = db.codigo;
const Op = db.Sequelize.Op;


// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_codigo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const codigo = {
    id       : req.body.id,
    id_backup: req.body.id_backup,
    no_linea:  req.body.no_linea,
    linea:     req.body.linea,
    run_as_sudo: req.body.run_as_sudo ? req.body.run_as_sudo : false,
    paralelo: req.body.paralelo ? req.body.paralelo : false,
    createdAt       : req.body.createdAt,
    updatedAt       : req.body.updatedAt,
  };

  // Save Tutorial in the database
  Codigo.create(codigo)
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

  Codigo.findAll({ where: condition })
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

  Codigo.findByPk(id)
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

  Codigo.update(req.body, {
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

exports.updateParallelism = (req, res) => {
  const id_backup = req.body.id_backup;
  const no_bloque = req.body.no_bloque;
  const paralelo  = req.body.paralelo;

  Codigo.update({paralelo: paralelo}, {
    where: { id_backup: id_backup,  no_bloque: no_bloque}
  })
    .then(num => {
      if (num >= 1) {
        res.send({
          message: "Codigos was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Parallel. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating parallelism in codigos"
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Codigo.destroy({
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
  Codigo.destroy({
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
exports.getAllCodeFromBackup = (req, res) => {
  // Validate request
  /*if (!req.body.id_backup) {
    res.status(400).send({
      message: "Content can not be empty! - Code from Backup"
    });
    return;
  }*/

  Codigo.findAll({ where: { id_backup: req.body.id_backup } })
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

// find all published Tutorial
exports.getAllCodeFromBackupBlock = (req, res) => {
  // Validate request
  if (!req.query.id_backup || !req.query.no_bloque) {
    res.status(400).send({
      message: "Content can not be empty! - Code from BackupBlock"
    });
    return;
  }

  Codigo.findAll({ where: { id_backup: req.query.id_backup, no_bloque: req.query.no_bloque} })
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

// find all published Tutorial
/*exports.getDifferentBlockId = (req, res) => {
  // Validate request
  if (!req.body.id_backup) {
    res.status(400).send({
      message: "Content can not be empty! - Code from BackupBlock"
    });
    return;
  }

  Codigo.findAll({ where: { id_backup: req.body.id_backup} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};*/



exports.getDifferentBlockId = (req, res) => {
const countries = Codigo.findAll({
  attributes: [
    [db.Sequelize.fn("DISTINCT", db.Sequelize.col("no_bloque")), "distinct_bloques"]
  ],
  where: { id_backup: req.query.id_backup },
  order: db.Sequelize.col('no_bloque')
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.addLineaToSpecificBlock = (req, res) => {
  /*// Validate request
  if (!req.body.id_codigo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }*/

  // Create a Tutorial
  //id       : req.body.id, Es null
  let id_backup = req.body.id_backup; //Este sí pídelo
  let no_bloque = req.body.no_bloque; //Obligatorio en este caso
  let no_linea = req.body.no_linea; //Este será opcional
  let linea = req.body.linea.replace(/'/g, "\\'");    //Se pide
  let run_as_sudo = req.body.run_as_sudo ? req.body.run_as_sudo : false; //Pídelo
  let paralelo = req.body.paralelo ? req.body.paralelo : false; //Lo va a pasar el mismo bloque
  //createdAt       : req.body.createdAt, es null
  //updatedAt       : req.body.updatedAt, es null

  let select_max = `(SELECT COALESCE(MAX(no_linea),0)+1 as new_linea FROM codigos temporal WHERE id_backup=${id_backup} AND no_bloque=${no_bloque})`;
  let sql = `INSERT INTO codigos(id, id_backup, no_bloque, no_linea, linea, run_as_sudo, paralelo) VALUES(null, ${id_backup}, ${no_bloque}, ${select_max}, '${linea}', ${run_as_sudo}, ${paralelo})`;
  console.log(sql);
  db.sequelize.query(sql).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
  };

exports.addLineaToSpecificBackup = (req, res) => {
  /*// Validate request
  if (!req.body.id_codigo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }*/

  // Create a Tutorial
  //id       : req.body.id, Es null
  let id_backup = req.body.id_backup; //Este sí pídelo
  let linea = req.body.linea.replace(/'/g, "\\'");    //Se pide

  let select_max_ln = `(SELECT COALESCE(MAX(no_linea),0)+1 as new_linea FROM codigos temporal WHERE id_backup=${id_backup})`;
  let select_max_blk = `(SELECT COALESCE(MAX(no_bloque),0)+1 as new_bloque FROM codigos temporal2 WHERE id_backup=${id_backup})`;
  console.log(select_max_blk);
  
  let sql = `INSERT INTO codigos(id, id_backup, no_bloque, no_linea, linea, run_as_sudo, paralelo) VALUES(null, ${id_backup}, ${select_max_blk}, ${select_max_ln}, '${linea}', false, false)`;
  console.log(sql);
  db.sequelize.query(sql, {bind: ['active']}).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
  };