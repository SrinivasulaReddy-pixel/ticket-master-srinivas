const express = require('express');
const mongoose = require('mongoose');
const setupDB = require('./config/database');
const router = require('./config/routes');
const cors = require('cors');
const app = express();

//const port = 3010;
//deployment changes start
const port = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
//end of deployment changes

app.use(cors());
app.use(express.json());

app.use('/', router);
//db configuration
setupDB();

app.listen(port, () => {
  console.log('listening port', port);
});
