const express = require('express');
const bodyParser = require('body-parser');
import router from './Routes';
import table from './Route/tableRoute';
import {
  getTable,
  postTable,
  putTable,
  postSiteTable,
} from './control/DBcontrol';
import cors from 'cors';
import multer from 'multer';

const uploader = multer({ dest: 'uploads/' });
const app = express();

app.use(bodyParser.json());
app.use(cors());
//app.use(router.table, table);
app.get(router.table, getTable);
app.post(router.table, postTable);
app.post(router.siteTable, uploader.single('imgaglink'), postSiteTable);
app.put(router.table, putTable);

export default app;
