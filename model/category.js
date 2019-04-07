module.exports = (sequelize, DataType) => {

	const Category = sequelize.define('Category', {
		// SETS CATEGORY ATTRIBUTES
		category_id: { type: DataType.INTEGER, primaryKey: true },
		department_id: { type: DataType.INTEGER },
		// department: { type: DataType.OBJECT, defaultValue: {} },
		name: { type: DataType.STRING, allowNull: false },
		description: { type: DataType.TEXT, allowNull: false },

	}, {

		// SETS CATEGORY CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'category',

		// sets index
		// indexes: [{
		// 	// unique: true,
		// 	// fields: ['department_id']
		// }],
	})

	return Category
}