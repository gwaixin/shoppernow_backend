module.exports = (sequelize, DataType) => {
	const Attribute = sequelize.define('Attribute', {
		// SETS ATTRIBUTE
		attribute_id: { type: DataType.INTEGER, primaryKey: true },
		name: DataType.STRING
	}, {
		// SETS ATTRIBUTE CONFIG
		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'attribute'
	})

	return Attribute
}
