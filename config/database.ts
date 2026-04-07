import mongoose from "mongoose"

export const connect = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }
    await mongoose.connect(mongoUrl);
    console.log("Connect success!")
  } catch (error) {
    console.log("Connect error!", error);
  }
}