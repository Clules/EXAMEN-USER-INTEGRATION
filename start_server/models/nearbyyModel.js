const axios = require("axios");

async function getUploadUrl(contentType, apiKey) {
  try {
    const response = await axios.get(
      "https://nearbyy.com/api/files/get-upload-url",
      {
        params: {
          contentType: contentType,
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Failed to fetch upload URL");
    }
  } catch (error) {
    throw new Error("Error fetching upload URL: " + error.message);
  }
}

async function getChunks(query, limit, tag, fileId, apiKey) {
  try {
    const response = await axios.get("https://nearbyy.com/api/chunks", {
      params: {
        query: query,
        limit: limit,
        tag: tag,
        fileId: fileId,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.data.success) {
      console.log(response.data.data.items[0]);
      return response.data;
    } else {
      throw new Error(response.data.error || "Failed to fetch upload URL");
    }
  } catch (error) {
    throw new Error("Error fetching chunks: " + error.message);
  }
}

module.exports = { getUploadUrl, getChunks };
