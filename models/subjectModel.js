import mongoose from "mongoose";
import slugify from "slugify";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A subject must have a name"],
      unique: true,
      trim: true,
      maxlength: [50, "The name must be less than 50 characters long"],
    },
    slug: String,
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

subjectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
