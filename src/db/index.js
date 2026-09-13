import mongoose, { connect } from "mongoose";

import { db_name } from "../constant.js";

const connectDB = async()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.mongodb_url}/${db_name}`)
            console.log(`mongodb is connected host: ${connectionInstance.connection.host}`)
    
    } catch (error) {
        console.log("connection failed error", error)
        process.exit(1)
    }

}

export default connectDB