import mongoose from "mongoose";

let isConnected = false;

export const connectToDB  = async () => {

  if (isConnected) return;

  if (mongoose.connection.readyState === 1 ) {
    isConnected = true;
    return;
  }

  try{
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
  }catch(err){
    throw err;
  }
  
}