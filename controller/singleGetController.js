const { promisify } = require("bluebird").Promise;
const redis = require("redis");

const client = redis.createClient();

client.set = promisify(client.set);
client.get = promisify(client.get);
const db = require("../config/db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    //check if such post exist in redis and return the post
    const cachedPost = await client.get(`post-${id}`);
    if (cachedPost) {
      return res.status(200).json(JSON.parse(cachedPost));
    }
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows[0]) {
      //cache redis when the above redis code fails to return any post
      client.set(`post-${id}`, JSON.stringify(result.rows[0]));
      return res.status(200).json({
        status: "success",
        post: result.rows[0],
      });
    }
    res.status(404).json({
      status: "error",
      message: `No post with the id of ${id} exist in the database`,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
