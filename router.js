const express = require("express");
const router = express.Router();

const { router: movieRouter } = require("./movie")

router.use("/movies", movieRouter)

module.exports = router;
