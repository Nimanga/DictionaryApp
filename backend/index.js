const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dictionaryRoutes = require("./routes/dictionaryRoutes.js");
// const En2Sn = require("./models/en2snModels.js");
// const Sn2En = require("./models/sn2enModels.js");
// const fs = require("fs");

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

// insert all JSON data to mongodb
// const data = fs.readFileSync(
//   "../DictionaryFront/android/app/src/main/assets/sn2en.json"
// );

// const jsonData = JSON.parse(data);

// async function insertData() {
//   try {
//     await Sn2En.insertMany(jsonData);
//     console.log("Data inserted successfully!");
//   } catch (error) {
//     console.error(error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// insertData();
