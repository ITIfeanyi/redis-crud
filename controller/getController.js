const { promisify } = require("bluebird").Promise;
const redis = require("redis");

const client = redis.createClient();

client.set = promisify(client.set);
client.get = promisify(client.get);
const db = require("../config/db");

module.exports = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");

    if (result.rows) {
      return res.status(200).json({
        status: "success",
        post: result.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
