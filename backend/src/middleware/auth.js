import dotenv from "dotenv";
dotenv.config(); // ✅ Load env variables here
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "UNAUTHORIZED",
      message: "Token not provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("🔐 Token:", token);
    console.log("🧪 JWT_SECRET (from env):", process.env.JWT_SECRET); // Add this for debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.role) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: "FORBIDDEN",
        message: "Role not found in token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    return res.status(httpStatus.FORBIDDEN).json({
      status: "FORBIDDEN",
      message: "Failed to authenticate token",
    });
  }
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: "FORBIDDEN",
        message: "Forbidden: Access Denied",
      });
    }
    next();
  };
};

export { authorizeUser, checkRole };
