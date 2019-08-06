const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const childProcess = require('child_process');

const PYTHON_EXECUTABLE = path.resolve(__dirname, '../../../env/bin/python3');
const PYTHON_SCRIPT = path.resolve(__dirname, '../../script.py');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const uint8arrayToString = data => {
  return String.fromCharCode.apply(null, data);
};

const cleanStrings = str => {
  return str.match(/[\w]+/gi);
};

router.get('/', async (req, res) => {
  res.send('GET request');
});

router.post('/', upload.single('file'), async (req, res) => {
  const result = { success: null, status: null, error: null, words: [] };
  // const result = { success: true, status: 200, error: null, words: ['unique', 'sky', 'bridge'] };
  // return res.status(200).send(result);

  const file = req.file;

  if (!file) {
    result.success = false;
    result.status = 500;
    result.error = 'No file';
    return res.status(result.status).send(result);
  }

  const filePath = req.file.path;

  const spawn = childProcess.spawn;
  const scriptExecution = spawn(PYTHON_EXECUTABLE, [PYTHON_SCRIPT, filePath]);

  scriptExecution.stdout.on('data', data => {
    const wordsArray = cleanStrings(uint8arrayToString(data));
    result.words = result.words.concat(wordsArray.slice(1));
    result.success = true;
  });

  scriptExecution.stderr.on('data', data => {
    console.error('error:', uint8arrayToString(data));
    result.success = false;
    result.status = 500;
    result.error = "Can't deal with this file";
    scriptExecution.emit('exit');
  });

  scriptExecution.on('exit', code => {
    result.success = result.success || false;
    result.status = result.status || 200;
    res.status(result.status).send(result);
  });
});

module.exports = router;
