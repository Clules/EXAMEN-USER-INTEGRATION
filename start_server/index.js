const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes");
const descriptionRoutes = require("./routes/descriptionRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const chatRoutes = require("./routes/chatOpenRoutes");
const nearbyyRoutes = require("./routes/nearbyyRoutes");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ info: "Hello world! From PostgreSQL, Node.js and Express" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/users", userRoutes);
app.use("/description", descriptionRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/chat", chatRoutes);
app.use("/nearbyy", nearbyyRoutes);
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "alumnotec",
//   host: "localhost",
//   database: "alumnoapi",
//   password: "password",
//   port: 5432,
// });

// const getUsers = (request, response) => {
//   pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };
