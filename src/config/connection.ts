import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialnetworkDB"
    );
    console.log("MongoDB connected to Social Network API");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default db;
