const { db } = require("../config/db");

const getAllFeedback = async () => {
  try {
    const query = "SELECT * FROM feedback;";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getFeedbackByID = async (id) => {
  try {
    const query =
      "SELECT U.name, d.feedback FROM users U JOIN feedback d ON U.id = d.user_id WHERE U.id = $1;";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createFeedback = async (feedback, userId) => {
  try {
    const query =
      "INSERT INTO feedback (feedback, user_id) VALUES ($1,$2) RETURNING*;";
    const { rows } = await db.query(query, [feedback, userId]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { getAllFeedback, getFeedbackByID, createFeedback };
