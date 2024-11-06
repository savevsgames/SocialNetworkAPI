import User from "../models/User";
import Thought from "../models/Thought";

const cleanDB = async () => {
  try {
    await User.deleteMany({});
    console.log("Users removed");
    await Thought.deleteMany({});
    console.log("Thoughts removed");
  } catch (error) {
    console.error("Error cleaning DB", error);
  }
};

export default cleanDB;
