// name
// email
// password
// credit_card
// address_1
// address_2
// city
// region
// postal_code
// country
// shipping_region_id
// day_phone
// eve_phone
// mob_phone

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')

// crypto necessary keys
const algorithm = 'aes-192-cbc'
const PASS = 'Password used to generate key'
const key = crypto.scryptSync(PASS, 'salt', 24)
const iv = Buffer.alloc(16, 0); // Initialization vector.
    

// validate email function
let validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

// encrypting text
let encrypt = (text) => {
   // Use the async `crypto.scrypt()` instead.
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
  
// decrypting text
let decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// user properties and validators
const UserSchema = new Schema({

    name: {
        type: String, 
        required: true, 
        maxlength: [100, 'First name must not be exceed 100 characters.'],
        minlength: [2, 'First name must be atleast 2 characters.'],
        trim: true 
    },
    email: {
        type: String,
        required: true,
        maxlength: [80, 'Email must not exceed 80 characters.'],
        minlength: [4, 'Email must be atleast 4 characters.'],
        validate: [validateEmail, 'Please fill a valid email address'],
        trim: true,
        unique: true
    },
    password: {type: String, required: true },
    credit_card: {type: String, },
    address_1: {type: String, },
    address_2: {type: String, },
    city: {type: String, },
    region: {type: String, },
    postal_code: {type: String, },
    country: {type: String, },
    shipping_region_id: {type: String, },
    day_phone: {type: String, },
    eve_phone: {type: String, },
    mob_phone: {type: String, },
    created_at: { type: Date, default: new Date()},
    updated_at: { type: Date, default: new Date()},


})


// on every save, add the date
UserSchema.pre('save', function(next) {
    // reform password
    this.password = encrypt(this.password);

    console.log('done password encrypted : ', this.password)

    next();
});


UserSchema.plugin(uniqueValidator, { message: '{PATH} already exist!'})

// add additional instance method
UserSchema.methods.comparePassword = (upassword, password) => {
    return (decrypt(upassword) == password)
}



module.exports = mongoose.model('User', UserSchema)