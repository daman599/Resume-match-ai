import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema({

  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String }, // Full-time, Part-time
  salary: { type: String }, //optional
  url: { type: String, required: true },
  description: { type: String, required: true },
  datePosted: { type: Date, required: true },
  remote: { type: Boolean, default: false },

});

const JobModel = mongoose.model("Job", JobSchema);

export const Model = {
    Job : JobModel
};

