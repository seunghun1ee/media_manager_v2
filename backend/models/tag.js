const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
   value: {type: String, required: true},
   type: {type: String, required: true},
   label: {type: String, default: ""},
   description: {type: String, default: ""}
});

module.exports = new mongoose.model("Tag",tagSchema);