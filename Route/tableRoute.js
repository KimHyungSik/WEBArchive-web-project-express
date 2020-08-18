const express = require('express');
import router from '../Routes';
import { getTable, postTable, putTable } from '../control/DBcontrol';

const table = express();

table.get(router.table, getTable);
table.post(router.table, postTable);
table.put(router.table, putTable);

export default table;
