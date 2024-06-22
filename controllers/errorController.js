import { AppError } from "../utils/appError.js";
//HANDLERS
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
//RESPONSES
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProduction = (err, res) => {
  // Trusted error that we created, can be sent to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming or unknown error, we don't leak details
    //Log it
    console.error("ERROR 💥:", err);
    //Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong 😵",
    });
  }
};
//ERROR HANDLING MIDDLEWARE
//With 4 args express recognizes it as error handling middleware
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name, message: err.message };
    //HANDLE ERROR
    //Wrong format for a value in the path (Mongoose)
    if (error.name === "CastError") error = handleCastErrorDB(error);
    //Duplicate fields(MongoDB)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    //Values don't respect requirements (Mongoose)
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    //SEND ERROR
    sendErrorProduction(error, res);
  }
};
