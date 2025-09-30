import mongoose from "mongoose"

// function to connect to database
export const dbConnection = () =>{
    return mongoose.connect(process.env.Mongo_URI)
};