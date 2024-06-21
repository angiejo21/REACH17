import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { APIFeatures } from "../utils/APIFeatures.js";

//C
export const createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: { data: newDoc },
    });
  });
};
//R
export const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc;
    if (req.params.slug) {
      doc = await Model.findOne({ slug: req.params.slug });
    } else {
      doc = await Model.findById(req.params.id);
    }
    if (!doc) {
      return next(new AppError("No document found with that id/name", 404));
    }
    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  });
};
export const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    //Chain the query
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //Finally call the query
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { data: docs },
    });
  });
};
//U
export const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc;
    if (req.params.slug) {
      doc = await Model.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    if (!doc) {
      return next(new AppError("No document found with that id/name", 404));
    }
    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  });
};
//D
export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc;
    if (req.params.slug) {
      doc = await Model.findOneAndDelete({ slug: req.params.slug });
    } else {
      doc = await Model.findByIdAndDelete(req.params.id);
    }
    if (!doc) {
      return next(new AppError("No document found with that id/name", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
