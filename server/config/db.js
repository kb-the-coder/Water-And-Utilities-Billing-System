import mongoose from "mongoose";

export const db_conn = async () => {
  try {
    const db = process.env.MONGO_URL;
    const conn = await mongoose.connect(db);
    console.log(`${conn.connection.name} Database Connected `);
  } catch (error) {
    console.log("Database Connection failed", error.message);
  }
};
