const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true
  },
  emailcpf: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registerToken: {
    type: String,
    required: true
  },
  securityToken1: {
    type: String,
    required: true
  },
  securityToken2: {
    type: String,
    required: true
  },
  verificationEmail: {
    type: String,
    required: false
  },
  verificationCode: {
    type: String,
    required: true
  },
  lastSentEmailTimestamp: {
    type: String,
    required: false
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
});

module.exports = mongoose.model("Accounts", accountsSchema);
