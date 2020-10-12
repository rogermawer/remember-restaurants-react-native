const express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
const app = express();
const yelp = require("yelp-fusion");
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("working");
});

// app.use(serveStatic(__dirname + "/dist"));

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey =
  "f8H6TbSqdQPb75EZAVK-OtQYXdhk2KPxN660yXiAwrxDUw9graGU0rko7ucAFuQcgoEqqsS0HCCkSWJWIOu8Ph-NvJCpCghkeV3uGiBW1xEoq3MACjFNsXuFquEGXXYx";
const client = yelp.client(apiKey);

app.post("/api/search", [], (req, res) => {
  client
    .search(req.body)
    .then((response) => {
      res.json(response.jsonBody.businesses); //send back to client
    })
    .catch((e) => {
      //if error
      res.send(e);
    });
});

app.post("/api/reviews", (req, res) => {
  client
    .reviews(req.body.restaurantName)
    .then((response) => {
      res.send(response.body);
    })
    .catch((error) => {
      console.log(error);
    });
});

//process.env.PORT allows to look on all ports.
app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}!`)
);
