module.exports = app => {
  const metadata = require("../controllers/metadatas.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", metadata.create);

  // Retrieve all Tutorials
  router.get("/", metadata.findAll);

  // Retrieve all metadata from a backup
  router.get("/metabackup", metadata.getMetadataFromBackup);

  // Retrieve all code from a backup and a block
  //router.get("/codebackupblock", codigo.getAllCodeFromBackupBlock);

  // Retrieve a single Tutorial with id
  router.get("/:id", metadata.findOne);

  // Update a Tutorial with id
  router.put("/:id", metadata.update);

  // Delete a Tutorial with id
  router.delete("/:id", metadata.delete);

  // Delete all Tutorials
  router.delete("/", metadata.deleteAll);

  app.use('/api/metadatas', router);
};
