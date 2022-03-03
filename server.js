require("dotenv").config();

const { response, request } = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const ResponseEntry = require('./models/responseModel.js')
const port = 3001;
const express = require("express");
const morgan = require("morgan");
const app = express();


const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

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

let globalResponse = [];

// serve up static files in the directory public
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.post('/postResponse', async (req, res) => {
  globalResponse[13] = [req.body.input13, req.body.input14, req.body.input15, req.body.input16,, req.body.input17, , req.body.input18];

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

app.get("/start", async (req, res) => {
  res.render("start");
});

app.post("/test1", async (req, res) => {
  globalResponse[0] = req.body.userId;
  res.render("test1");
});

app.post("/test2",  async (req, res) => {
  globalResponse[1] = [req.body.input1, req.body.input2];
  res.render("test2");
});

app.post("/test3",  async (req, res) => {
  globalResponse[2] = [req.body.input1, req.body.input2];
  res.render("test3");
});

app.post("/test4",  async (req, res) => {
  globalResponse[3] = [req.body.input1, req.body.input2];
  res.render("test4");
});

app.post("/test5",  async (req, res) => {
  globalResponse[4] = [req.body.input1, req.body.input2];
  res.render("test5");
});

app.post("/test6",  async (req, res) => {
  globalResponse[5] = [req.body.input1, req.body.input2];
  res.render("test6");
});

app.post("/test7",  async (req, res) => {
  globalResponse[6] = [req.body.input1, req.body.input2];
  res.render("test7");
});

app.post("/test8",  async (req, res) => {
  globalResponse[7] = [req.body.input1, req.body.input2];
  res.render("test8");
});

app.post("/test9",  async (req, res) => {
  globalResponse[8] = [req.body.input1, req.body.input2];
  res.render("test9");
});

app.post("/test10",  async (req, res) => {
  globalResponse[9] = [req.body.input1, req.body.input2];
  res.render("test10");
});

app.post("/test11",  async (req, res) => {
  globalResponse[10] = [req.body.input1, req.body.input2];
  res.render("test11");
});

app.post("/test12",  async (req, res) => {
  globalResponse[11] = [req.body.input1, req.body.input2];
  res.render("test12");
});

app.post("/endingSurvey",  async (req, res) => {
  globalResponse[12] = [req.body.input1, req.body.input2];
  res.render("endingSurvey");
});


app.get("/index", async (req, res) => {
  res.redirect('/start')
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
