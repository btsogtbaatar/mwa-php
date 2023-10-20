const mongoose = require("mongoose");
const constant = require("./constant");
mongoose.connect(process.env.DB_URL).then(() => {
  console.log(constant.MONGOOSE_CONNECTING_MESSAGE, process.env.DB_NAME);
})

mongoose.connection.on(constant.MONGOOSE_CONNECTED_EVENT, () =>
  console.log(constant.MONGOOSE_CONNECTED_MESSAGE)
)

mongoose.connection.on(constant.MONGOOSE_DISCONNECTED_EVENT, () =>
  console.log(constant.MONGOOSE_DISCONNECTED_MESSAGE)
);

mongoose.connection.on(constant.MONGOOSE_ERROR_EVENT, (error) =>
  console.error(constant.MONGOOSE_ERROR_MESSAGE, error)
);

process.on(constant.PROCESS_TERMINATION_EVENT, function () {
  mongoose.disconnect().then(() => {
    process.exit(0);
  })
});