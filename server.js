import dotenv from "dotenv";
import mongoose from "mongoose";

//Error in Sync code - In case of errors outside of express
process.on("uncaughtException", (err) => {
  console.log("💥UNCAUGHT EXCEPTION! Shutting down...");
  console.log(`${err.name}: ${err.message}`);
  process.exit(1); //0 - success 1 - uncalled exeption
});

dotenv.config({ path: "./config.env" });

import app from "./app.js";

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

await mongoose.connect(DB);
console.log("Connected to database");

const server = app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV}`);
});

//Error in Async code - In case of a rejected promise outside express(e.g. database failed to connect)
process.on("unhandledRejection", (err) => {
  console.log("💥UNHANDLED REJECTION! Shutting down...");
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    //Close gracefully and finish pending requests
    process.exit(1);
  });
});
