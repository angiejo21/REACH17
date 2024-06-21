import mongoose from "mongoose";
import slugify from "slugify";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A subject must have a name"],
      unique: true,
      trim: true,
      maxlength: [25, "The name must be less than 20 characters long"],
    },
    slug: String,
    courses: [],
  },
  { timestamps: true }
);

subjectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
