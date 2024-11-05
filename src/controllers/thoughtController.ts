import { Request, Response } from "express";
import Thought from "../models/Thought";
import User from "../models/User";

// getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction

// Get all thoughts
/**
 *
 * @param req - no body needed
 * @param res - returns all thoughts
 */
export const getThoughts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thoughts = await Thought.find(); // Find all thoughts
    console.log("Thoughts Found:" + thoughts);
    res.status(200).json("Thoughts Found:" + thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error getting thoughts", error });
  }
};

// Get a thought by id
/**
 * @param req - id of thought to get (_id)
 * @param res - returns the thought with the id
 */
export const getThoughtById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);
    // If thought is not found, return 404
    if (!thought) {
      res
        .status(404)
        .json({ message: `Thought with id ${req.params.id} not found` });
      return;
    }
    // If thought is found, return thought
    console.log("Thought Found:" + thought);
    res.status(200).json("Thought Found:" + thought);
  } catch (error) {
    res.status(500).json({ message: "Error getting thought", error });
  }
};

// Create a new thought
/**
 * @param req - body with thoughtText and username (required fields)
 * @param res - returns the new thought
 */
export const createThought = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    console.log("New Thought Created:" + newThought);

    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    console.log("User Updated:" + user);
    if (!user) {
      res
        .status(404)
        .json({ message: `User with id ${req.body.userId} not found` });
      return;
    }
    // If thought is found, respond that thought has been created
    res.status(201).json("New Thought Created: " + newThought);
  } catch (error) {
    res.status(500).json({ message: "Error creating thought", error });
  }
};

// Update a thought by id
/**
 * @param req - id of thought to update (_id)
 * @param res - returns the updated thought
 */
export const updateThought = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id);
    // If thought is not found, return 404
    if (!thought) {
      res
        .status(404)
        .json({ message: `Thought with id ${req.params.id} not found` });
      return;
    }
    // If thought is found, update thought
    const updatedThought = await Thought.findByIdAndUpdate(req.params);
    console.log("Thought Updated:" + updatedThought);
    res.status(200).json("Updated Thought: " + updatedThought);
  } catch (error) {
    res.status(500).json({ message: "Error updating thought", error });
  }
};

// Delete a thought by id
/**
 * @param req - id of thought to delete (_id)
 * @param res - returns the deleted thought
 */
export const deleteThought = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    // If thought is not found, return 404
    if (!thought) {
      res
        .status(404)
        .json({ message: `Thought with id ${req.params.id} not found` });
      return;
    }
    // If thought is found, delete thought
    console.log("Thought Deleted:" + thought);
    res.status(200).json("Deleted Thought: " + thought);
  } catch (error) {
    res.status(500).json({ message: "Error deleting thought", error });
  }
};

// Add a reaction to a thought
/**
 * @param req - id of thought to add reaction to (_id) and body with reaction
 * @param res - returns the updated thought with the new reaction
 */
export const addReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $push: { reactions: req.body } },
      { new: true }
    );
    // If thought is not found, return 404
    if (!thought) {
      res
        .status(404)
        .json({ message: `Thought with id ${req.params.id} not found` });
      return;
    }
    // If thought is found, add reaction
    console.log("Reaction Added:" + thought);
    res.status(200).json("Reaction Added: " + thought);
  } catch (error) {
    res.status(500).json({ message: "Error adding reaction", error });
  }
};

// Remove a reaction from a thought
/**
 * @param req - id of thought to remove reaction from (_id) and id of reaction to remove (reactionId)
 * @param res - returns the updated thought with the reaction removed
 */
export const removeReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $pull: { reactions: { _id: req.params.reactionId } } }, // Pull removes the reaction by _id
      { new: true }
    );
    // If thought is not found, return 404
    if (!thought) {
      res
        .status(404)
        .json({ message: `Thought with id ${req.params.id} not found` });
      return;
    }
    // If thought is found, remove reaction
    console.log("Reaction Removed:" + thought);
    res.status(200).json("Reaction Removed: " + thought);
  } catch (error) {
    res.status(500).json({ message: "Error removing reaction", error });
  }
};
