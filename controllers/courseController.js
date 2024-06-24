import Course from "../models/courseModel.js";
import School from "../models/schoolModel.js";
import Subject from "../models/subjectModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllCourses = getAll(Course);
export const getOneCourse = getOne(Course);
export const updateCourse = updateOne(Course);

export const createCourse = catchAsync(async (req, res, next) => {
  const newDoc = await Course.create(req.body);
  newDoc.school.forEach(
    async (school) =>
      await School.findByIdAndUpdate(school, {
        $push: { courses: newDoc._id },
      })
  );
  newDoc.subject.forEach(
    async (subject) =>
      await Subject.findByIdAndUpdate(subject, {
        $push: { courses: newDoc._id },
      })
  );
  res.status(201).json({
    status: "success",
    data: { data: newDoc },
  });
});

export const deleteCourse = catchAsync(async (req, res, next) => {
  const doc = await Course.findById(req.params.id);
  if (!doc) {
    return next(new AppError("No course found with that id", 404));
  }
  doc.school.forEach(async (school) => {
    await School.findByIdAndUpdate(school, {
      $pull: { courses: doc._id },
    });
  });
  doc.subject.forEach(async (subject) => {
    await Subject.findByIdAndUpdate(subject, {
      $pull: { courses: doc._id },
    });
  });

  await Course.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
