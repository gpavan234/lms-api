import Course from '../models/course.js';

// POST /api/courses  (private: instructor/admin)
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, price, published } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // enforce unique title
    const exists = await Course.findOne({ title });
    if (exists) return res.status(409).json({ message: 'Course title already exists' });

    const course = await Course.create({
      title,
      description,
      category,
      price,
      published: !!published,
      instructor: req.user._id,
    });

    // return with populated instructor minimal info
    const populated = await course.populate('instructor', 'name email role');

    return res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// GET /api/courses  (public)
export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name email role')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    next(err);
  }
};

// GET /api/courses/:id  (public)
export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email role');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};
