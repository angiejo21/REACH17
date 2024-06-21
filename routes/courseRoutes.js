import express from "express";

import {
  getAllCourses,
  createCourse,
  getOneCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/search", getAllCourses);

router.route("/").get(getAllCourses).post(createCourse);
router.route("/:id").get(getOneCourse).patch(updateCourse).delete(deleteCourse);

export default router;

/*
CUD restricted to educator and admin

C
POST/ create a new course 
R
GET/ get all courses GET all + QUERY  filter (field, school name)
GET/:id get one single course
U
PATCH/:id update a course
D
DELETE/:id delete a course
*/
