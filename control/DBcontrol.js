import dotenv from 'dotenv';
const AWS = require('aws-sdk');
const sql = require('../sql/sql');

dotenv.config();

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
  var imagelink;
  const file = req.files.imagelink;
  const s3 = new AWS.S3({
    accessKeyId: process.env.accessKey,
    secretAccessKey: process.env.secretKey,
    region: 'ap-northeast-2', //Seoul
  });

  var s3_params = {
    Bucket: 'weba',
    Key: `img/${file.name}`,
    ACL: 'public-read',
    ContentType: file.mimetype,
    Body: file.data,
  };

  s3.upload(s3_params, function (err, data) {
    console.log(err);
    imagelink = data.Location;

    const body = req.body;
    body.imagelink = imagelink;

    sql
      .insert(req.params.table, body)
      .then((result) => {
        res.json({ table: result });
      })
      .catch((err) => {
        console.error(err);
        res.json({ error: err });
      });
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
