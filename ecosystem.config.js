module.exports = {
  apps: [
    {
      name: "tacta-api-dev",
      script: "./src/app.js",
      env: {
        NODE_ENV: "development",
        MONGODB_URL="mongodb+srv://tacta-dev-db:tacta-dev-12345@dev-iet4h.gcp.mongodb.net/test?retryWrites=true&w=majority",
        JWT_KEY="WinterIsComingGOT2019",
        PORT=3000
      },
    }
  ]
};
