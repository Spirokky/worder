const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const upload = require('./routes/api/upload');
const lingvo = require('./routes/api/lingvo');
const dictionary = require('./routes/api/dictionary');

const { NODE_ENV, NODE_PORT } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/upload', upload);
app.use('/api/lingvo', lingvo);
app.use('/api/dictionary', dictionary);

if (NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build/')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build/', 'index.html'));
  });
}

const port = NODE_PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
