import mongoose from "mongoose";
import User from "./userModel.js";
const jockSchema = new mongoose.Schema({
  setup: {
    type: String,
    required: true,
  },
  punchLine: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Joke", jockSchema);
