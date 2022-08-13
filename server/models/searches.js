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
    type: Number,
    required: true,
  },
  searchTime: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("Searches", searchesSchema);
