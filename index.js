import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

//midedlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

//test route
app.get("/api/hello", (Req, res) => {
    res.json({ message: 'LMS API is running 🚀' })
})


// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
})