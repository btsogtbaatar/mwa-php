require("dotenv").config();
require("./data");

const express = require("express");

const router = require("./router");
const { errorHandling } = require("./error-handler");
const constant = require("./constant");

const app = express();

app.use(express.json());
app.use("/api", router);
app.use("/api", errorHandling);

const server = app.listen(process.env.PORT, () =>
  console.log(constant.EXPRESS_STARTED_MESSAGE, server.address().port)
);
