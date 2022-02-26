require("dotenv").config();

const { response, request } = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");

const port = 3001;
const express = require("express");
const morgan = require("morgan");
const app = express();

// async function retrieveData() {
//   try {
//     const res = await pool.query("SELECT * FROM response");
//     console.log(res.rows);
//   } catch (error) {
//     console.error(error);
//   }
// }

// retrieveData();

app.listen(process.env.PORT || port);
app.use(bodyParser.json());

//register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// serve up static files in the directory public
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/index", async (req, res) => {
  res.render("index");
});

app.get("/experiment", async (req, res) => {
  res.render("experiment");
});

app.post("/api/experiments/:questionNumber", async (req, res) => {
  const {questionNumber} = req.params;
  const {trueAnswer, userAnswer, user} = req.body;

  try {
    const res = await pool.query(
      "INSERT INTO response (question_no, actual_answer, user_answer, user_id) VALUES ($1, $2, $3, $4)",
      [
        req.params.questionNumber,
        req.body.trueAnswer,
        req.body.userAnswer,
        req.body.user,
      ]
    );
    console.log(res.rows);
  } catch (error) {
    console.error(error);
  }

  res.setHeader("Content-Type", "application/json");
  res.status(201).end(JSON.stringify({ msg: "ok" }));
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
