const mongoose = require("mongoose");
const orgSchema = new mongoose.Schema({
  name: {type:String}
});
const orgModel=mongoose.model("Organization", orgSchema)
module.exports =orgModel ;