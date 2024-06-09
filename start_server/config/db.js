const Pool = require("pg").Pool;

const db = new Pool({
  user: "alumnotec",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "alumnoapi",
});

module.exports = { db };
