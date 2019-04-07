module.exports = (sequelize, DataType) => {
	const ProductCategory = sequelize.define('ProductCategory', {
		product_id: { type: DataType.INTEGER, primaryKey: true },
		category_id: { type: DataType.INTEGER, primaryKey: true }
	},{

		// SETS PRODUCT CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'product_category',

		// sets index
		// indexes: [{
		// 	unique: true,
		// 	fields: ['email']
		// }],
	})

	return ProductCategory
}