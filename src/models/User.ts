// Import the necessary modules
import { Schema, model, Document } from "mongoose";
import Thought from "./Thought"; // Ensure Thought model is imported

// Create Interface for User
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: string[]; // Array of _id values
  friends: string[]; // Array of _id values
}

// Create User Schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Uses _id's from Thought model
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, // Uses _id's from User model
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // Allow virtual properties when data is requested
    },
    toObject: {
      virtuals: true, // Allow virtual properties when data is requested
    },
  }
);

// Virtual method for friend count
// Virtuals can be dynamically generated properties that are not stored in the database so this get method allows us to
// retrieve the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Pre-hook to remove associated thoughts when a user is deleted
// using .pre method allows us to run this function before the remove() method
// We pass in next as a parameter to tell Mongoose to move on to the next middleware function when this function is done
userSchema.pre("findOneAndDelete", async function (next) {
  // Get the user ID from the query - this is a Mongoose method that allows us to access the query object and its properties
  const userId = this.getQuery()["_id"];
  try {
    // Find the user by ID and ensure it exists before accessing thoughts
    const user = await this.model.findById(userId);
    // If the user exists and has thoughts, delete the thoughts with deleteMany() and pass in the _id values from the user's thoughts array
    if (user && user.thoughts.length > 0) {
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
    }
    // Move on to the next middleware function
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = model<IUser>("User", userSchema);

export default User;
