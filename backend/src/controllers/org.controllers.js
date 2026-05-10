const orgModel = require("../models/org.model");

// CREATE ORG
const createOrg = async (req, res) => {
  try {
    const { name, code, secret } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "Name and code are required"
      });
    }

    if (secret !== "SUPER_ADMIN_123") {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    const existing = await orgModel.findOne({
      code: code.toUpperCase()
    });

    if (existing) {
      return res.status(409).json({
        message: "Organization code already exists"
      });
    }

    const org = await orgModel.create({
      name,
      code: code.toUpperCase()
    });

    return res.status(201).json({
      message: "Organization created successfully",
      organization: org
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

// GET ORGS
const getOrg = async (req, res) => {
  try {
    const orgs = await orgModel.find().sort({ createdAt: 1 });

    return res.status(200).json(orgs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createOrg,
  getOrg
};