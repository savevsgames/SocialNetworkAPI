import db from "../config/connection";
import User from "../models/User";
import Thought from "../models/Thought";
import cleanDB from "./cleanDB";
import mongoose, { mongo } from "mongoose";

const seedData = async () => {
  try {
    await db();
    await cleanDB();

    // Sample Users
    const userSeeds = [
      { username: "NullPointer", email: "null@pointer.com" },
      { username: "SyntaxError", email: "syntax@error.com" },
      { username: "StackOverflow", email: "overflow@stack.com" },
      { username: "BitwiseWizard", email: "bitwise@wizard.com" },
      { username: "FunctionFrenzy", email: "function@frenzy.com" },
      { username: "AsyncAwait", email: "async@await.com" },
      { username: "CaptainCallback", email: "captain@callback.com" },
      { username: "DebuggerDude", email: "debugger@dude.com" },
    ];

    // Create Users
    const createdUsers = await User.create(userSeeds);
    console.log("Users created:", createdUsers);

    // Sample Thoughts with Reactions
    const thoughtSeeds = [
      {
        thoughtText: "I love debugging, said no one ever!",
        username: createdUsers[0].username,
        reactions: [
          {
            reactionBody: "Debugging is just another way of life.",
            username: createdUsers[1].username,
          },
          {
            reactionBody: "Better than coding without errors!",
            username: createdUsers[2].username,
          },
        ],
      },
      {
        thoughtText:
          "Why do programmers prefer dark mode? Because light attracts bugs!",
        username: createdUsers[1].username,
        reactions: [
          { reactionBody: "Amen to that!", username: createdUsers[0].username },
        ],
      },
      {
        thoughtText: "If at first you don’t succeed; call it version 1.0.",
        username: createdUsers[2].username,
        reactions: [
          { reactionBody: "Classic!", username: createdUsers[3].username },
        ],
      },
      {
        thoughtText: "Programmer's diet: Coffee, pizza, and occasional bugs.",
        username: createdUsers[3].username,
        reactions: [
          {
            reactionBody: "Don't forget energy drinks!",
            username: createdUsers[2].username,
          },
        ],
      },
      {
        thoughtText:
          "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
        username: createdUsers[4].username,
        reactions: [
          {
            reactionBody: "Or just blame it on the intern.",
            username: createdUsers[5].username,
          },
        ],
      },
      {
        thoughtText:
          "I have a joke about UDP, but I'm not sure if you'll get it.",
        username: createdUsers[5].username,
        reactions: [
          {
            reactionBody: "LOL, good one!",
            username: createdUsers[6].username,
          },
        ],
      },
      {
        thoughtText:
          "Why did the developer go broke? Because he used up all his cache.",
        username: createdUsers[6].username,
        reactions: [
          {
            reactionBody: "Been there, done that.",
            username: createdUsers[7].username,
          },
        ],
      },
      {
        thoughtText:
          "What's a programmer’s favorite place to hang out? Foo Bar.",
        username: createdUsers[7].username,
        reactions: [
          {
            reactionBody: "I'll meet you there!",
            username: createdUsers[0].username,
          },
        ],
      },
    ];

    // Insert Thoughts with Reactions
    const createdThoughts = await Thought.insertMany(thoughtSeeds);
    console.log("Thoughts and reactions seeded...", createdThoughts);

    // Now the users need to be updated with the thought _id's
    for (const thought of createdThoughts) {
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
      ); // Update the user's thoughts array with the new thought _id
    }
    console.log("Seeded users are updated with thoughts...");

    // Close the connection
    mongoose.connection.close();
    console.log("DB Connection closed...");
  } catch (error) {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
    console.log("DB Connection closed...");
  }
};
// Run the seed function
seedData().catch((error) => {
  console.error("Error seeding data:", error);
  mongoose.connection.close();
  console.log("DB Connection closed...");
});
