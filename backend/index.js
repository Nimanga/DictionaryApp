const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

const PORT = process.env.PORT || 8050;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
})
.then(()=>{
    console.log("MongoDB connection success");
    app.listen(PORT, ()=>{
        console.log(`Server is up and running on port ${PORT}`);
    })
})
.catch((error)=>{console.log(`Error connecting to mongoDB ${error.message}`)});