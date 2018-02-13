const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const faker = require("faker");
const config = require("./config.json");
const { random: fkRandom } = faker;

const app = express();
const dealerObj = require("./dealers");
const solver = require("./solver");

let db;
const dbUsername = config.username;
const dbPassword = config.password;
const dbURL = `mongodb://${dbUsername}:${dbPassword}@ds233218.mlab.com:33218/applicant`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  db
    .collection("applicants")
    .find()
    .toArray((err, results) => {
      res.render("index.ejs", { applicants: results });
    });
});

app.post("/new", (req, res) => {
  const uuid = fkRandom.uuid();
  const question = dealerObj(50, 3);
  const answer = solver(question);
  req = { ...req.body, uuid, question, answer };
  db.collection("applicants").save(req, (err, result) => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

app.get("/dealers", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(dealerObj(50, 3)));
});

MongoClient.connect(dbURL, (err, client) => {
  if (err) return console.log(err);
  db = client.db("applicant");
  app.listen(3001, () => {
    console.log("listening on port 3001");
  });
});
