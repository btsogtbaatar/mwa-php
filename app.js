require("dotenv").config();
require("./data");

const express = require("express");

const router = require("./router");
const { errorHandling } = require("./error-handler");
const constant = require("./constant");
const cors = require("./cors");

const app = express();

app.use(express.json());
app.use(process.env.BASE_URL, cors);
app.use(process.env.BASE_URL, router);
app.use(process.env.BASE_URL, errorHandling);

const server = app.listen(process.env.PORT, () =>
  console.log(constant.EXPRESS_STARTED_MESSAGE, server.address().port)
);
