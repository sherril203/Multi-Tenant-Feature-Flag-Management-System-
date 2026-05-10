const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const orgModel = mongoose.model("Organization", orgSchema);

module.exports = orgModel;