import User from "../../models/users/user.js";
import httpStatus from "http-status";

// controller to fetch user details by query param
const getUser = async (req, res) => {
  try {
    const type = req.query.type;
    const id = req.query.id;
    const email = req.query.email;
    const username = req.query.username;

    let user;

    switch (type) {
      case "id":
        user = await User.findById(id);
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: "Not Found",
            message: `User with the id ${id} not found!`,
          });
        }
        return res.status(httpStatus.OK).json({
          status: "Success",
          userDetails: user,
        });

      case "email":
        user = await User.findOne({ email });
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: "Not Found",
            message: `User with the email ${email} not found!`,
          });
        }
        return res.status(httpStatus.OK).json({
          status: "Success",
          userDetails: user,
        });

      case "username":
        user = await User.findOne({ username });
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: "Not Found",
            message: `User with the username ${username} not found!`,
          });
        }
        return res.status(httpStatus.OK).json({
          status: "Success",
          userDetails: user,
        });

      default:
        return res.status(httpStatus.BAD_REQUEST).json({
          status: "Bad Request",
          message: "Invalid type parameter",
        });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });
  }
};

export { getUser };
