const path = require('path');
const express = require('express');
const entriesRoute = require('./server/routes/entries');

const app = express();
const port = process.env.PORT || 50200;

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());
app.use('/', (req, res, next) => {
  res.pack = (content) => {
    console.log(content);
    res.json({ content });
  };
  req.body = req.body && req.body.content;
  next();
});

entriesRoute(app);

app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
