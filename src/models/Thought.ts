import { Schema, model, Document } from "mongoose";

// IReaction - reaction _id should be created by default
// Need this to create the ITought interface
interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

// _id will be created by default
const reactionSchema = new Schema<IReaction>({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// _id will be created by default
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
  }
);

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
