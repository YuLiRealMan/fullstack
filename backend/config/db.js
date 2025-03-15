import mongoose from "mongoose";
import dotenv from 'dotenv'; // we want access mongo_uri from .env file
dotenv.config(); // this will allow us to access the mongo_uri from the .env file

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);  
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // 1 code means exit with failure, 0 means exit with success 
    }
}