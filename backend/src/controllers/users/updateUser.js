import User from "../../models/users/user.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, role, password } = req.body;

    // Find existing user
    let user = await User.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT FOUND",
        message: "User not found",
      });
    }

    // Prepare updated fields
    const updateData = {
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      role: role || user.role,
    };

    // Only hash password if it's provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Save updated user
    await User.findByIdAndUpdate(id, updateData, { new: true });

    res.status(httpStatus.OK).json({
      status: "SUCCESS",
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "Something went wrong",
    });
  }
};
