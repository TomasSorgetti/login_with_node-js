const server = require("./src/server");
const PORT = 3001;
const db = require("./src/models/index.db");

const Role = db.role;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and Resync Database with { force: true }");
    initial();
  });
});

function initial() {
  Role.findOrCreate({
    where: { name: "user" },
    defaults: { name: "user" },
  });

  Role.findOrCreate({
    where: { name: "moderator" },
    defaults: { name: "moderator" },
  });

  Role.findOrCreate({
    where: { name: "admin" },
    defaults: { name: "admin" },
  });
}
