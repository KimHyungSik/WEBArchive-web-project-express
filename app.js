const express = require('express');
const bodyParser = require('body-parser');
import router from './Routes';
import fileUpload from 'express-fileupload';
import {
  getTable,
  postTable,
  putTable,
  postSiteTable,
} from './control/DBcontrol';
import cors from 'cors';
const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
//app.use(router.table, table);
app.get(router.table, getTable);
app.post(router.table, postTable); //site이외 업로드용
app.post(router.siteTable, postSiteTable); //site 업로드용
app.put(router.table, putTable);

export default app;
