const mongoose = require("mongoose");

const sn2enSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definitions: [
    {
      type: String,
    },
  ],
});

const Sn2En = mongoose.model("sn2en", sn2enSchema);
module.exports = Sn2En;
