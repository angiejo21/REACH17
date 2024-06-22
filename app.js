import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";

import { AppError } from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

import subjectsRouter from "./routes/subjectRoutes.js";
import schoolsRouter from "./routes/schoolRoutes.js";
import coursesRouter from "./routes/courseRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(ExpressMongoSanitize());

app.use("/api/v1/subjects", subjectsRouter);
app.use("/api/v1/schools", schoolsRouter);
app.use("/api/v1/courses", coursesRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
