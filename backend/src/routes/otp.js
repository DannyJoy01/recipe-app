import express from 'express';
import {verifyOtp} from '../controllers/auth/verifyOtp.js';

// configure express route
const router = express.Router();

// define the route for OTP verification
router.post('/verify-otp', verifyOtp);

export default router;