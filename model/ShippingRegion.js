module.exports = (sequelize, DataType) => {
	const ShippingRegion = sequelize.define('ShippingRegion', {

		'shipping_region_id': { type: DataType.INTEGER, primaryKey: true },
		'shipping_region': DataType.STRING

	},{

		// SETS SHIPPING CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'shipping_region',

	})

	return ShippingRegion
}