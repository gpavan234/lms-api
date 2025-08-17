import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


dotenv.config();
const app = express();

//midedlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'LMS API is running 🚀' });
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});