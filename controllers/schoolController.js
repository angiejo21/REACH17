import Course from "../models/courseModel.js";
import School from "../models/schoolModel.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllSchoolSubjects = catchAsync(async (req, res, next) => {
  const school = await School.findOne({ slug: req.params.slug });
  const docs = await Course.find({
    school: { $in: [school._id] },
  });
  const subjects = Array.from(new Set(docs.flatMap((doc) => doc.subject)));
  res.status(200).json({
    status: "success",
    data: {
      subjects,
    },
  });
});

export const createSchool = createOne(School);
export const getAllSchools = getAll(School);
export const getOneSchool = getOne(School);
export const updateSchool = updateOne(School);
export const deleteSchool = deleteOne(School);
