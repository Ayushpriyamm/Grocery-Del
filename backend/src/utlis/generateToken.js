import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
     const payload = {
        id: user._id,
        role: user.role, // Store role in the token payload
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return token;
}