module.exports = (sequelize, DataType) => {
	const Shipping = sequelize.define('Shipping', {

		'shipping_id': { type: DataType.INTEGER, primaryKey: true },
		'shipping_type': DataType.STRING,
		'shipping_cost': DataType.DECIMAL(10, 2),
		'shipping_region_id': DataType.INTEGER,

	},{

		// SETS SHIPPING CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'shipping',

	})

	return Shipping
}