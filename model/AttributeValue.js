module.exports = (sequelize, DataType) => {
	const AttributeValue = sequelize.define('AttributeValue', {
		// SETS ATTRIBUTE
		attribute_value_id: { type: DataType.INTEGER, primaryKey: true },
		attribute_id: DataType.INTEGER,
		value: DataType.STRING,
	}, {
		// SETS ATTRIBUTE CONFIG
		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'attribute_value'
	})

	return AttributeValue
}