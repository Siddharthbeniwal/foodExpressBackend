const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL

const mongoDb = async () => {
    try {
        const dbConnection = await mongoose.connect(MONGO_DB_URL);
        console.log('Database connected succesfully!');

        const fetched_food_data = await dbConnection.connection.db.collection('food_data');
        global.foodData = await fetched_food_data.find({}).toArray();

        const fetched_food_category = await dbConnection.connection.collection('food_category')
        global.foodCategory = await fetched_food_category.find({}).toArray();
        
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = mongoDb;
