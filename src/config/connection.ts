import mongoose from "mongoose";

// This connection string is only for local development
// If this does deploy to a live server, the connection string will need to be updated
// Wrap Mongoose around local connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB");

// Export connection
export default mongoose.connection;
