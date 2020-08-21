const sql = require('../sql/sql');

export const getTable = (req, res) => {
  sql
    .query(req.params.table, req.query)
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
};

export const postTable = (req, res) => {
  console.log(req);

  sql
    .insert(req.params.table, req.body)
    .then((result) => {
      res.json({ table: result });
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
};

export const postSiteTable = (req, res) => {
  console.log(req);
  sql
    .insert(req.params.table, req.body)
    .then((result) => {
      res.json({ table: result });
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
};

export const putTable = (req, res) => {
  sql
    .update(req.params.table, req.body.set, req.body.where)
    .then((result) => {
      res.json({ table: result });
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
};
