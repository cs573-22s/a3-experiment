require("dotenv").config();

const { response, request } = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const ResponseEntry = require('./models/responseModel.js')
const port = 3001;
const express = require("express");
const morgan = require("morgan");
const app = express();


const uri = 'mongodb+srv://'+process.env.ACCOUNT+':'+process.env.PASS+'@'+process.env.HOST

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(process.env.PORT || port))
    .catch(err => console.log(err));


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

app.post('/postResponse', async (req, res) => {
  const response = new ResponseEntry({
    userId: req.body.userId,
    test1: req.body.test1,
    test2: req.body.test2,
    test3: req.body.test3,
    test4: req.body.test4,
    test5: req.body.test5,
    test6: req.body.test6,
    test7: req.body.test7,
    test8: req.body.test8,
    test9: req.body.test9,
    test10: req.body.test10,
    test11: req.body.test11,
    test12: req.body.test12
  })
  response.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      })
  res.render('start')
  return;
})

app.get('/returnResponses', (req, res) => {
  ResponseEntry.find()
      .then(result => {
        /*res.json({
          answers: result
        })*/
        res.send(result);
      })
})


app.get("/", (req, res) => {
  res.redirect("/start");
});

app.get("/start", async (req, res) => {
  res.render("start");
});

app.post("/test1", async (req, res) => {
  res.render("test1", {userId: req.body.userId});
});

app.post("/test2", bodyParser.json(), async (req, res) => {
  res.redirect("test2", {userId: req.body.userId, test1: req.body.input1});
});


app.get("/index", async (req, res) => {
  res.redirect('/start')
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
