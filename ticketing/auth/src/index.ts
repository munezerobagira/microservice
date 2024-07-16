import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
    if (!process.env.JWT_KEY)
      throw new Error("You need to set JWT_KEY environment variable");
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    app.listen(3000, () => {
      console.log("Server started on the port 3000!");
    });
  } catch (error) {
    console.log("Error occurred while connecting to the database", error);
  }
};
start();
