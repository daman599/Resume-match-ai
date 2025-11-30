import mongoose, { models } from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema({

  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobCategory: { type: String },
  redirect_url: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200,
  },

});

const JobModel = models.Job || mongoose.model("Job", JobSchema);

export default JobModel;

