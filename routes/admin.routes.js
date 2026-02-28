const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.get("/check", authMiddleware, (req, res) => {
    res.json({ ok: true });
});

module.exports = router;