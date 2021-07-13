const { promisify } = require("bluebird").Promise;
const redis = require("redis");

const client = redis.createClient();

client.set = promisify(client.set);
const db = require("../config/db");

module.exports = async (req, res) => {
  try {
    const { title, body } = req.body;
    const result = await db.query(
      "INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *",
      [title, body]
    );
    client.set(`post-${result.rows.id}`, JSON.stringify(result.rows));
    res.status(201).json({
      status: "success",
      posts: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.mesage,
    });
  }
};
