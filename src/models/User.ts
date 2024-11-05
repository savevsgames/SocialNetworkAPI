// Import the necessary modules
import { Schema, model, Document } from "mongoose";

// Create Interface for User
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: string[]; // Array of _id values
  friends: string[]; // Array of _id values
}

// Create User Schema
const userSchema = new Schema(
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
    virtuals: {
      friendCount: {
        get() {
          return this.friends.length;
        },
      },
    },
  }
);

const User = model("User", userSchema);

export default User;
