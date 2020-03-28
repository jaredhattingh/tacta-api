const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
