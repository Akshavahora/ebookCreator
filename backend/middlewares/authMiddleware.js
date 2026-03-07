import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
                                //   Was this token created using MY secret key?

            // Get user from token
            req.user = await User.findById(decode.id).select('-password');  //removes the password field from the result.
            next();
        } catch (err) {
            return res.status(401).json({message: "Not authorized, token failed"});
        }
    }

    if(!token) {
        return res.status(401).json({message: "Not authorized, no token"}); 
    }
};

export default protect