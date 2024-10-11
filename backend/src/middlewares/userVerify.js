import jwt, { verify } from 'jsonwebtoken'
import User from '../models/userModel.js';

export const verifyUser = async(req,res,next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startswith('Bearer')) {
       try {
           token = req.headers.authorization.split(' ')[1];

           const decode = jwt.verify(token, process.env.JWT_SECRET);

           req.user = await User.findById(decode.userId).select('-password');

           next()
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }    
    } else {
         res.status(401).json({ message: 'No token, authorization denied' });
    }
    
}

export const verifyAdmin = (req,res,next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({message:"Access denied,admin Only"})
    }
}