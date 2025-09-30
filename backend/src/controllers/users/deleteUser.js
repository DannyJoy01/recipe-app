import User from "../../models/users/user.js";
import httpStatus from "http-status";

// function to delete user
export const deleteUser = async (req, res) => {
    try{
        // get the id of the user from the request parameter
        const {id} = req.params
        // find user by id
        let user;
        user = await User.findById(id)
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({
                status: "Not Found",
                message: "No User Found",
            });
        }
            user = await User.findByIdAndDelete(id);
            res.status(httpStatus.OK).json({
                status: "Success",
                message: `User with id: ${id} deleted`,
            });     
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: "An error occured while deleting user",
        });
    }
}