const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  key: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

featureSchema.index({ key: 1, orgId: 1 }, { unique: true });

const featureModel = mongoose.model("FeatureFlag", featureSchema);

module.exports = featureModel;