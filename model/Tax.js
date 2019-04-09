module.exports = (sequelize, DataType) => {
	const Tax = sequelize.define('Tax', {

		tax_id: { type: DataType.INTEGER, primaryKey: true },
		tax_type: DataType.STRING,
		tax_percentage: DataType.DECIMAL(10, 2)

	},{

		// SETS SHIPPING CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'tax',

	})

	return Tax
}