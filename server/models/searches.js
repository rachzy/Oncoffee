const mongoose = require("mongoose");

const searchesSchema = new mongoose.Schema({
  searchId: {
    type: Number,
    required: true,
  },
  searchValue: {
    type: String,
    required: true,
  },
  searchUserId: {
    type: String,
    required: true,
  },
  searchTimeMs: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Searches", searchesSchema);
