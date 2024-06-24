export class APIFeatures {
  //query coming  mongoose, queryString coming from the route req
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    //page-limit for pagination, fields for limiting, and sorting
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    //enable text search based on inclusion rather than strict equality
    const stringFields = [
      "name",
      "shortDescription",
      "longDescription",
      "slug",
    ];
    stringFields.forEach((field) => {
      if (queryObj[field]) {
        queryObj[field] = { regex: queryObj[field], options: "i" };
      }
    });
    //In the case of mongoDB operators in the query adds $ in front
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex|options)\b/g,
      (match) => `$${match}`
    );
    //Adds string to query
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      //It can sort by more fields separated by comma (- inverts) es. &sort=duration,price => sort: 'duration price'
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    //select only certain information in the document (by default hides '__v') separated by comma (- removes)
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = this.queryString.limit || 50;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
