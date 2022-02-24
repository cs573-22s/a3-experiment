/*
 * Backend server
 * James Plante (jplante@wpi.edu)
 * 
 * Code based on the following tutorials (mostly for the boilerplate):
 * https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
 * https://stackoverflow.com/a/51227868
 */
const express = require('express'); 
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000; 

// Read in the dataset for future API calls
const dataset = JSON.parse(fs.readFileSync(path.join(__dirname, 'dataset.json'), {encoding:'utf8', flag:'r'} ));

app.use('/static', express.static(path.join(__dirname, 'survey_frontend', 'build', 'static')));

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
  res.send(dataset); 
}); 