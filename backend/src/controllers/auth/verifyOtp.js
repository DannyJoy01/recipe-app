import OtpToken from "../../models/otp/otpToken.js";   
import User from "../../models/users/user.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { jwtToken } from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";

const verifyOtp = async (req, res) => {
    try {
        // 1. Extract and verify the temporary token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: "error",
                message: "Authorization header missing or malformed",
            });
        }
        const tempToken = authHeader.split(" ")[1];
        let payload;
        try {
            // 2. Verify the token using the secret and check the payload
            payload = jwt.verify(tempToken, process.env.JWT_SECRET);
            if (payload.type !== "otp") {
                throw new Error("Invalid token type");
            }
        } catch (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: "error",
                message: "Invalid or expired token",
            });
        }

        const { sub: userId } = payload;
        const { otp } = req.body;
        if (!otp) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "error",
                message: "OTP is required",
            });
        }

        // 3. Find the most recent unused OTP for the user
        const otpDoc = await OtpToken.findOne({ userId, used: false }).sort({ createdAt: -1 });
        if (!otpDoc) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "error",
                message: "No valid OTP found. Please request a new one.",
            });
        }

        // 4. Check if OTP is expired
        if (otpDoc.expiresAt < new Date()) {
            otpDoc.used = true; // mark as used
            await otpDoc.save();
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "error",
                message: "OTP has expired. Please request a new one.",
            });
        }

        // 5. Compare provided OTP with stored hash
        const match = await bcrypt.compare(otp, otpDoc.otpHash);
        if (!match) {
            otpDoc.attempts += 1;
            if (otpDoc.attempts >= 5) {
                otpDoc.used = true;
            }
            await otpDoc.save();
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "error",
                message: "Invalid OTP. Please try again.",
            });
        }

        // ✅ OTP is valid → mark as used
        otpDoc.used = true;
        await otpDoc.save();

        // 6. Generate main JWT token
       const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: "error",
                message: "User not found",
            });
        }
        const finalToken = jwtToken(user._id, user.email, user.role);
        return res.status(httpStatus.OK).json({
            status: "success",
            message: "OTP verified successfully",
            token: finalToken,
            user,
        });


    } catch (error) {
        console.error("OTP verification error:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Server error during OTP verification",
        });
    }
};

export { verifyOtp };
