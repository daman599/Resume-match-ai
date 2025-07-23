import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema({

  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobCategory: { type: String },
  redirect_url: { type: String, required: true },
  description: { type: String, required: true },
  datePosted: { type: Date, required: true },

});

const JobModel = mongoose.model("Job", JobSchema);

export default JobModel;

