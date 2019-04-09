/** This file will contain the database configuration **/

const sequelize = require("sequelize")

// get models
const ProductModel = require("./model/Product")
const ProductAttributeModel = require("./model/ProductAttribute")
const ProductCategoryModel = require("./model/ProductCategory")
const CategoryModel = require("./model/Category")
const AttributeModel = require("./model/Attribute")
const AttributeValueModel = require("./model/AttributeValue")
const DepartmentModel = require("./model/Department")
const ShoppingCartModel = require("./model/ShoppingCart")
const CustomerModel = require("./model/Customer")
const ShippingModel = require("./model/Shipping")
const ShippingRegionModel = require("./model/ShippingRegion")
const TaxModel = require("./model/Tax")
const OrderModel = require("./model/Order")
const OrderDetailModel = require("./model/OrderDetail")

const DBHOST = process.env.DB_HOST || 'localhost'
const DBPORT = process.env.DB_PORT || 3306
const DBNAME = process.env.DB_NAME || 'shoppernow'
const DBUSER = process.env.DB_USER || 'root'
const DBPASS = process.env.DB_PASS || 'root'

/* set connection */
const db = new sequelize(

	DBNAME,
	DBUSER,
	DBPASS,

	// configs
	{
		dialect: 'mysql',
		host: DBHOST,
		port: DBPORT,
		logging: (str) => {
				  console.log("[MYSQL] " + str);
		}
	}
)

// use to customize table config and name
const customTable = (tableName) => {
	return {
		// no timestamp
  		timestamps: false,
		// disable the modification of tablenames;
		freezeTableName: true,
		// define the table's name
		tableName: tableName
	}
}


// initiate model
const Product = ProductModel(db, sequelize)
const Category = CategoryModel(db, sequelize)
const ProductCategory = ProductCategoryModel(db, sequelize)
const Department = DepartmentModel(db, sequelize)
const ProductAttribute = ProductAttributeModel(db, sequelize)
const Attribute = AttributeModel(db, sequelize)
const AttributeValue = AttributeValueModel(db, sequelize)
const ShoppingCart = ShoppingCartModel(db, sequelize)
const Customer = CustomerModel(db, sequelize)
const Shipping = ShippingModel(db, sequelize)
const ShippingRegion = ShippingRegionModel(db, sequelize)
const Tax = TaxModel(db, sequelize)
const Order = OrderModel(db, sequelize)
const OrderDetail = OrderDetailModel(db, sequelize)


// relation 
Product.hasMany(ProductCategory, { foreignKey: 'product_id' })
Product.hasMany(ProductAttribute, { foreignKey: 'product_id' })
ProductAttribute.belongsTo(AttributeValue, { foreignKey: 'attribute_value_id'})
AttributeValue.belongsTo(Attribute, { foreignKey: 'attribute_id' })
ProductCategory.belongsTo(Category, { foreignKey: 'category_id' })
Category.belongsTo(Department, { foreignKey: 'department_id'})
ShoppingCart.belongsTo(Product, { foreignKey: 'product_id' })
Order.hasMany(OrderDetail, { foreignKey: 'order_id' })
Order.hasOne(Customer, { foreignKey: 'customer_id' })
Order.belongsTo(Shipping, { foreignKey: 'shipping_id' })
Order.belongsTo(Tax, { foreignKey: 'tax_id' })

/* try connecting to the database */

db.sync({ force: false })
.then(() => {
	/* check if errors exist */
	if (typeof errors !== 'undefined') {
		console.log('[MYSQL] error: ', errors);
		process.exit();
	}

	console.log('[MYSQL] connected')	
})

module.exports = {

	// exporting model
	Product,
	Category,
	ProductCategory,
	Department,
	ProductAttribute,
	AttributeValue,
	Attribute,
	ShoppingCart,
	Customer,
	Shipping,
	ShippingRegion,
	Tax,
	Order,
	OrderDetail,

	sequelize: sequelize,
	connection: db,

	// setup model here

	// User model
	// users: db.define('users', {
	// 	id: { type: sequelize.INTEGER, primaryKey: true },
	// 	name: { type: sequelize.STRING, validate: { len: [2, 100] } },
	// 	email: { type: sequelize.STRING, validate: { isEmail: true, len: [4, 80], isUnique: true} },
	// 	password: sequelize.TEXT,
	// 	credit_card: sequelize.STRING,
	// 	address_1: sequelize.STRING,
	// 	address_2: sequelize.STRING,
	// 	city: sequelize.STRING,
	// 	region: sequelize.STRING,
	// 	postal_code: sequelize.STRING,
	// 	country: sequelize.STRING,
	// 	shipping_region_id: sequelize.STRING,
	// 	day_phone: sequelize.STRING,
	// 	eve_phone: sequelize.STRING,
	// 	mob_phone: sequelize.STRING,
	// 	created_at: sequelize.DATE,
	// 	updated_at: sequelize.DATE
	// }),
}