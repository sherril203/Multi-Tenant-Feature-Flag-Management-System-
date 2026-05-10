const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const tokengenerator = (user) => {
  if (!user) throw new Error("User data required for token");

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      orgId: user.orgId
    },
    jwt_secret,
    { expiresIn: "1h" }
  );
};
module.exports = tokengenerator;