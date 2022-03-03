require("dotenv").config();

const { response, request } = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const ResponseEntry = require('./models/responseModel.js')
const port = 3001;
const express = require("express");
const morgan = require("morgan");
const app = express();


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

  globalResponse[13] = blank;

  const response = new ResponseEntry({
    userId: globalResponse[0],
    test1: globalResponse[1],
    test2: globalResponse[2],
    test3: globalResponse[3],
    test4: globalResponse[4],
    test5: globalResponse[5],
    test6: globalResponse[6],
    test7: globalResponse[7],
    test8: globalResponse[8],
    test9: globalResponse[9],
    test10: globalResponse[10],
    test11: globalResponse[11],
    test12: globalResponse[12],
    endingSurvey: globalResponse[13]
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
  globalResponse[0] = req.body.userId;
  res.render("test1");
});

app.post("/test2", async (req, res) => {

  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[1] = blank;

  res.render("test2");
});

app.post("/test3",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[2] = blank;

  res.render("test3");
});

app.post("/test4",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[3] = blank;

  res.render("test4");
});

app.post("/test5",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[4] = blank;

  res.render("test5");
});

app.post("/test6",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[5] = blank;

  res.render("test6");
});

app.post("/test7",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[6] = blank;

  res.render("test7");
});

app.post("/test8",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[7] = blank;

  res.render("test8");
});

app.post("/test9",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[8] = blank;

  res.render("test9");
});

app.post("/test10",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[9] = blank;

  res.render("test10");
});

app.post("/test11",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[10] = blank;

  res.render("test11");
});

app.post("/test12",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[11] = blank;

  res.render("test12");
});

app.post("/endingSurvey",  async (req, res) => {
  let blank = [];
  blank.push(req.body.input1)
  blank.push(req.body.input2)

  globalResponse[12] = blank;

  res.render("endingSurvey");
});


app.get("/index", async (req, res) => {
  res.redirect('/start')
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
