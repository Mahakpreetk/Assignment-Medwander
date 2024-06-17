// formDataRouter.js
const express = require("express");
const db = require("../db/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const formData = await db.query("SELECT * FROM formData");
    res.json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Failed to fetch form data" });
  }
});

module.exports = router;
