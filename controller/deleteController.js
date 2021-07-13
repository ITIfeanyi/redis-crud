const { promisify } = require("bluebird").Promise;
const redis = require("redis");

const client = redis.createClient();

client.set = promisify(client.set);
client.get = promisify(client.get);
const db = require("../config/db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM posts WHERE id = $1;", [id]);

    console.log(result);
    if (result.rowCount === 1) {
      return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
      });
    }
    res.status(200).json({
      status: "error",
      message: `Id ${id} does not exist in the database`,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
