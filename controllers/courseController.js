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
// GET /api/courses?page=1&limit=5&keyword=react
export const getCourses = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword
      ? { title: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const total = await Course.countDocuments({ ...keyword });
    const courses = await Course.find({ ...keyword })
      .populate('instructor', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      courses,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
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

// PUT /api/courses/:id  (private: instructor owner OR admin)
export const updateCourse = async (req, res, next) => {
  try {
    const { title, description, category, price, published } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    // only owner instructor or admin can update
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (price !== undefined) course.price = price;
    if (published !== undefined) course.published = published;

    const updated = await course.save();
    const populated = await updated.populate('instructor', 'name email role');
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/courses/:id  (private: instructor owner OR admin)
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    // only owner instructor or admin can delete
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();
    res.json({ message: 'Course removed successfully' });
  } catch (err) {
    next(err);
  }
};
