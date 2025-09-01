import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { issueCertificate, getMyCertificates, verifyCertificate } from '../controllers/certificateController.js';

const router = express.Router();

// Student gets certificate after completing course
router.post('/issue', protect, authorizeRoles('admin'), issueCertificate);

// Student can view all their certificates
router.get('/my', protect, authorizeRoles('admin'), getMyCertificates);

// Public verify certificate by certificateId
router.get('/verify/:id', verifyCertificate);

export default router;
