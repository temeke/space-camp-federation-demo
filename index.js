const { ApolloServer } = require("apollo-server-express");
const { ApolloGateway } = require("@apollo/gateway");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  // get request body
  const query = req.body.query;
  console.log('query', query)

  // THE PROBLEM IS HERE
  // how to get response body????
  const response = res.body
  console.log('response', response)

  next();
});

const gateway = new ApolloGateway({
  serviceList: [
    { name: "astronauts", url: "http://localhost:4001" },
    { name: "missions", url: "http://localhost:4002" }
  ]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
