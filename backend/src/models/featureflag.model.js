const mongoose = require("mongoose");
const featureSchema = new mongoose.Schema({
  key: String,
  enabled: Boolean,
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" }
});
const featureModel=mongoose.model("FeatureFlag", featureSchema);
module.exports = featureModel