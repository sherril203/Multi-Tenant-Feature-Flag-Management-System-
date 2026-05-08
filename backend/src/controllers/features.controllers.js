const FeatureModel = require("../models/featureflag.model");

const createFeature = async (req, res) => {
  try {
    const { key, enabled } = req.body;
    const orgId = req.user.orgId; 

    if (!key) {
      return res.status(400).json({ message: "Feature key required" });
    }

    const exist = await FeatureModel.findOne({ key, orgId });
    if (exist) {
      return res.status(400).json({ message: "Feature already exists" });
    }

    const feature = new FeatureModel({
      key,
      enabled,
      orgId
    });

    await feature.save();

    res.status(201).json({ message: "Feature created", feature });

  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};
const getFeatures = async (req, res) => {
  try {
    const orgId = req.user.orgId;

    const features = await FeatureModel.find({ orgId });

    res.status(200).json(features);

  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { enabled } = req.body;
    const orgId = req.user.orgId;

    const feature = await FeatureModel.findOne({ _id: id, orgId });

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    feature.enabled = enabled;

    await feature.save();

    res.status(200).json({ message: "Feature updated", feature });

  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
const checkFeature = async (req, res) => {
  try {
    const { key } = req.body;
    const orgId = req.user.orgId;

    const feature = await FeatureModel.findOne({ key, orgId });

    res.status(200).json({
      key,
      enabled: feature ? feature.enabled : false
    });

  } catch (err) {
    res.status(500).json({ message: "Check failed", error: err.message });
  }
};
module.exports = {
  createFeature,
  getFeatures,
  updateFeature,
  checkFeature
};