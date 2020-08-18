const express = require("express");
const bodyParser = require("body-parser");
import { getTable, postTable, putTable } from "./control/DBcontrol";

const app = express();

app.use(bodyParser.json());
//app.use('/:table', DBroute);
app.get("/:table", getTable);
app.post("/:table", postTable);
app.put("/:table", putTable);

export default app;
