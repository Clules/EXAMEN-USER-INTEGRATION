const FeedbackModel = require("../models/feedbackModel");

async function getAllFeedback(req, res) {
  try {
    const response = await FeedbackModel.getAllFeedback();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getFeedbackByID(req, res) {
  const id = req.params.id;
  try {
    const feedback = await FeedbackModel.getFeedbackByID(id);
    res.status(200).json(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function createFeedback(req, res) {
  try {
    const { feedback } = req.body;
    const { userId } = req.params;
    const newFeedback = await FeedbackModel.createFeedback(feedback, userId);
    res.status(201).json(newFeedback);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getAllFeedback, getFeedbackByID, createFeedback };
