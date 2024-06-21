import express from "express";

import {
  createSchool,
  getAllSchools,
  getOneSchool,
  updateSchool,
  deleteSchool,
  getAllSchoolSubjects,
} from "../controllers/schoolController.js";

const router = express.Router();

//protect
router.get("/search", getAllSchools);
router.get("/:slug/subjects", getAllSchoolSubjects);

router.route("/").get(getAllSchools).post(createSchool);
router
  .route("/:slug")
  .get(getOneSchool)
  .patch(updateSchool)
  .delete(deleteSchool);

export default router;

/*
CUD restricted to admin

C
POST/ create a new school 
R
GET/ get all schools GET all + QUERY  filter (field, course name)
GET/:slug courses in a SINGLE school GET one and populate
U
PATCH/:id update a school
D
DELETE/:id delete a school
*/
