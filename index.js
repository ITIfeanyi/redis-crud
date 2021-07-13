const express = require("express");
const redis = require("redis");
const dotenv = require("dotenv");
const client = redis.createClient();
client.on
  ? console.log("Redis Connected")
  : console.log("An error occured while connecting redis");

dotenv.config();
require("./config/db");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routerIndex = require("./route/index");

app.use("/", routerIndex);
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
