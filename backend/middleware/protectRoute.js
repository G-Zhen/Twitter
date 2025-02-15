// to decode token
import User from '../models/user.model.js';
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({error: "Unauthorized: No TOKEN provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({error: "Unauthorized: Invalid TOKEN"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        req.user = user; 
        next(); // go to getMe()

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};