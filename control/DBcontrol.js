const sql = require("../sql/sql");
export const getTable = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*"); // cors 허용
	sql.query(req.params.table, req.body)
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
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //cors 허용
	console.log(req);
	sql.insert(req.params.table, req.body)
		.then((result) => {
			res.json({ table: result });
		})
		.catch((err) => {
			console.error(err);
			res.json({ error: err });
		});
};

export const putTable = (req, res) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //cors 허용
	sql.update(req.params.table, req.body.set, req.body.where)
		.then((result) => {
			res.json({ table: result });
		})
		.catch((err) => {
			console.error(err);
			res.json({ error: err });
		});
};
