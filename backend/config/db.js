


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
    console.log("Database Name:", conn.connection.name);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;