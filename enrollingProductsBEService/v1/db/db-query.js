const constant = require('../constants/constant')
const db = require('./dbConnection');

const getProductList = async () => {
	try {
		let queryString = `			
		SELECT * FROM products`;

		var result = await db.query(queryString);
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

const insertNewProducts = async (product) => {
	try {
		let queryString = `INSERT INTO products(product_name, description, cost,date_manu) value('${product.productName}', '${product.description}', ${product.cost}, '${product.date_manu}')`;
		var result = await db.query(queryString);
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteOldestProduct = async () => {
	try {
		let queryString = `DELETE FROM products where id = (SELECT max(id) FROM products)`;
		var result = await db.query(queryString);
		return result;
	} catch (error) {
		throw new Error(error)
	}
}


module.exports.getProductList = getProductList;
module.exports.insertNewProducts = insertNewProducts;
module.exports.deleteOldestProduct = deleteOldestProduct;