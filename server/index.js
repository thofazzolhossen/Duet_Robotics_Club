import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = 'your_secret_key'; // Use a strong secret key



import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import nodemailer from 'nodemailer';

import teamRouter from './Routes/TeamRoute.js';
import cors from 'cors';
import path from "path";


import { fileURLToPath } from "url";
import achiveRouter from './Routes/AchiveRoute.js';
import certificateRouter from './Routes/CertificateRoute.js';
import eventRouter from './Routes/EventRouter.js';
import countdownRouter from './Routes/CountdownRouter.js';
import aboutRouter from './Routes/AboutRoute.js';
import testimonialRouter from './Routes/TestimonialRoute.js';
import serviceRouter from './Routes/ServiceRoute.js';
import uperheaderRouter from './Routes/UperHeaderRoute.js';
import footerRouter from './Routes/FooterRouter.js';
import sliderRouter from './Routes/SliderRouter.js';
import User from './Models/AdminModel.js'
import subEventRouter from './Routes/SubeventRoute.js';
import advisorRouter from './Routes/AdvisorForEventRouter.js';
import advertisementRouter from './Routes/advertisementRoute.js';




// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow cookies
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Middleware to parse incoming request bodies
app.use(bodyParser.json());


// Get the __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files
app.use("/Upload", express.static(path.join(__dirname, "Upload")));



// MongoDB connection
mongoose.connect(process.env.MONGO_URI ,{
  useNewUrlParser: true,
    useUnifiedTopology: true,

})
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server only after a successful MongoDB connection
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  // Basic route to test the server
  app.use("/api/team", teamRouter);
  app.use("/api/achive", achiveRouter);
  app.use("/api/certificate", certificateRouter);
  app.use("/api/event", eventRouter);
  app.use("/api/countdown", countdownRouter);
  app.use("/api/about", aboutRouter);
  app.use("/api/testimonial", testimonialRouter);
  app.use("/api/service", serviceRouter);
  app.use("/api/uperheader", uperheaderRouter);
  app.use("/api/footer", footerRouter);
  app.use("/api/slider", sliderRouter);
  app.use("/api/subevent", subEventRouter);
  app.use("/api/advisorforevent", advisorRouter);
  app.use("/api/advertisement", advertisementRouter);
  


















  app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'drc@duet.ac.bd', // Replace with your email
        pass: 'umug knnl rrsv olek', // Replace with your email password or app-specific password
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'drc@duet.ac.bd',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #000000;">
          <h2 style="color: #0a9396;">Email from DUET Robotics Club Website</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `
    };
    
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email.' });
    }
  });

/* 
  // Admin Login Route
  app.post('/api/admin/login', (req, res) => {
    console.log('Request Body:', req.body); // Debug log for incoming request

    const { email, password } = req.body;

    if (email === 't@gmail.com' && password === '123') {
        const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('drcadmin2025', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        });
        

        return res.status(200).json({ message: 'Admin login successful.' });
    } else {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }
});
*/

app.post('/api/admin/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      
      if(email==='' || password ===''){
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const admin = await User.findOne({ email });
      if (!admin) { 
          return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isMatch = (password == admin.password);
      if (!isMatch) {
          
          return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign({ email: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      

      res.cookie('drcadmin2025', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json({ message: 'Admin login successful.' });
  } catch (error) {
      
      return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('drcadmin2025', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logout successful' });
});

app.put('/api/admin/update', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find admin by email from token
      const admin = await User.findOne({ email });
     
      // Update email if provided
      if (email) admin.email = email;

      // Update password if provided (hashed for security)
      if (password) {
          admin.password = password;
      }

      await admin.save();

      return res.status(200).json({ message: 'Admin details updated successfully.' });
  } catch (error) {
      return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

/*
// Protected Admin Route
app.get('/api/admin/protected', (req, res) => {
  const token = req.cookies.drcadmin2025;

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
      const verified = jwt.verify(token, JWT_SECRET);
      if (verified.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
      }
      res.status(200).json({ message: 'Authorized' });
  } catch (error) {
      res.status(401).json({ message: 'Invalid token.' });
  }
});
*/

app.get('/api/admin/protected', (req, res) => {
  const token = req.cookies.drcadmin2025;
 

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized access. No token provided.' });
  }

  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
     

      if (verified.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
      }

      res.status(200).json({ message: 'Authorized' });
  } catch (error) {
     
      res.status(401).json({ message: 'Invalid token.' });
  }
});
