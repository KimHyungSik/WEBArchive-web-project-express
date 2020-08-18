var exports = (module.exports = {});
import tableList from "./createTable";

exports.query = (table, where) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await tableList[table].findAll({
				where: where,
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

exports.insert = (table, value) => {
	return new Promise(async (resolve, reject) => {
		try {
			const newTuple = new tableList[table](value);
			await newTuple.save();
			resolve(newTuple);
		} catch (error) {
			reject(error);
		}
	});
};

exports.update = (table, set, where) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await tableList[table].update(set, {
				returning: true,
				where: where,
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};
