#! /bin/bash

# Brief Run Script that builds then launches the Express server
# James Plante (jplante@wpi.edu)
cd survey_frontend
npm run build
cd ..
node server.js