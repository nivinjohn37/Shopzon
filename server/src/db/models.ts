import * as mongoose from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shopzon'}]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    isAdmin: Boolean
});

const productSchema = new mongoose.Schema({
    productId: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

// Define mongoose models
export const User = mongoose.model('User', userSchema);
export const Admin = mongoose.model('Admin', adminSchema);
export const Product = mongoose.model('Product', productSchema)