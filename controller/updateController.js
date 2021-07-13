const { promisify } = require("bluebird").Promise;
const redis = require("redis");

const client = redis.createClient();

client.set = promisify(client.set);
client.get = promisify(client.get);
const db = require("../config/db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const result = await db.query(
      "UPDATE posts SET title = $1, body = $2  WHERE id = $3 RETURNING *",
      [title, body, id]
    );

    if (result.rows[0]) {
      return res.status(200).json({
        status: "success",
        post: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
