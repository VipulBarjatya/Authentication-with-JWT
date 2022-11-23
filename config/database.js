const mongoose = require("mongoose");
const MONGODB_URL = "";

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connection succesful"))
    .catch((err) => {
      console.log(err);
      console.log("connection failed");
      process.exit(1);
    });
};
