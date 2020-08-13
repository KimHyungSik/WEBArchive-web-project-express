const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

let webs = [];

app.use(bodyParser.json());
app.post('/getter', (req, res) => {
  const webLink = {
    link: req.body.link,
    title: req.body.title,
    description: req.body.description,
  };
  webs.push(webLink);
  console.log(webs);
});
app.use('/getter', (req, res) => res.json({ data: webs }));
app.use('/api', (req, res) => res.json({ username: 'bryan' }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
