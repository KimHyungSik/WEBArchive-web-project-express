const express = require('express');
const bodyParser = require('body-parser');
import { getTable, postTable } from './control/DBcontrol';

const app = express();

app.use(bodyParser.json());
//app.use('/:table', DBroute);
app.post('/:table', postTable);
app.get('/:table', getTable);

export default app;
