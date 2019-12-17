const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const client = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

module.exports = client;
