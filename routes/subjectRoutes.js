import express from "express";

import {
  createSubject,
  getAllSubjects,
  getOneSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

//protect
router.get("/search", getAllSubjects);

router.route("/").get(getAllSubjects).post(createSubject);
router
  .route("/:slug")
  .get(getOneSubject)
  .patch(updateSubject)
  .delete(deleteSubject);

export default router;

/*
CUD restricted to admin

C
POST/ create a new field 
R
GET/ get all fields GET all
GET/:slug courses in a SINGLE field GET one and populate
U
PATCH/:id update a field
D
DELETE/:id delete a field
*/
