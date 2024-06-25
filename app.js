import express from "express";
import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";

import { AppError } from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

import subjectsRouter from "./routes/subjectRoutes.js";
import schoolsRouter from "./routes/schoolRoutes.js";
import coursesRouter from "./routes/courseRoutes.js";

const app = express();

app.use(helmet()); //Set security HTTP headers
app.use(cors());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter); //Limit requests from same IP
app.use(express.json({ limit: "10kb" })); //Body parser into req.body and limit size
app.use(ExpressMongoSanitize()); //Data sanitization against NoSQL query injection
app.use(
  hpp({
    whitelist: [
      "name",
      "shortDescription",
      "longDescription",
      "teachers",
      "createdAt",
    ],
  })
);
app.use(compression()); //Compress responses

app.use("/api/v1/subjects", subjectsRouter);
app.use("/api/v1/schools", schoolsRouter);
app.use("/api/v1/courses", coursesRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
