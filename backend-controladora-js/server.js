const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  //Esto debe referenciarse a sí mismo
  //origin: "http://auto-backup-vuejs-1:8081"
  origin: process.env.EXPRESS_CORS_OPTIONS.split(',')
};

console.log(corsOptions.origin);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Holi" });
});

require("./app/routes/backups.routes")(app);
require("./app/routes/codigos.routes")(app);
require("./app/routes/metadatas.routes")(app);
require("./app/routes/file_traces.routes")(app);
require("./app/routes/backup_traces.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/sessions.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
