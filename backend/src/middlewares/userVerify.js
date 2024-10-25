import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!roles.include(decoded.role)) {
            return res.status(403).json({ message: "Access denied, insufficient permissions" });

        }

        req.user = decoded;
        next();
        
    }
}

export const verifyUser = async(req,res,next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
           token = req.headers.authorization.split(' ')[1];

           const decode = jwt.verify(token, process.env.JWT_SECRET);

           req.user = await User.findById(decode.userId).select('-password');

           if (!req.user) {
              res.status(404).json({message:"user not exist"}) 
           }

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