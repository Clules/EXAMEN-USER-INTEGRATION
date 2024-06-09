require("dotenv").config();

const nearbyyModel = require("../models/nearbyyModel");

async function uploadFilesNearbyy(req, res) {
  const { NearbyyClient } = await import("@nearbyy/core");
  const client = new NearbyyClient({
    API_KEY: process.env.NEARBYY_API_KEY,
  });

  const { fileUrls, tag } = req.body;

  try {
    const { success, error, data } = await client.uploadFiles({
      fileUrls: fileUrls,
      tag: tag,
    });

    if (success) {
      console.log("File uploaded successfully");
      console.log("id: " + data.files[0].id);
      res.status(200).json({ message: "File uploaded successfully", data });
    } else {
      console.error(`Error uploading file: ${error}`);
      console.error(data);
      res.status(400).json({ message: "Error uploading file", error, data });
    }
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function deleteFilesNearbyy(req, res) {
  const { NearbyyClient } = await import("@nearbyy/core");
  const client = new NearbyyClient({
    API_KEY: process.env.NEARBYY_API_KEY,
  });

  const ids = req.body.ids;

  try {
    const { success, error, data } = await client.deleteFiles({
      ids: ids,
    });

    if (success) {
      console.log("File deleted successfully");
      console.log(data);
      res.status(200).json({ message: "File deleted successfully", data });
    } else {
      console.error(`Error deleting file: ${error}`);
      console.error(data);
      res.status(400).json({ message: "Error deleting file", error, data });
    }
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function getUploadUrl(req, res) {
  const { contentType } = req.query;
  const apiKey = process.env.NEARBYY_API_KEY;

  if (!contentType) {
    return res
      .status(400)
      .json({ message: "contentType parameter is required" });
  }

  try {
    const uploadUrl = await nearbyyModel.getUploadUrl(contentType, apiKey);
    res.status(200).json({ uploadUrl });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getChunksNearbyy(req, res) {
  const { query, limit, tag, fileId } = req.query;
  const apiKey = process.env.NEARBYY_API_KEY;

  try {
    console.log(query);
    const chunks = await nearbyyModel.getChunks(
      query,
      limit,
      tag,
      fileId,
      apiKey
    );
    res.status(200).json({ chunks });
  } catch (error) {
    console.error("Error fetching chunks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  uploadFilesNearbyy,
  deleteFilesNearbyy,
  getUploadUrl,
  getChunksNearbyy,
};
