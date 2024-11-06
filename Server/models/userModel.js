import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("fullData").get(function () {
  return `name:${this.username} email${this.email} age${this.age}`;
});

userSchema.virtual("totalJoke", {
  ref: "Joke",
  localField: "_id",
  foreignField: "owner",
  count: true,
});

export default mongoose.model("User", userSchema);
