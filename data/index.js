const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose is connected.");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose is disconnected.");
});

mongoose.connection.on("error", function (error) {
  console.error("Mongoose error:", error);
});

process.on("SIGINT", function () {
  mongoose.disconnect(function () {
    process.exit(0);
  });
});
