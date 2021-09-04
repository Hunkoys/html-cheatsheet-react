const { entries } = require('./entries/entriesLogic');

function entriesRoute(app) {
  app.get('/entries', async (req, res) => {
    res.json(entries.data);
  });

  app.post('/entry', async (req, res) => {
    const entry = req.body;
    console.log(req.params.i);
    const string = entries.push(entry);
    res.pack(string);
  });
}

module.exports = entriesRoute;
