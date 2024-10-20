import jwt from 'jsonwebtoken';

export const generateToken = (userId,role) => {
    return jwt.sign({userId:userId,role:role},process.env.JWT_SECRET,{expiresIn:'24h'})
}