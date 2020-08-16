var exports = (module.exports = {});
import tableList from './createTable';

exports.insert = (table, tuple) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newTuple = new tableList[table](tuple);
      await newTuple.save();
      resolve(newTuple);
    } catch (error) {
      reject(error);
    }
  });
};

exports.query = (table, filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await tableList[table].findAll({
        where: filters,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
