const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["SUPER_ADMIN", "ADMIN", "USER"],
    default: "USER"
  },

  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;