const { entries } = require('./entries/entriesLogic');

function entriesRoute(app) {
  app.get('/entries', (req, res) => {
    console.log(entries.data);
    res.pack(entries.data);
  });

  app.put('/entries/result', (req, res) => {
    const data = req.body;
    entries.replace(data);
    res.pack(entries.data);
  });
}

module.exports = entriesRoute;
