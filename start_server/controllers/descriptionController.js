const DescriptionModel = require("../models/descriptionModel");

async function getAllDescriptions(req, res) {
  try {
    const response = await DescriptionModel.getAllDescriptions();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getDescriptionByID(req, res) {
  const id = req.params.id;
  try {
    const description = await DescriptionModel.getDescriptionByID(id);
    res.status(200).json(description);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function createDescription(req, res) {
  try {
    const { description, prescription } = req.body;
    const { userId } = req.params;
    const newDescription = await DescriptionModel.createDescription(
      description,
      prescription,
      userId
    );
    res.status(201).json(newDescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getAllDescriptions, getDescriptionByID, createDescription };
