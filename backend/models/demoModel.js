import mongoose from "mongoose";

const demoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

const Demo = mongoose.model("Demo", demoSchema);
export default Demo;
