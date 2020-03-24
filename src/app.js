const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const userRouter = require("./routers/user");
require("./db/db");

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
