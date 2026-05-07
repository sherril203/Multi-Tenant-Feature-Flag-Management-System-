const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const tokengenerator = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      orgId: user.orgId
    },
    jwt_secret,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = tokengenerator;