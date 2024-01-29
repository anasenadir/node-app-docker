const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;

// DB connection
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_HOST = "mongo";
const DB_PORT = 27017;
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB successfully"))
    .catch((err) => console.error("Failed to connect to DB", err));

app.get("/", (req, res) => {
    res.send("<h1>Hello from Node</h1>");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
