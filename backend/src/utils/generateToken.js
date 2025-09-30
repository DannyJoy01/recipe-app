import dotenv from "dotenv"
dotenv.config();
import JWT from "jsonwebtoken";


const {JWT_SECRET, JWT_EXPIRY} = process.env;

export const jwtToken = (id, email, role) =>{
    return JWT.sign({id, email, role}, JWT_SECRET,{
        expiresIn: JWT_EXPIRY,
    });
};
