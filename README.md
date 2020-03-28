# TACTA API

A NodeJS Express Server to serve TACTA's API.

<details>
  <summary>Table Of Contents</summary>

1. [Developing Locally](#developing-locally)
   - [GraphQL](#graphql)
   - [REST](#rest)
     - [Authentication](#authentication)
     - [Postman](#postman)
1. [Testing](#testing)
1. [Continuous Deployment](#continuous-deployment)

</details>

## Developing locally

> App will use the dev instance of a mongodb database in the mongo cloud.

1. Check out this repo...
1. Install dependencies
   - `npm i`
1. Run app
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

Our [GraphQL Schema](./src/graphql/schema.js) neatly composes our [models](./src/models).

> NOTE: As of now, GraphQL only supports querying of data, no mutations!

With the app running, you can navigate to our local version of graphiql by going to [localhost/graphiql](http://localhost:3001/graphiql).

This small interface allows us to nicely analyze what's available in the GraphQL API. Clear out any of the comments you might see in the first section. Please note the `Docs` button at the top right and click it. It should show a query of type RootQueryType. We can expand that to see a few fields:

- contact(id: ID): Contact
- user(id: ID): User
- contacts: [Contact]
- users: [User}]

These map the the REST paradigms of:

- getContactByID `/contact/:id`
- getUserByID `/user/:id`
- allContacts `/contacts`
- allUsers `/users`

Clicking on the types will show what fields each object has available.

In the left hand side, we can form queries! Please verify that the example queries work.

<details>
  <summary>Example Queries</summary>

Query:

```
query {
  users {
    name
  }
}
```

Yields:

```
{
  "data": {
    "users": [
      {
        "name": "Duane"
      },
      {
        "name": "Keem"
      },
      {
        "name": "Keem Kim"
      }
    ]
  }
}
```

Query:

```
query {
  users {
    name
    phone
    email
  }
}
```

Yields:

```
{
  "data": {
    "users": [
      {
        "name": "Duane",
        "phone": "5129210971",
        "email": "bester.test@gmail.com"
      },
      {
        "name": "Keem"
        "phone": "1234567890",
        "email": "keem.test@gmail.com"
      },
      {
        "name": "Keem Kim",
        "phone": "1234567891",
        "email": "keem.test1@gmail.com"
      }
    ]
  }
}
```

</details>

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

#### Authentication

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

#### Postman

You can import the [Postman collection](./postman/Tacta%20Dev.postman_collection.json) to make RESTful requests a whole lot easier!

### Testing

TODO

### Continuous Deployment

TODO
