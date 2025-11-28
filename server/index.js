const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

const db = new sqlite3.Database('./scores.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the scores database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL
  )`);
});

app.get('/api/scores', (req, res) => {
  db.all('SELECT name, score FROM scores ORDER BY score DESC LIMIT 10', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.post('/api/scores', (req, res) => {
  const { name, score } = req.body;
  if (!name || !score) {
    return res.status(400).send('Name and score are required');
  }
  db.run('INSERT INTO scores (name, score) VALUES (?, ?)', [name, score], function(err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.status(201).send({ id: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
