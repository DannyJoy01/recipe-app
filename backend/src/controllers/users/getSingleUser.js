import User from "../../models/users/user.js";
import httpStatus from "http-status";

export const getSingleUser = async (req, res) => {
  try {
    // destructure the id from the request parameters
    const { id } = req.params;
    // check if the id is passed as a parameter in the endpoint
    if (!id) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Please provide a valid id",
      });
    }
    let user;
    user = await User.findById(id);
    // check if the user exists
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT_FOUND",
        message: "User not found",
      });
    }else {
      return res.status(httpStatus.OK).json({
        status: "Success",
        message: "User details retrieved successfully",
        userDetails: user,
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: error.message,
    });
  }
};
