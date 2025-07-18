const express = require('express');
const { claimPoints, getuserHistory } = require('../controllers/claimController');
const router = express.Router();

router.post("/:id",claimPoints)
router.get("/history/:id",getuserHistory)

module.exports = router;
