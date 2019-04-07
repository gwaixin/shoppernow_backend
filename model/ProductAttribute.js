module.exports = (sequelize, DataType) => {
	const ProductAttribute = sequelize.define('ProductAttribute', {
		// SETS PRODUCT ATTRIBUTE
		product_id: { type: DataType.INTEGER, primaryKey: true },
		attribute_value_id: { type: DataType.INTEGER, primaryKey: true }
	}, {
		// SETS PRODUCT ATTRIBUTE CONFIG
		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'product_attribute'
	})

	return ProductAttribute
}