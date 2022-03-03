require("dotenv").config();

const { response, request } = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const ResponseEntry = require('./models/responseModel.js')
const port = 3001;
const express = require("express");
const morgan = require("morgan");
const app = express();
const cookie = require('cookie-session');


const uri = 'mongodb+srv://'+process.env.ACT+':'+process.env.PASS+'@'+process.env.HOST

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(process.env.PORT || port))
    .catch(err => console.log(err));


//app.listen(process.env.PORT || port);
app.use(bodyParser.json());

//register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cookie({
  name:'session',
  keys: ['key1', 'key2'],
  username: 'username',
  test1: 'test1',
  test2: 'test2',
  test3: 'test3',
  test4: 'test4',
  test5: 'test5',
  test6: 'test6',
  test7: 'test7',
  test8: 'test8',
  test9: 'test9',
  test10: 'test10',
  test11: 'test11',
  test12: 'test12',
  test13: 'test13',

}))

let globalResponse = [];

// serve up static files in the directory public
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.post('/postResponse', async (req, res) => {

  let blank = [];
  blank.push(req.body.input13)
  blank.push(req.body.input14)
  blank.push(req.body.input15)
  blank.push(req.body.input16)
  blank.push(req.body.input17)
  blank.push(req.body.input18)
  req.session.test13 = blank;
  //globalResponse[13] = blank;

  const response = new ResponseEntry({
    userId: req.session.username,
    test1: req.session.test1,
    test2: req.session.test2,
    test3: req.session.test3,
    test4: req.session.test4,
    test5: req.session.test5,
    test6: req.session.test6,
    test7: req.session.test7,
    test8: req.session.test8,
    test9: req.session.test9,
    test10: req.session.test10,
    test11: req.session.test11,
    test12: req.session.test12,
    endingSurvey: req.session.test13
    // userId: globalResponse[0],
    // test1: globalResponse[1],
    // test2: globalResponse[2],
    // test3: globalResponse[3],
    // test4: globalResponse[4],
    // test5: globalResponse[5],
    // test6: globalResponse[6],
    // test7: globalResponse[7],
    // test8: globalResponse[8],
    // test9: globalResponse[9],
    // test10: globalResponse[10],
    // test11: globalResponse[11],
    // test12: globalResponse[12],
    // endingSurvey: globalResponse[13]
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

app.get("/dataAnalysis", async (req, res) => {
  res.render("dataAnalysis")
});

app.get("/start", async (req, res) => {
  res.render("start");
});

app.post("/test1", bodyParser.json(), async (req, res) => {
  // globalResponse[0] = req.body.userId;
  req.session.username = req.body.userId;
  res.render("test1");
});

app.post("/test2", async (req, res) => {

  let blank = [];
  blank.push(req.body.input1);
  blank.push(parseInt(req.body.time));
  // globalResponse[1] = blank;
  req.session.test1 = blank;
  res.render("test2");
});

app.post("/test3",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1);
  blank.push(parseInt(req.body.time));
  req.session.test2 = blank;
  //globalResponse[2] = blank;

  res.render("test3");
});

app.post("/test4",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test3 = blank;
  //globalResponse[3] = blank;

  res.render("test4");
});

app.post("/test5",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test4 = blank;
  //globalResponse[4] = blank;

  res.render("test5");
});

app.post("/test6",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test5 = blank;
  //globalResponse[5] = blank;
  console.log(req.session)
  res.render("test6");
});

app.post("/test7",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test6 = blank;
  //globalResponse[6] = blank;

  res.render("test7");
});

app.post("/test8",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test7 = blank;
  //globalResponse[7] = blank;

  res.render("test8");
});

app.post("/test9",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));

  req.session.test8 = blank;
  //globalResponse[8] = blank;

  res.render("test9");
});

app.post("/test10",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));

  req.session.test9 = blank;
  //globalResponse[9] = blank;

  res.render("test10");
});

app.post("/test11",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));

  req.session.test10 = blank;
  //globalResponse[10] = blank;

  res.render("test11");
});

app.post("/test12",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test11 = blank;
  //globalResponse[11] = blank;

  res.render("test12");
});

app.post("/endingSurvey",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(parseInt(req.body.time));
  req.session.test12 = blank;
  //globalResponse[12] = blank;

  res.render("endingSurvey");
});


app.get("/index", async (req, res) => {
  res.redirect('/start')
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
