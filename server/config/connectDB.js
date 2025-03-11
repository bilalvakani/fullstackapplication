import mangoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MANGODB_URL){
    throw new Error('Please provide a valid mongo uri');
}

async function connectDB(){
    try{
        await mangoose.connect(process.env.MANGODB_URL)
        console.log('Database connected');

    }
    catch(error){
        console.log("Error connecting to database",error);
        process.exit(1);
    }
}
 export default connectDB;