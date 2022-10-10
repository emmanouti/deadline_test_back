const express = require('express');
const router = require("./router");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(() => {})

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(router);

app.listen(PORT, async () => {
    console.log(`server running on port ${PORT}`);
});