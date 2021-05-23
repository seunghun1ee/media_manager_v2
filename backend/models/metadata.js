const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    files: {type: Array, required: true},
    tags: {type: Array, required: true},
    memo: {type: String, default: ""},
    uploadDate: {type: Date, required: true},
    favoriteDate: {type: Date},
    favorite: {type: Boolean, default: false},
    score: {type: Number, default: 0}
});

module.exports = mongoose.model("Metadata",metadataSchema);