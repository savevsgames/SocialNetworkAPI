import mongoose from "mongoose";

// This connection string is only for local development
// If this does deploy to a live server, the connection string will need to be updated
// Wrap Mongoose around local connection to MongoDB - socialnetworkDB
mongoose
  .connect("mongodb://127.0.0.1:27017/socialnetworkDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Export connection
export default mongoose.connection;
