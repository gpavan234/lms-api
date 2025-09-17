import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// Prevent OverwriteModelError
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
