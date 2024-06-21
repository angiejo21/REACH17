import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";

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

export default app;
