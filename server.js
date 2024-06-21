import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./config.env" });

import app from "./app.js";

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

await mongoose.connect(DB);
console.log("Connected to database");

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
