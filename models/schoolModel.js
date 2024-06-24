import mongoose from "mongoose";
import slugify from "slugify";

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A school must have a name"],
      unique: true,
      trim: true,
    },
    slug: String,
    shortDescription: {
      type: String,
      trim: true,
      required: [true, "A school must have a short description"],
      maxlength: [250, "The description must be less than 250 characters long"],
    },
    longDescription: { type: String, trim: true },
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

schoolSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const School = mongoose.model("School", schoolSchema);

export default School;
