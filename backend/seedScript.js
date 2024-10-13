import dotenv from 'dotenv'
import mongoose from "mongoose";
import Category from "./src/models/categoryModel.js";
import Product from "./src/models/product.js";

import {products,categories} from './seedData.js'


dotenv.config();

const seedCategories = async() => {
    try {
        await Category.deleteMany();

        const insertedCategory = await Category.insertMany(categories);

        console.log("categories seeding successfully ✅", insertedCategory);

        return insertedCategory;

    } catch (error) {
        console.log("Error seeding categories ❌");
        throw error
    }
        
    
}


//seed products
const seedProducts = async(insertedCategories) => {
    try {
        await Product.deleteMany();

    const productsWithCategoryIds = products.map((product) => {
        const category = insertedCategories.find((cat) => cat.name === product.category)
        
        if (!category) {
            console.log(`Category not found for product ${product.name}`)
            return null;
        }

        return {
            ...product,
            category: category._id
        }
    }).filter(product => product != null);

    const insertedProduct = await Product.insertMany(productsWithCategoryIds);
    console.log("Products seeded successfully ✅", insertedProduct);
        
    } catch (error) {
        console.log("Error seeding Products ❌");
        throw error
    }
}

const runSeeder =async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    

    const insertedCategories=await seedCategories();
    await seedProducts(insertedCategories);

    mongoose.connection.close();
}

runSeeder();