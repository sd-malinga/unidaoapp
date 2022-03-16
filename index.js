require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const apiRouter = require('./routes');
require('./controller/cronjobs');
const app = express();
const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const expressServer = app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
