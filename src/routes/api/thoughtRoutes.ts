import { Router } from "express";
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController";

const router = Router();

// api/thoughts
// Get all thoughts
router.get("/", getThoughts);

// Create a new thought
router.post("/", createThought);

// get a thought by id
router.get("/:thoughtId", getThoughtById);

// Update a thought by id
router.put("/:thoughtId", updateThought);

// Delete a thought by id
router.delete("/:thoughtId", deleteThought);

// Add a reaction to a thought
router.post("/:thoughtId/reactions", addReaction);

// Remove a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

export { router as thoughtRouter };
