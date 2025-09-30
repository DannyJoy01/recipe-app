import bcrypt from 'bcrypt';
import OtpToken from "../models/otp/otpToken.js";

export const generateNumericOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createAndSaveOtp = async (userId, expireMinutes = 10) => {
    // invalidate previous unused OTPS for the user
    await OtpToken.updateMany({userId, used: false}, {used: true});

    const otp = generateNumericOtp();
    const saltRounds = 10;
    const otpHash = await bcrypt.hash(otp, saltRounds);
    const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000); // expire in 10 minutes

    const doc = await OtpToken.create({
        userId,
        otpHash,
        expiresAt,
    });
    return {otp, doc};
};