import mongoose from "mongoose";
const connectDB = async () => {
    try {
           console.log("Mongo URI being used:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");  

    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;