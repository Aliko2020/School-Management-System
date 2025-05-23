const pool = require("../config/database");

const getClasses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM class ORDER BY class_id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

module.exports = {
  getClasses
};
