require("dotenv").config();
require("./data");
require("./data/schemas");

const router = require("./router");
const express = require("express");
const errorHandling = require("./error-handler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);
app.use(errorHandling);

const server = app.listen(process.env.PORT, function () {
  console.log("Express server started on port:", server.address().port);
});
