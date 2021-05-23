const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
   tag: {type: String, required: true},
   type: {type: String, required: true},
   title: {type: String, default: ""},
   description: {type: String, default: ""}
});

module.exports = new mongoose.model("Tag",tagSchema);