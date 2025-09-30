import User from "../../models/users/user.js";
import {registerSchema} from "../../validators/authValidator.js";
import bcrypt from 'bcrypt';
import httpStatus from "http-status";
import {encrypt} from "../../utils/crypto.js";
import  logger  from "../../utils/logger.js";

// controller function to register user
const registerUser = async (req, res, next) => {
  try {
    // validate the request body with the registerSchema
    const {error} = registerSchema.validate(req.body);

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }

    // 
    const { name, username, password, email, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: "User with email already exists",
      });
    }

    const userName = await User.findOne({ username });
    if (userName) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: "Username already exists",
      });
    }

    // hash your password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // encrypt username but store only ciphertext (string)
    const encryptedUsername = encrypt(username);

    // create and save user details to the database
    const createdUser = await User.create({
      name,
      username: encryptedUsername.ciphertext ,
      email,
      password: hashedPassword,
      role,
    });

    // send a response (as view after successful registration)
    res.status(httpStatus.CREATED).json({
      status: "Success",
      message: "User registered successfully",
      userDetails: createdUser,
    });

    logger.info(`New user registered: ${userDetails.name}`);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "An error occurred while registering user",
      error: e.message,
    });
    logger.error(`Error registering user: ${e.message}`);
  }
};

export { registerUser };
