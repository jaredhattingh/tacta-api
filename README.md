# TACTA API

A NodeJS Express Server to serve TACTA's API.

<details>
  <summary>Table Of Contents</summary>
  1. [Developing Locally](#developing-locally)
      * [GraphQL](#graphql)
      * [REST](#rest)
         - [Authentication](#auth)
</details>

## Developing locally

> App will use the dev instance of a mongodb database in the mongo cloud.

1. Check out this repo
2. Install graphiql (optional, but recommended)
   - `brew cask install graphiql`
   - GraphiQL app will be available in _Applications_ on MacOS.
3. Install dependencies
   - `npm i`
4. Run app
   - `npm run start`

App will then run on port 3000. This service provides both [GraphQL](#graphql) and [RESTful](#rest) APIs. Both of which leverage our [models](./src/models).

Models are compiled from [Mongoose Schemas](https://mongoosejs.com/docs/models.html), and can have various validation:

```
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ...
```

### GraphQL

Our [GraphQL Schema](./src/graphql/schema.js) neatly composes our [models](./src/models). As of now, graphQL only supports querying of data, no mutations.

### REST

Restful routes are defined in the [`routers`](./src/routers) folder.

Here's an example route to create a user:

```
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
```

#### Auth

To require that a route be blanketed by authentication, you can import the [auth middleware](./src/middleware/auth.js).

You can then just inject the auth middleware like normal:

```
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
```

> NOTE: For developing locally, authentication doesn't apply!

```
const auth = async (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return next();
  }
```
