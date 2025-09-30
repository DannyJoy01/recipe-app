import User from "../../models/users/user.js";
import httpStatus from "http-status";


// controller function to get all registered users;
const getUsers = async (req, res) =>{
    try{
        const users = await User.find({})
        if(users){
            return res.status(httpStatus.OK).json({
                status: "Success",
                userDetails: users
            })
        }
            return res.status(httpStatus.NOT_FOUND).json({
                status: "Not Found",
                message: "No record(s) found!"
            })
    }catch (error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: error.message,
        });
    }
}

export {getUsers} ;