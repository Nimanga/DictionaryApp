const mongoose = require("mongoose");

const versionSchema = mongoose.Schema({
  version: Number,
});

const Version = mongoose.model("version", versionSchema);
module.exports = Version;
