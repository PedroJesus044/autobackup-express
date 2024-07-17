module.exports = app => {
  const codigo = require("../controllers/backup_traces.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", codigo.create);

  // Retrieve all Tutorials
  router.get("/", codigo.findAll);

  // Retrieve all code from a backup
  router.get("/codebackup", codigo.getAllCodeFromBackup);

  // Retrieve all different blocks id of a backup
  router.post("/difffiles", codigo.getDifferentFileNames); //Me basaré en esto...

  // Retrieve all code from a backup and a block
  router.post("/historyfile", codigo.getHistoryFromFile); //Después en esto...

  //Add line and block to specific backup
  router.post("/retrieve_limit", codigo.retreiveLimit);

  //Add line to a block of a backup
  router.post("/addlinetospecificblock", codigo.addLineaToSpecificBlock);

  //Get last status from backups
  router.get("/last_status", codigo.getLastStatusFromBackups);

  //Update block parallelism
  router.put("/updateparallelism", codigo.updateParallelism);

  // Retrieve a single Tutorial with id
  router.get("/:id", codigo.findOne);

  // Update a Tutorial with id
  router.put("/:id", codigo.update);

  // Delete a Tutorial with id
  router.delete("/:id", codigo.delete);

  // Delete all Tutorials
  router.delete("/", codigo.deleteAll);

  app.use('/api/backup_traces', router);
};
