const express = require("express");
const graphqlHTTP = require("express-graphql");
const compression = require("compression");
const helmet = require("helmet");
const userRouter = require("./routers/user");
const auth = require("./middleware/auth");
const graphqlSchema = require("./graphql/schema.js");
require("./db/db");

// App Setup
const app = express();
app.use(compression());
app.use(helmet());
app.use(express.json());

// REST Endpoints
app.use(userRouter);

// GraphQL API Endpoint
app.use(auth);
app.use("/graphiql", graphqlHTTP({ schema: graphqlSchema, graphiql: true }));

// Serve App on PORT
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
