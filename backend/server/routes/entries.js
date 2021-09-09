const { entries } = require('./entries/entriesLogic');

function entriesRoute(app) {
  app.get('/entries', (req, res) => {
    console.log(entries.data);

    res.pack(entries.data);
  });

  app.put('/entries', (req, res) => {
    const data = req.body;

    entries.replace(data);

    res.pack(true);
  });

  app.post('/entry', (req, res) => {
    const entry = req.body;

    entries.push(entry);

    res.pack(true);
  });

  app.put('/entry/:id', (req, res) => {
    const { id } = req.params;
    const value = req.body;

    entries.edit(id, value);

    res.pack(true);
  });
}

module.exports = entriesRoute;
