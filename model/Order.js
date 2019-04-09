module.exports = (sequelize, DataType) => {
	const Order = sequelize.define('Order', {

		order_id: { type: DataType.INTEGER, primaryKey: true },
		total_amount: DataType.DECIMAL(10, 2),
		created_on: DataType.DATE,
		shipped_on: DataType.DATE,
		status: DataType.INTEGER,
		comments: DataType.STRING,
		customer_id: { type: DataType.INTEGER, foreignKey: true },
		auth_code: DataType.STRING,
		reference: DataType.STRING,
		shipping_id: { type: DataType.INTEGER, foreignKey: true },
		tax_id: { type: DataType.INTEGER, foreignKey: true }

	},{

		// SETS ORDER CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'orders',

	})

	return Order
}