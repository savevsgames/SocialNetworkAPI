import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController";

const router = Router();

// api/users
// Get all users
router.get("/", getUsers);

// Create a new user
router.post("/", createUser);

// api/users/:id
// Get a user by id
router.get("/:id", getUserById);

// Update a user by id
router.put("/:id", updateUser);

// Delete a user by id
router.delete("/:id", deleteUser);

// Add a friend to a user
router.post("/:userId/friends/:friendId", addFriend);

// Remove a friend from a user
router.delete("/:userId/friends/:friendId", removeFriend);

export { router as userRouter };
