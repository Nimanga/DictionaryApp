const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dictionaryRoutes = require("./routes/dictionaryRoutes.js");

const app = express();

const PORT = process.env.PORT || 8050;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use("/dictionary", dictionaryRoutes);

app.get("/", (req, res) => {
  res.send("Hello Social Voice Community ll");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connection success");
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to mongoDB ${error.message}`);
  });
