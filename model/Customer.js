module.exports = (sequelize, DataType) => {
	const Customer = sequelize.define('Customer', {

		'customer_id': { type: DataType.INTEGER, primaryKey: true },
		'name': DataType.STRING,
		'email': DataType.STRING,
		'password': DataType.STRING,
		'credit_card': DataType.TEXT,
		'address_1': DataType.STRING,
		'address_2': DataType.STRING,
		'city': DataType.STRING,
		'region': DataType.STRING,
		'postal_code': DataType.STRING,
		'country': DataType.STRING,
		'shipping_region_id': { type: DataType.INTEGER, foreignKey: true },
		'day_phone': DataType.STRING,
		'eve_phone': DataType.STRING,
		'mob_phone': DataType.STRING

	},{

		// SETS PRODUCT CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'customer',

		// sets index
		indexes: [{
			unique: true,
			fields: ['email']
		}],
	})

	return Customer
}