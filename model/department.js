module.exports = (sequelize, DataType) => {

	const Department = sequelize.define('Department', {
		// SETS DEPARTMENT ATTRIBUTES
		department_id: { type: DataType.INTEGER, primaryKey: true },
		name: { type: DataType.STRING, allowNull: false },
		description: { type: DataType.TEXT, allowNull: false }

	}, {

		// SETS DEPARTMENT CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'department',

		// sets index
		// indexes: [{
		// 	// unique: true,
		// 	// fields: ['department_id']
		// }],
	})

	return Department
}