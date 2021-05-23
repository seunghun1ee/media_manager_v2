// Environment
require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3000;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successful MongoDB connection"))
    .catch(err => console.error(err));



app.get("/",(req,res) => {
    res.send("test");
});


http.listen(port,() => {
   console.log(`listening at ${port}`);
});