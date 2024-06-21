import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A course must have a name"],
      trim: true,
      maxlength: [100, "A course name must be less than 100 characters long"],
    },
    shortDescription: {
      type: String,
      trim: true,
      required: [true, "A course must have a short description"],
      maxlength: [
        250,
        "A course short description must be less than 250 characters long",
      ],
    },
    longDescription: {
      type: String,
      trim: true,
      required: [
        true,
        "A course must have a detailed description of the program",
      ],
    },
    teachers: [String],
    subject: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subject",
        required: [true, "A course must be included in a subject"],
      },
    ],
    school: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "School",
        required: [true, "A course must be provided by a school"],
      },
    ],
  },
  { timestamps: true }
);

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subject",
    select: "name",
  }).populate({
    path: "school",
    select: "name slug",
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
