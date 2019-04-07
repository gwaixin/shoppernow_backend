const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataType) => {

	var slugify = function(str) {
	  var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
	      to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
	      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');
	 
	  if (str == null) return '';
	 
	  str = String(str).toLowerCase().replace(regex, function(c) {
	    return to.charAt(from.indexOf(c)) || '-';
	  });
	 
	  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
	}

	const Product = sequelize.define('Product', {
		// SETS PRODUCT ATTRIBUTES
		product_id: {
			type: DataType.INTEGER,
			primaryKey: true
		},
		name: { type: DataType.STRING, allowNull: false, validate: { max: 100 } },
		description: { type: DataType.TEXT, allowNull: false, validate: { min: 10, max: 1000 } },
		price: { type: DataType.DECIMAL(10, 2), allowNull: false, validate: { isDecimal: true } },
		discounted_price: { type: DataType.DECIMAL(10, 2), allowNull: false, validate: { isDecimal: true } },
		image: { type: DataType.STRING, allowNull: true },
		image_2: { type: DataType.STRING, allowNull: true },
		thumbnail: { type: DataType.STRING, allowNull:true },
		display: { type: DataType.INTEGER, length: 3 }


	}, {

		// SETS PRODUCT CONFIG

		// no timestamp
		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: 'product',

		getterMethods: {
			slug  : function()  { return slugify(this.name); }
		}

		// sets index
		// indexes: [{
		// 	unique: true,
		// 	fields: ['email']
		// }],
	})

	sequelizePaginate.paginate(Product)

	return Product
}