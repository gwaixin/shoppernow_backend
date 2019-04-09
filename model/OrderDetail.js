module.exports = (sequelize, DataType) => {
	const OrderDetail = sequelize.define('OrderDetail', {

		item_id: { type: DataType.INTEGER, primaryKey: true },
		order_id: { type: DataType.INTEGER, foreignKey: true },
		product_id: DataType.INTEGER,
		attribute: DataType.STRING,
		product_name: DataType.STRING,
		quantity: DataType.INTEGER,
		unit_cost: DataType.DECIMAL(10, 2)

	},{

		// SETS SHIPPING CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'order_detail',

	})

	return OrderDetail
}