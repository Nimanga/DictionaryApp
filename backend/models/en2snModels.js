const mongoose = require("mongoose");

const en2snSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definitions: [
    {
      type: String,
      required: true,
    },
  ],
});

const En2Sn = mongoose.model("en2sn", en2snSchema);
module.exports = En2Sn;
