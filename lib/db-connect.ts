import mongoose from "mongoose";

export async function connectToDB() {

  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
}