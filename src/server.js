/*
 * Backend server
 * James Plante (jplante@wpi.edu)
 * 
 * Code based on the following tutorials (mostly for the boilerplate):
 * https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
 * https://stackoverflow.com/a/51227868
 */
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { dirname, join } from 'path';
import { JSONFile, Low }  from 'lowdb';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = process.env.PORT || 5000; 

// Database (lowdb)
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize the 'responses' table
db.data ||= {
  responses: []
}

// Read in the dataset for future API calls
const dataset = JSON.parse(fs.readFileSync(path.join(__dirname, 'dataset.json'), {encoding:'utf8', flag:'r'} ));

app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret:process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

app.use('/static', express.static(path.join(__dirname, 'survey_frontend', 'build', 'static')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root:path.join(__dirname, 'survey_frontend', 'build/')});
});

// create a GET route
app.get('/api', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

// GET /dataset - send the full dataset
app.get('/api/dataset', (req, res) => { 

  // function that returns a shuffled array
  // reimplementation of the Fisher Yates Shuffle algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  function shuffle(arr) {

    // Swaps two integers in an array
    function swap(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    const copy = arr.slice();
    for (let i = copy.length - 1; i >= 0; i--)  {
      // Get a random index
      const j = Math.floor(Math.random() * copy.length)
      swap(copy, i, j);
    }
    return copy;
  }
  
  let finalDataset = [];
  const chartTypes = shuffle(['bar', 'brain', 'topographic']);
  for (const trial of chartTypes) {
    const randomizedDataset = shuffle(dataset);
    finalDataset = [...finalDataset, ...randomizedDataset.map(elt => { return {...elt, type: trial} } )]
  }
  res.send(finalDataset); 
}); 

app.post('/api/submit', (req, res) => {
  console.log("Submitting form...")
  const body = req.body;
  db.data.responses.push({id: req.sessionID, ...body});
  db.write().then(
    () => {
      res.writeHead(201, "Form submitted!");
      res.end();
    },
    (reason) => {
      res.writeHead(400, "Unable to submit");
      res.end(reason)
    }
  )
})