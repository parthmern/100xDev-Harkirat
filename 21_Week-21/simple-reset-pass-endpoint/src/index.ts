import express, { Application, Request, Response } from 'express';
import axios from 'axios';

const app: Application = express();
const PORT = 3000;


// Middleware to parse JSON
app.use(express.json());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req: Request, res: Response): void => {
  const email: string | undefined = req.body.email;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  // Generate a 6-digit OTP
  const otp: string = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
  res.status(200).json({ message: 'OTP generated and logged' });
});

// Endpoint to reset password
app.post('/reset-password', (req: Request, res: Response): void => {
  const { email, otp, newPassword }: { email?: string; otp?: string; newPassword?: string } = req.body;

  if (!email || !otp || !newPassword) {
    res.status(400).json({ message: 'Email, OTP, and new password are required' });
    return;
  }

  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after use
    res.status(200).json({ message: 'Password has been reset successfully' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
});

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});

