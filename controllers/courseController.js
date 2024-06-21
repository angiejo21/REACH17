import Course from "../models/courseModel.js";
import School from "../models/schoolModel.js";
import Subject from "../models/subjectModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

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

export const getAllCourses = getAll(Course);
export const getOneCourse = getOne(Course);
export const updateCourse = updateOne(Course);
export const deleteCourse = deleteOne(Course);
