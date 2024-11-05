import { Request, Response } from "express";
import User from "../models/User";

// getUsers, createUser, getUserById, updateUser, deleteUser, addFriend, and removeFriend

// Get all users
/**
 *
 * @param req - no body needed
 * @param res - returns all users
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find(); // Find all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users", error });
  }
};

// Create a new user
/**
 *
 * @param req - body with username and email (required fields)
 * @param res - returns the new user
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json("New User Created: " + newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get a user by id
/**
 *
 * @param req - id of user to get (_id)
 * @param res - returns the user with the id
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    // If user is not found, return 404
    if (!user) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
      return;
    }
    // If user is found, return user
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error getting user with id ${req.params.id}`, error });
  }
};

// Update a user by id
/**
 *
 * @param req - id of user to update (_id) and body with fields to update
 * @param res - returns the updated user
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // new because we want to return the updated user
      runValidators: true, // Added to ensure validation runs on updates
    });
    if (!updatedUser) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
      return;
    }
    res.status(200).json("Updated User: " + updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating user with id ${req.params.id}`, error });
  }
};

// Delete a user by id
/**
 *
 * @param req - id of user to delete (_id)
 * @param res - returns the deleted user
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
      return;
    }
    res.status(200).json("Deleted User: " + deletedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting user with id ${req.params.id}`, error });
  }
};

// Add a friend to a user's friend list
/**
 *
 * @param req - id of user to add friend to (_id) and id of friend to add (friendId)
 * @param res - returns the updated user with the new friend added
 */
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { friends: req.params.friendId } }, // addToSet prevents duplicates
      { new: true }
    );
    // If user is not found, return 404
    if (!user) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
      return;
    }
    // If user is found, return user with new friend added
    res.status(200).json("Added Friend: " + req.params.friendId);
  } catch (error) {
    res.status(500).json({
      message: `Error adding friend to user with id ${req.params.id}`,
      error,
    });
  }
};

// Remove friend from user
/**
 *
 * @param req - id of user to remove friend from (_id) and id of friend to remove (friendId)
 * @param res - returns the updated user with the friend removed
 */
export const removeFriend = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    // If user is not found, return 404
    if (!user) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
      return;
    }
    // If user is found, return user with friend removed
    res.status(200).json("Removed Friend: " + req.params.friendId);
  } catch (error) {
    res.status(500).json({
      message: `Error removing friend from user with id ${req.params.id}`,
      error,
    });
  }
};
