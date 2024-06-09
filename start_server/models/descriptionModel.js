const { db } = require("../config/db");

const getAllDescriptions = async () => {
  try {
    const query = "SELECT * FROM description;";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getDescriptionByID = async (id) => {
  try {
    const query =
      "SELECT U.name, d.description, d.prescription, d.createdat FROM users U JOIN description d ON U.id = d.user_id WHERE U.id = $1;";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createDescription = async (description, prescription, userId) => {
  try {
    const query =
      "INSERT INTO description (description, prescription, user_id) VALUES ($1, $2, $3) RETURNING *;";
    const { rows } = await db.query(query, [description, prescription, userId]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = { getAllDescriptions, getDescriptionByID, createDescription };
