import express from "express";
import db from "./config/connection";
import routes from "./routes/index";

import User from "./models/User";
// import Thought from "./models/Thought";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Debugging Custom Middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

const startBDServer = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`Social Network API server running on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

startBDServer();
