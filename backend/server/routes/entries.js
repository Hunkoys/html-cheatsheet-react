const { entries } = require('./entries/entriesLogic');

function entriesRoute(app) {
  app.get('/entries', (req, res) => {
    res.pack(entries.data);
  });

  app.post('/entry', (req, res) => {
    const entry = req.body;
    const string = entries.push(entry);
    res.pack(string);
  });

  app.post('/entry/result', (req, res) => {
    const entry = req.body;
    entries.push(entry);
    res.pack(entries.data);
  });

  app.put('/entries/result', (req, res) => {
    const data = req.body;
    entries.replace(data);
    res.pack(entries.data);
  });

  app.put('/entry/:i/result', (req, res) => {
    const { i } = req.params;
    const { part, value } = req.body;
    const entry = {};
    entry[part] = value;

    entries.edit(i, entry);

    res.pack(entries.data);
  });
}

module.exports = entriesRoute;
