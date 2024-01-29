const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis")

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


// connecting to redis
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
let redisClient
(async() => {
    redisClient  = redis.createClient({
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`
    })
    redisClient.on("error", (err) => console.log(`Error: ${err}`))
    redisClient.on("connect", ()=> console.log("Connect to redis..."))
    await redisClient.connect()
})()


    

app.get("/", async (req, res) => {
    let isCashed = false;
    let result;

    try{
        result =  await redisClient.get("title")
        if (result)
        {
            isCashed = true
        }
        else
        {
            result = "hello from redis"
            await redisClient.set("title", result)
        }
        
        res.send({
            isCashed: true,
            data: result
        })
    }catch (error)
    {
        console.error(error);
        res.status(404).send("Data unavailable");
    }
    res.send("<h1>Hello from Node</h1>");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
