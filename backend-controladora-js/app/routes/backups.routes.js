module.exports = app => {
  const backup = require("../controllers/backups.controller.js");

  var router = require("express").Router();

  // Create a new Backup
  router.post("/", backup.create);

  // Retrieve all Backups
  router.get("/", backup.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", backup.findOne);

  // Update a Tutorial with id
  router.put("/:id", backup.update);

  // Delete a Tutorial with id
  router.delete("/:id", backup.delete);

  // Delete all Tutorials
  router.delete("/", backup.deleteAll);

  app.use('/api/backups', router);
};
