module.exports = (sequelize, DataType) => {
	const ShoppingCart = sequelize.define('ShoppingCart', {
		item_id: { type: DataType.STRING, primaryKey: true },
		cart_id: DataType.STRING(32),
		product_id: DataType.INTEGER,
		attribute: DataType.TEXT,
		quantity: DataType.DECIMAL(10, 2),
		buy_now: DataType.BOOLEAN,
		added_on: DataType.DATE,

	},{

		// SETS PRODUCT CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'shopping_cart',

		// sets index
		// indexes: [{
		// 	unique: true,
		// 	fields: ['email']
		// }],
	})

	return ShoppingCart
}