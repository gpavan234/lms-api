import Certificate from '../models/certificate.js';
import Course from '../models/course.js';
import { generateCertificateId } from '../utils/generateCertificateId.js';

// Issue certificate
export const issueCertificate = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId).populate('instructor', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already issued
    const existing = await Certificate.findOne({
      course: courseId,
      student: req.user._id,
    });
    if (existing) return res.json(existing);

    // Create new certificate
    const cert = await Certificate.create({
      course: courseId,
      student: req.user._id,
      instructor: course.instructor._id,
      certificateId: generateCertificateId(),
    });

    res.status(201).json(cert);
  } catch (err) {
    next(err);
  }
};

// Get student certificates
export const getMyCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find({ student: req.user._id })
      .populate('course', 'title')
      .populate('instructor', 'name');

    res.json(certs);
  } catch (err) {
    next(err);
  }
};

// Verify certificate by ID (public route)
export const verifyCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id })
      .populate('student', 'name')
      .populate('course', 'title')
      .populate('instructor', 'name');

    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    res.json(cert);
  } catch (err) {
    next(err);
  }
};
